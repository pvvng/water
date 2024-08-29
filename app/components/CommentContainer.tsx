'use client'

import './css/input.css'
import InputContainer from "./InputContainer";
import useWebsocket from '@/@util/hooks/useWebsocket';

export default function CommentContainer(){

    const { textStateArr } = useWebsocket();
    /** 6개 이상이면 지우기 */
    if(textStateArr.length > 6){
        while (textStateArr.length > 6){
            textStateArr.shift();
        }
    }

    return(
        <div 
            className="w-100 h-50 container pt-3 pb-3" 
            style={{maxWidth : 768}}
        >
            <InputContainer />
            <div>
                {
                    textStateArr.map((text, i) => 
                        <div key={text + i} className="w-100 p-2 border mt-2">{text}</div>
                    )
                }
            </div>
        </div>
    )
}