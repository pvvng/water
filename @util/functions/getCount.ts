import axios from 'axios';
import { ObjectId } from 'mongodb';

export interface DataType {
  _id: ObjectId;
  count: number;
  date: string;
  time: string; 
}

/** 댓글 데이터 불러오는 함수 */
export default async function getCount() {
    try {
        // 데이터 가져오기
        const result = await axios.get('/api/get/water');

        // 응답 데이터
        const data: DataType = result.data;

        if(!data){
            console.log('Data is empty, executing alternative API call');

            // 대체 API 호출
            const alternativeResult = await axios.post('/api/post/water');
            const alternativeData: DataType = alternativeResult.data;

            // 대체 API 호출 결과를 사용자에게 반환
            return alternativeData;
        }

        return data;
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
    }
}
