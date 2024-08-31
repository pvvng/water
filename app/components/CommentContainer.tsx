'use client'

import './css/input.css'
import InputContainer from "./InputContainer";
import useWebsocket from '@/@util/hooks/useWebsocket';
import getComment from '@/@util/functions/getComment';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function CommentContainer(){
    
    const { textStateArr, setTextStateArr } = useWebsocket();

    const { data, isLoading, isError } = useQuery({
        queryKey : ['commentData'],
        queryFn : getComment,
        // textStateArr.length가 0일 때만 쿼리 실행
        enabled : textStateArr.length === 0 
    }) 

    useEffect(() => {
        if(textStateArr.length === 0 && data){
            setTextStateArr([...data]);
        }
    },[data])
    
    /** 6개 이상이면 지우기 */
    if(textStateArr.length > 6){
        while (textStateArr.length > 6){
            textStateArr.shift();
        }
    }

    return(
        <div className='container' style={{position : 'relative'}}>
            {
                isLoading ? <div className='text-center'>로딩중...</div>:
                isError ? <div className='text-center'>에러 발생</div>:
                <div 
                    className="w-100 h-50 container" 
                    style={{maxWidth : 768}}
                >
                    {
                        textStateArr.map((data, i) => 
                            <div 
                                key={data.message + data.time + i} 
                                className="w-100 p-2 border mb-2 rounded-2"
                            >
                                <p 
                                    className='m-0 float-end' 
                                    style={{fontSize : '12px', color : 'blue'}}
                                >
                                    {data.time}
                                </p>
                                <p className='fw-bold m-0'>{data.message}</p>
                                <div style={{clear : 'both'}}></div>
                            </div>
                        )
                    }
                </div>
            }
            <InputContainer />
        </div>
    )
}