/*이름을 제출해서 local storage에 저장할 수 있게 하는  js파일*/
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings")

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function savaName(text){                                //local storage에 키와 값을 저장하는 함수
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){                           //이벤트(제출)가 동작할 때 일어나는 함수
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    savaName(currentValue);
}

function askForName(){                                  //local storage에서 가져올 정보가 없을 때 동작하는 함수
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){                           //local storage에 가져올 정보가있을때 동작하는 함수
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){                                    //local storage에서 정보를 가져오는 함수
    const currentUser=localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else{
        paintGreeting(currentUser);
    }
}


function init(){                                        //함수가 동작하게 하는 함수
    loadName();
}

init();