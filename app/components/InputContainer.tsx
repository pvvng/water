export default function InputContainer(){
    return(
        /* From Uiverse.io by vinodjangid07 */ 
        <div className="messageBox w-100">
            <input className="col-10" required = {true} placeholder="댓글 싸기" type="text" id="messageInput" />
            <div className="col-2 text-end">
                <button id="sendButton">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                    <path
                        fill="none"
                        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                    ></path>
                    <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="33.67"
                        stroke="#6c6c6c"
                        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                    ></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}