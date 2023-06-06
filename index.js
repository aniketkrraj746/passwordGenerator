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

const trial = document.querySelector("[to-check]")


const button = document.querySelector("#button")

const symbols = '`~ !@#$%^&*()_+{}|[]\:"";,./<>?'

let password="";
let passwordLength =10;
let checkcount = 1;
// set strength circle to gray
handleSlider();



function handleSlider(){
    inputSlider.value = passwordLength; 
    lengthDisplay.innerText=passwordLength;
    // trial.value = passwordLength;
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
        setIndicator("#f00");
    }
     
    
    
}
 
async function copycontent(){
    try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "coppied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }
    // to make copy span visible
    copyMsg.classList.add("active")
    setTimeout(() => {
        copyMsg.classList.remove("active");
        
    }, 2000);
}
function handleCheckboxChange(){
    checkcount = 0;
    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked)
            checkcount++;
            
    });

    if(passwordLength<checkcount){
        passwordLength =  checkcount;
        handleSlider();
    }

}
allcheckbox.forEach( (checkbox) => {
        checkbox.addEventListener('change', handleCheckboxChange);
        
    });



// inputSlider.addEventListener("input",(event) => {
//     passwordLength = event.target.value;
//     handleSlider();
// });

inputSlider.addEventListener('input', (ex) => {
    passwordLength = ex.target.value;
    
    handleSlider();
});

   



copyBtn.addEventListener('click',function(){
    if(passwordDisplay.value)
    copycontent();
    
});


generateBtn.addEventListener('click',()=> {
    if(checkcount<=0) return;
    if(passwordLength=checkcount){
        passwordLength=checkcount;
        handleSlider();
    }

    password="";
    // if(uppercaseCheck.checked){
    //     password=password+generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password=password+generateLowerCase();
    //     }
    // if(numberCheck.checked){
    //     password=password+generaterandomNumber();

    // }
    // if(symbolCheck.checked){
    //     password=password+generateSymbols();
    // }
 
    let funcArr = [];
    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numberCheck.checked)
        funcArr.push(generaterandomNumber);

    if(symbolCheck.checked)
        funcArr.push(generateSymbols);

    // compulsory addition
    for(let i =0; i<funcArr.length;i++){
        password += funcArr[i]();
    }
    // remaining addition
    for(let i=0;i<passwordLength-funcArr.length; i++){
        let randIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    // shuffle password
    password =  shufflePassword();
    //display in UI
    passwordDisplay.value=  password;
    // calculate strength
    calculateStrength();



});



















