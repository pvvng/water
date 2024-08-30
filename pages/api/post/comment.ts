import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/@util/database";

interface BodyType {
    text: string;
    date: string;
    time: string;
}

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { text: message, date, time }: BodyType = req.body;

        // 빈 문자열 검사
        if (
            message.trim() === '' || 
            message.length > 18 || 
            typeof message !== 'string'
        ){
            // 400 Bad Request 상태 코드와 함께 에러 메시지 반환
            return res.status(400).json({ error: 'Not Allowed Message' });
        }
        
        try {
            const isoDate = new Date(); 

            const db = (await connectDB).db('water');
            await db.collection('comment').insertOne({ 
                content: message,
                date: date,
                time: time,
                timeStamp: isoDate
            });

            res.status(201).json({ message: 'Comment added successfully' });
        } catch (error) {
            console.error('Database update error: ', error);
            return res.status(500).json('Server error occurred while updating the comment');
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
