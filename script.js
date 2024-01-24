let slider = document.getElementById("slider");
let displayLength = document.getElementById("length");
let generatePasswordButton = document.getElementById("generatePasswordButton");
let uppercase = document.getElementById("uppercase");
let lowercase = document.getElementById("lowercase");
let number = document.getElementById("number");
let symbol = document.getElementById("symbol");
let generatedOutput = document.getElementById("generated-output");
let strengthIndicator = document.getElementById("strength-indicator");
let copyButton = document.getElementById("copy-button");
let copiedText = document.getElementById("copied-text");

let countTickedCheckBox = 0;

slider.addEventListener("input", handleSlider);

function handleSlider() {
  var val = slider.value;
  displayLength.innerText = val;

  slider.style.backgroundSize=((val-5)*4) + "% 100%";

}

generatePasswordButton.addEventListener("click", generatePassword);

let arr = [uppercase, lowercase, number, symbol];
console.log(arr);

function generatePassword() {
  countCheckBoxes();

  if (countTickedCheckBox != 0) {
    let n = parseInt(displayLength.innerText);

    let arr2=[];

    for(let i=0;i<4;i++){
      if(arr[i].checked){
          arr2.push(arr[i]);
      }
    }

    let ans = "";
    for (let i = 0; i < n; i++) {
       
      let rand = Math.floor(Math.random() * countTickedCheckBox);
      
      if (arr2[rand] == uppercase) {
        ans+= getRandomUpperCaseLetter();   
      } else if (arr2[rand] == lowercase) {
        ans += getRandomLowerCaseLetter();
      } else if (arr2[rand] == number) {
        ans += getRandomIntegerNumber();
      } else {
        ans += getRandomSymbol();
      }
    }

    generatedOutput.value = ans;

    strengthOfPassword();
  }
}

function countCheckBoxes() {
  let cnt=0;
  for (let i = 0; i < 4; i++) {
    if (arr[i].checked) {
     cnt++;
    }
  }

  countTickedCheckBox=cnt;
}

function getRandomUpperCaseLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  return randomLetter;
}

function getRandomLowerCaseLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  return randomLetter;
}

function getRandomIntegerNumber() {
  const randomNum = Math.floor(Math.random() * 10);
  return randomNum;
}

function getRandomSymbol() {
  const specialCharacters = "!@#$%^&*()[]{}/<>+-=*/";
  let symbol =
    specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
  return symbol;
}

function strengthOfPassword() {
  let hasUpper = uppercase.checked;
  let hasLower = lowercase.checked;
  let hasNum = number.checked;
  let hasSymbol = symbol.checked;
  let passwordLen = parseInt(displayLength.innerText);

  //strong password
  if (hasUpper && hasLower && (hasNum || hasSymbol) && passwordLen >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasUpper || hasLower) &&
    (hasNum || hasSymbol) &&
    passwordLen >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

function setIndicator(color) {
  strengthIndicator.style.backgroundColor = color;
  strengthIndicator.style.boxShadow = `0px 0px 10px ${color}`;
}

copyButton.addEventListener("click", copyContentToClipboard);

async function copyContentToClipboard() {

  copiedText.style.scale="1";

  try {
    await navigator.clipboard.writeText(generatedOutput.value);
    copiedText.innerText = "copied";
  } catch {
    copiedText.innerText = "failed";
  }

  setTimeout(() => {
    copiedText.style.scale = "0";
  }, 5000);
}
