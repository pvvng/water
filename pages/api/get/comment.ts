import { connectDB } from "@/@util/database";
import moment from "moment-timezone";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req : NextApiRequest , res : NextApiResponse
){
    const nowDate = moment().format('YYYY년 MM월 DD일');
    const db = (await connectDB).db('water');
    let getResult = await db.collection('comment')
    .find({date : nowDate}).sort({timeStamp : -1}).limit(6).toArray();
    
    res.status(200).json(getResult);
}