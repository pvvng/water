'use client';

import useInput from "@/@util/hooks/useInput";

export default function InputContainer(){

    const { handleClick, inputRef } = useInput();

    return(
        /* From Uiverse.io by vinodjangid07 */ 
        <div className="messageBox w-100" style={{maxWidth : 768}}>
            <input 
                className="col-10" 
                ref = {inputRef}
                placeholder="댓글 싸기" 
                type="text" 
                id="messageInput" 
                autoCorrect="off"
                autoCapitalize="none"
                autoComplete="off"
                aria-label="userInput"
                autoFocus
                required 
            />
            <div className="col-2 text-end">
                <button id="sendButton" onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                    <path
                        fill="none"
                        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                    ></path>
                    <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="33.67"
                        stroke="white"
                        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                    ></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}