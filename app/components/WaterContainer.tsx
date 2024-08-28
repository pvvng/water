'use client';

import { useState } from 'react';
import './css/water.css';

export default function WaterContainer(){
    let [count, setCount] = useState(0);
    return(
        <div className='w-100 h-50 container d-flex flex-center'>
            <div>
                <h1 className="text-center">water</h1>
                <div 
                    className="d-flex flex-center" 
                    style={{margin : 'auto'}}
                >
                    <div className="glass d-flex flex-center">
                        <div 
                            className="water" 
                            style={{height : count + '%'}}
                        ></div>
                        <div className='text-center'>
                            <h4 className='fw-bold'>{count}%</h4>
                            <button className='btn btn-dark' onClick={() => {
                                if(count < 100) setCount(pre => pre + 1);
                                else { alert('물이 가득찼음요') }
                            }}>물 붓기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}