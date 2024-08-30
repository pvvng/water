'use client';

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export interface textStateType {
    message : string;
    time : string;
};

export default function useWebsocket(){
    let [textStateArr, setTextStateArr] = useState<textStateType[]>([]);

    useEffect(() => {
        const socket = io({ path: "/api/ws/connect" });

        socket.on('connect', () => {
            console.log('WS server was connected');
        });

        socket.on('msg', (data) => {
            setTextStateArr(preArr => {
                const updatedArr = [...preArr, data];
                if (updatedArr.length > 6) {
                    updatedArr.shift(); // 배열 길이를 6개로 유지
                }
                return updatedArr;
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return { textStateArr, setTextStateArr };
}