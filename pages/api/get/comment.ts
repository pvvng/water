import { connectDB } from "@/@util/database";
import moment from "moment-timezone";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        // 현재 날짜를 'YYYY년 MM월 DD일' 형식으로 포맷
        const nowDate = moment().format('YYYY년 MM월 DD일');
        
        // 데이터베이스 연결
        const db = (await connectDB).db('water');
        
        // 쿼리 실행: 현재 날짜의 댓글을 시간 순서로 정렬하고, 최신 6개 가져오기
        const getResult = await db.collection('comment')
        .find({ date: nowDate })
        .sort({ timeStamp: -1 })
        .limit(6)
        .toArray();
        
        // 성공적으로 결과를 가져온 경우
        res.status(200).json(getResult);
    } catch (error) {
        // 에러 처리
        console.error('Error occurred while fetching comments:', error);

        // 에러 메시지와 함께 500 상태 코드 반환
        res.status(500).json({ message: '서버 오류로 댓글을 가져오지 못했습니다.' });
    }
}
