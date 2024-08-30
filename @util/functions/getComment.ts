import axios from "axios";
import { ObjectId } from "mongodb";
import { textStateType } from "../hooks/useWebsocket";

interface DataType {
    _id?: ObjectId; // MongoDB의 ObjectId는 일반적으로 string으로 처리합니다.
    content: string; // 댓글 내용
    date ?: string; // 날짜 문자열
    time: string; // 시간 문자열
    timeStamp ?: string; // ISODate 형식의 타임스탬프 문자열
}

export default async function getComment(){
    let result = await axios.get('/api/get/comment');
    let data :DataType[] = result.data;
    let returnData :textStateType[] = [];
    data.forEach(d => {
        let newObj = {message : d.content, time : d.time}
        returnData.push(newObj)
    });
    return returnData.reverse();
}