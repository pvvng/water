import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/ws";
import { connectDB } from "@/@util/database";

interface BodyType {
    [key: string]: string;
}

/** 유저가 작성한 input comment emit하고 db에 업데이트하는 API */
export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponseServerIO
) {
    if (req.method === "POST") {
        const { text: message, date, time }: BodyType = req.body;

        try {
            // ISODate 형식으로 변환
            const isoDate = new Date(); 

            const db = (await connectDB).db('water');
            let postResult = await db.collection('comment').insertOne({ 
                content : message,
                date : date,
                time : time, 
                timeStamp : isoDate
            });

            // ws 에 emit
            res.socket.server.io.emit("msg", { message: message, time: time });
            res.status(201).json(message);
        } catch (error) {
            console.error('db 업데이트 중 에러 발생 : ', error);
            return res.status(500).json('서버 오류로 댓글 업데이트 실패');
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


