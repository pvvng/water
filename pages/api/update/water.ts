import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/@util/database";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PATCH") {
        const { id, count } = req.body; // ID를 요청 바디에서 가져옵니다.
        
        if(count >= 100){
            return res.status(200).send('물이 가득 찼다구요')
        }

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        try {
            const db = (await connectDB).db('water');
            
            // 필드 값 증가를 위한 업데이트 쿼리
            const result = await db.collection('count').updateOne(
                // 필드 값 업데이트할 조건
                { _id: new ObjectId(id) }, 
                // count 필드 값을 1 증가시킴
                { $inc: { count: 1 } }     
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ error: 'Document not found' });
            }

            res.status(200).json({ message: 'Count incremented successfully' });
        } catch (error) {
            console.error('Error updating document:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
