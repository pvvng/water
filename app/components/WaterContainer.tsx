'use client';

import { useEffect, useState } from 'react';
import './css/water.css';
import axios from 'axios';
import getCount, { DataType } from '@/@util/functions/getCount';
import convertPercentageToValue from '@/@util/functions/convertPercentageToValue';
import useEventSource from '@/@util/hooks/useEventSource';

export default function WaterContainer(){

    let [data, setData] = useState<DataType|undefined>(undefined)
    
    // DB SSE 연결
    useEventSource(setData);

    // data 변경 될때마다 position top 변경하기
    useEffect(() => {
        if(data){
            convertPercentageToValue(data?.count);
        }
    },[data])

    return(
        <div className='w-100 h-50 container d-flex flex-center'>
            <div>
                <h1 className="text-center">water</h1>
                <div 
                    className="d-flex flex-center" 
                    style={{margin : 'auto'}}
                >
                    <div className="glass d-flex flex-center">
                        <div className='text-center'>
                            <h4 className='fw-bold'>
                                {data ? data.count : 0}%
                            </h4>
                            <button className='btn btn-dark' onClick={() => {
                                if(!data) alert ('로딩중임');
                                else if(data.count < 100) {
                                    axios.patch(
                                        '/api/update/water', 
                                        { id : data._id, count : data.count }
                                    );
                                }else { alert('오늘은 이미 물이 가득참') }
                            }}>물 붓기</button>
                        </div>
                        {
                            data &&
                            <>
                                <div className='wave -one'></div>
                                <div className='wave -two'></div>
                                <div className='wave -three'></div>
                            </>
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}