const inputSlider=document.querySelector("[data-lengthslider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allcheckbox = document.querySelector("input[type=checkbox]");

const symbols = '`~ !@#$%^&*()_+{}|[]\:"";,./<>?'

let password="";
let passwordLength =15;
let checkcount = 1;
// set strength circle to gray
handleSlider();



function handleSlider(){
    inputSlider.value = passwordLength; 
    lengthDisplay.innerText=passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
}

function getRandomInteger(min,max){
    Math.floor(Math.random()*(max-min)) + min;
} 
function generaterandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,90));
}

function generateSymbols(){
    const randNum=getRandomInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper =false;
    let hasLower = false;
    let hasNum = false;
    let hasSymbols = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSymbols= true;

    if(hasUpper && hasLower && (hasNum || hasSymbols) && passwordLength >=8 ){
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && 
    (hasNum || hasSymbols) && 
    passwordLength >=6 ){  
        setIndicator("#ff0");
    }
    else{
        setIndicator("#ff00");
    }
     
    
    
}




