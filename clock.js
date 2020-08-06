/*시계를 만들어주는 js파일*/ 
const clockContainer = document.querySelector(".js-clock"), 
clockTitle=clockContainer.querySelector("h1");              //dom을 이용해서 html에 변화를 주기 위해 태그 선택
                                                            
function getTime(){                                         //시간을 나타내는 함수
    const date = new Date();                                //객체를 이용해서 생성자 생성
    const minutes = date.getMinutes();                      //분,시,초를 나타내는 생성자 
    const hours = date.getHours();
    const seconds=date.getSeconds();
    clockTitle.innerText=`${hours <10 ? `0${hours}`: hours}:${              //삼항연산자를 이용해서 조건 추가
        minutes <10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

}

function init(){                                //실행함수 
    getTime();
    setInterval(getTime,1000);
}

init();