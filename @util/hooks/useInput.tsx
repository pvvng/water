'use client'

import axios from "axios";
import { useEffect, useRef } from "react"

export default function useInput(){

    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (event : KeyboardEvent) => {
        if (event.key === 'Enter') {
            // 엔터키가 눌리면 버튼 클릭 함수 실행
            handleClick();
        }
    };

    /** 버튼 클릭하면 input에 작성한 내용 서버 api로 전송 */
    const handleClick = async () => {
        if (inputRef.current) {
            let inputValue = inputRef.current.value;
            if(inputValue){
                let res = await axios.post(
                    '/api/comment/input', 
                    { text : inputValue }
                );
                inputRef.current.value = '';
            }else{ alert ('한 자라도 적는 성의를 보이세요') }
        }
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 keydown 이벤트 리스너 등록
        window.addEventListener('keydown', handleKeyDown);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, []);

    return { handleClick, inputRef }
}