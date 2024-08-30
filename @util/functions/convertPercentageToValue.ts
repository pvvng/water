/** db에게 전달받은 퍼센트 값을 범위 값으로 변환하는 함수 */
export default function convertPercentageToValue(
    percentage :number, min = 0, max = 250
){
    let convertedValue = max - (((percentage / 100) * (max - min)) + min);
    const waveElements = document.querySelectorAll('.wave');
    if(waveElements){
        waveElements.forEach(we => {
            if (we instanceof HTMLElement) {
                we.style.top = `${convertedValue}px`; // top 값을 px로 설정
            }
        })
    }
}