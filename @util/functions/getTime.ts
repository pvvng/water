import moment from "moment-timezone";

/** 한국 기준의 현재 날짜 및 시간 얻는 함수 */
export default function getTime(){
    const date = moment().tz("Asia/Seoul").format('YYYY년 MM월 DD일');
    const time = moment().tz("Asia/Seoul").format('HH시 mm분 ss초');
    return { date, time };
}