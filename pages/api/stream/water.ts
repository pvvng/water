import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/@util/database";

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 메소드 체크
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    // 헤더 설정
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Encoding': 'none',
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
    });

    const db = (await connectDB).db('water');
    // 감시할 컬렉션의 opertationType을 파이프라인으로 설정
    const pipeline = [
        {
            $match: {
                $or: [
                    { operationType: 'insert' },
                    { operationType: 'update' },
                ]
            }
        }
    ];
    // changeStream 설정하면서 pipeline, fullDocument 설정 
    const changeStream = db.collection('count').watch(pipeline, {
        fullDocument : 'updateLookup'
    });

    // 변화가 감지 됐을 때
    changeStream.on('change', (change) => {
        // Check the type of the change stream event
        if (change.operationType === 'insert' || change.operationType === 'update') {
            // For insert and update operations, we can access fullDocument
            res.write('event: msg\n')
            res.write(`data: ${JSON.stringify(change.fullDocument)}\n\n`);
        }else {
            // Handle other types of change operations
            console.error(`Unexpected operationType: ${change.operationType}`);
        }
    });

    // Handle any errors in the Change Stream
    changeStream.on('error', (error) => {
        console.error('Change Stream error:', error);
        res.write('event: error\n');
        res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    });

    // 클라이언트가 연결을 종료할 때 Change Stream 닫기
    req.on('close', () => {
        changeStream.close();
        res.end();
    });
}
