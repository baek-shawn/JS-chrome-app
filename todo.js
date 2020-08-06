/*스케줄 목록을 생성해서 local storage에 저장하고 삭제하는 js파일*/
const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];                     //목록을 저장할 array




function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    console.log(cleanToDos);
    toDos = cleanToDos
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){                               //리스트를 만들고 삭제하는 함수, 인자의text는 handleSubmit함수에서 온것
    const li = document.createElement("li");            //createElement를 이용해서 js에서 태크생성
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;                       //toDos array가 비었기 때문에 array의 index시작 값을 1로하기위해서
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;                              //handleSubmit에서 온 인자를 span의 text로 
    li.appendChild(delBtn);                             //father element에 append
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {                                   //toDos array에 저장하기 위해 생성
        text: text,
        id: newId
    };
    toDos.push(toDoObj);                                //array에 toDoObj이라는 element추가
    saveToDos();
}

function handleSubmit(event){                       //submit할때 실행하는 함수
    event.preventDefault();                         //event(제출 시 새로고침) 가 동작할 때 막는 메서드
    const currentValue = toDoInput.value;           //input의 값을 저장하는 변수
    paintToDo(currentValue);                        //submit이 발생할 때 함수 실행
    toDoInput.value = "";                           //todo를 생성하고 삭제하기 위해서
}

function loadToDos(){                                   //local storage에서 정보를 가져오는 함수  
    const loadedToDos = localStorage.getItem(TODOS_LS); //local storage에서 키를 가져오기 위해서 변수 생성
    if(loadedToDos !==null){                            //변수가 존재하는 경우(greeting처럼 input을 invisible하지 않아도 되기때문에)
        
        const parsedToDos = JSON.parse(loadedToDos);        //
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)           //submit할때 함수 실행
    
}

init();