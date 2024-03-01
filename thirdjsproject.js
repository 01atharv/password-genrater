const inputSlider = document.querySelector("[data-lengthSlider]");
const lenghtDisplay = document.querySelector("[data-lengthNumber]");

const passowrdDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copymsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#Numberr");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");

const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_+-=:;"<>,.?/';



let password = "";
let passwordLength = 10;
let checkcount = 0;
handleSlider();
setIndicator("#ccc"); 


function handleSlider() {
     inputSlider.value = passwordLength;
     lenghtDisplay.innerText = passwordLength;


     const min = inputSlider.min;
     const max = inputSlider.max;
     inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min))+ "% 100%" 
}
function setIndicator(color) {
     indicator.style.backgroundColor = color;
     indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function getRndInterger(min, max) {
     return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
     return getRndInterger(0, 9);
}
function generatelowercase() {
     return String.fromCharCode(getRndInterger(97, 123));
}
function generateuppercase() {
     return String.fromCharCode(getRndInterger(65, 91));
}
function generateSymbols() {
     const randNum = getRndInterger(0, symbols.length);
     return symbols.charAt(randNum);
}
function calcStrength() {
     let hasupper = false;
     let haslower = false;
     let hasNum = false;
     let hasSym = false;

     if (uppercaseCheck.checked) hasupper = true;
     if (lowercaseCheck.checked) haslower = true;
     if (numberCheck.checked) hasNum = true;
     if (symbolsCheck.checked) hasSym = true;

     if (hasupper && haslower && (hasNum || hasSym) && passwordLength >= 8) {
          setIndicator("#0f0");
     } else if (
          (haslower || hasupper) &&
          (hasNum || hasSym) &&
          passwordLength >= 6
     ) {
          setIndicator("#0ff0");
     } else {
          setIndicator("#f00");
     }

}

async function copyContent() {

     try {
          await navigator.clipboard.writeText(passowrdDisplay.value);
          copymsg.innerText = "copied";
     }
     catch (e) {
          copymsg.innerText = "Failed";
     }
     copymsg.classList.add("active");

     setTimeout(() => {
          copymsg.classList.remove("active");
     }, 2000);
}

function shufflepassword(array) {
     for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
     }

     let str = "";
     array.forEach((el) => (str += el));
     return str;
}
function handlecheckchange() {
     checkcount = 0;
     allCheckBox.forEach((checkbox) => {
          if (checkbox.checked)
               checkcount++;
     });
     if (passwordLength < checkcount) {
          passwordLength = checkcount;
          handleSlider();
     }
}
allCheckBox.forEach((checkbox) => {
     checkbox.addEventListener('change', handlecheckchange);
})


inputSlider.addEventListener('input', (e) => {
     passwordLength = e.target.value;
     handleSlider();
});


copybtn.addEventListener('click', () => {
     if (passowrdDisplay.value)
          copyContent();
})


generateBtn.addEventListener('click', () => {

     if (checkcount == 0)
          return;

     if (passwordLength < checkcount) {
          passwordLength = checkcount;
          handleSlider();
     }

     console.log("starting the jornet");

     password = "";
     //if(uppercaseCheck.Checked){
        // password += generateuppercase();
     //}
     //if(lowercaseCheck.Checked){
       //  password += generatelowercase();
     //}
     //if(symbolsCheck.Checked){
       //  password += generateSymbols();
     //}
     //if(numberCheck.Checked){
       //  password += getRndinterger();
     //}

let funcArr = [];

if(uppercaseCheck.checked)
    funcArr.push(generateuppercase);

if(lowercaseCheck.checked)
    funcArr.push(generatelowercase);

if(numberCheck.checked)
    funcArr.push(generateRandomNumber);

if(symbolsCheck.checked)
    funcArr.push(generateSymbols);

//compulsory addition
for(let i=0; i<funcArr.length; i++) {
    password += funcArr[i]();
}
console.log("COmpulsory adddition done");

//remaining adddition
for(let i=0; i<passwordLength-funcArr.length; i++) {
    let randIndex = getRndInterger(0 , funcArr.length);
    console.log("randIndex" + randIndex);
    password += funcArr[randIndex]();
}
console.log("Remaining adddition done");
//shuffle the password
password = shufflepassword(Array.from(password));
console.log("Shuffling done");
//show in UI
passowrdDisplay.value = password;
console.log("UI adddition done");
//calculate strength
calcStrength();
});