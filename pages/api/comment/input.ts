import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/ws";

/** 유저가 작성한 input comment emit하는 API */
export default async function handler (
    req: NextApiRequest, res: NextApiResponseServerIO
){
    if (req.method === "POST") {
        const message :string = req.body.text;
        res.socket.server.io.emit("msg", message);
        res.status(201).json(message);
    }
};