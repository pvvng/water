import axios from 'axios';
import { ObjectId } from 'mongodb';
import { textStateType } from '../hooks/useWebsocket';

interface DataType {
  _id: ObjectId;
  content: string;
  date: string;
  time: string;
  timeStamp: string; 
}

/** 댓글 데이터 불러오는 함수 */
export default async function getComment(): Promise<textStateType[]> {
  try {
      // 데이터 가져오기
      const result = await axios.get('/api/get/comment');

      // 응답 데이터
      const data: DataType[] = result.data;
      const returnData: textStateType[] = data.map(d => ({
        message: d.content,
        time: d.time
      }));

      // 데이터 역순으로 반환
      return returnData.reverse();
  } catch (error) {
      // 에러 처리
      if (axios.isAxiosError(error)) {
        // Axios 에러 처리
        console.error('Axios error:', error.message);
        // 서버나 네트워크 에러에 대한 추가 처리
      } else {
        // 기타 에러 처리
        console.error('Unexpected error:', error);
      }

      // 에러 발생 시 빈 배열을 반환하거나 기본값을 반환할 수 있습니다.
      return [];
  }
}
