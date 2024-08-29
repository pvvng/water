'use client';

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useWebsocket(){
    let [textStateArr, setTextStateArr] = useState<string[]>([]);

    /** 6개 이상이면 지우기 */
    useEffect(() => {
        if(textStateArr.length > 6){
            while (textStateArr.length > 6){
                textStateArr.shift();
            }
        }
    },[textStateArr])

    useEffect(() => {
        const socket = io({ path: "/api/comment/websocket" });

        socket.on('connect', () => {
            console.log('WS server was connected');
        })

        socket.on('msg', (data) => {
            setTextStateArr(preArr => [...preArr, data]);
        })

        return () => {
            socket.disconnect();
        };
    },[])

    return { textStateArr };
}