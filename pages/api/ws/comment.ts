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
        const { text: message, time }: BodyType = req.body;
        const io = res.socket.server.io

        // 빈 문자열 검사
        if (message.trim() === '' || message.length > 18){
            // 400 Bad Request 상태 코드와 함께 에러 메시지 반환
            return res.status(400).json({ error: 'Not Allowed Message' });
        }
        
        if(io){
            // ws 에 emit
            io.emit("msg", 
                { message : message, time : time }
            );
            res.status(201).json(message);
        }else{
            res.status(500).json({ message: 'WebSocket server not initialized', time : time });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}