import './css/input.css'
import InputContainer from "./InputContainer";

export default function CommentContainer(){
    return(
        <div 
            className="w-100 h-50 container pt-3 pb-3" 
            style={{maxWidth : 768}}
        >
            <InputContainer />
            <div>
                {
                    Array(6).fill(0).map((a, i) => 
                        <div key={i} className="w-100 p-2 border mt-2">123</div>
                    )
                }
            </div>
        </div>
    )
}