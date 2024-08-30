import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/@util/database";
import moment from "moment-timezone";
import getTime from "@/@util/functions/getTime";

interface BodyType {
    count: number;
    date: string;
    time: string;
}

/** 오늘 날짜의 물 count 생성하는 API */
export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { date, time } = getTime();

        try {
            const db = (await connectDB).db('water');
            let result = await db.collection('count').insertOne({ 
                count: 0,
                date: date,
                time: time,
            });
            
            res.status(201).json({ 
                _id : JSON.stringify(result.insertedId),
                count: 0,
                date: date,
                time: time,
            });
        } catch (error) {
            console.error('Database update error: ', error);
            return res.status(500).json('Server error occurred while updating the comment');
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
