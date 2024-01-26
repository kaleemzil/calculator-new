let input = document.querySelector("input");
let buttons = document.querySelectorAll('button');
let resultInput = document.querySelector(".answer");

let string = "";
let arr = Array.from(buttons);
// console.log(arr)
let isEquationCompleted = false; 

arr.forEach(buttons => {
    buttons.addEventListener('click', (e) => {
        handleButton(e.target.innerHTML);
        // console.log(e)
        
    })
})

document.addEventListener('keydown' , (e) =>{
    let key = e.key

    const buttonEle = Array.from(buttons).find(button =>button.innerHTML === key)
    console.log(buttonEle);
    // console.dir(buttonEle)
    if (buttonEle) {
        handleButton(key);
    }else if(key === "Escape"){
        clearAll();
        isEquationCompleted = false
    }else if( key === "Delete"){
        deleteChar()
    }else if(key === "Enter"){
        calculateResult()
        isEquationCompleted = true;
    }
})

function handleButton(buttonValue){
    if (isEquationCompleted  && !isOperator(buttonValue)) {
        
        clearAll();
        isEquationCompleted = false;  
    }
    if(buttonValue === '+' || buttonValue === "-" || buttonValue === "*"){
       handleOperator(buttonValue);
    }else if (buttonValue === '=') {
        calculateResult()
        isEquationCompleted = true;
    }
    else if (buttonValue === 'C') {
        clearAll()
    } else if (buttonValue === '<i class="fa-solid fa-delete-left"></i>') {
       deleteChar()
    } else if (buttonValue === '%') {
        percentage()
    }
    else {
        handleNumber(buttonValue)
    }
}

function handleOperator(operator) {
    if (string.length > 0 && isOperator(string[string.length - 1])) {
        string = string.slice(0, -1) + operator;
    } else {
        string += operator;
    }
    input.value = string;
}

function calculateResult() {
    let result;
    try {
        result = eval(string); 
        if (isNaN(result) || result === Infinity || result === -Infinity) {
            resultInput.value = 'Error';
        } else {
            resultInput.value = result;
        }
    } catch (error) {
        resultInput.value = 'Error';
    }
}

function clearAll(){
    string = ""
    input.value = string;
    resultInput.value = ""
}

function deleteChar(){
    string = string.slice(0 , -1);
    input.value = string;
}

function percentage(){
    let result= parseFloat((string) / 100);

    string = result.toString();
    input.value = string
}

function handleNumber(number){
    string += number;
    input.value = string;
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}




