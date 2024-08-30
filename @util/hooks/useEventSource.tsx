'use client';

import { Dispatch, SetStateAction, useEffect } from "react";
import getCount, { DataType } from "../functions/getCount";

/** SSE 연결하는 커스텀 훅 */
export default function useEventSource(
    setData : Dispatch<SetStateAction<DataType | undefined>>
){
    useEffect(() => {
        getCount().then(result => setData(result));

        const eventSource = new EventSource('/api/stream/water');
        eventSource.addEventListener('msg', (e) => {
            let newData :DataType = JSON.parse(e.data);
            setData({...newData});
        })

        eventSource.onerror = () => {
            console.error('EventSource failed.');
        };

        return () => {
            eventSource.close();
        };
    },[])
}