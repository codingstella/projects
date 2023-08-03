let body = document.getElementsByTagName("BODY")[0];
let gradientDirection = document.querySelector("#gradient_direction");
let firstHex = document.querySelector("#first_hex");
let secondHex = document.querySelector("#second_hex");
let changeBg = document.querySelector("#change_bg");
let content = document.querySelector(".content");

changeBg.addEventListener("click", colorChange)

function colorChange(){
  // body.style.background = 'linear-gradient(to right, '
  //       + firstHex.value + ', ' + secondHex.value + ')';
  body.style.background = `linear-gradient(to ${gradientDirection.value} , ${firstHex.value} , ${secondHex.value})`;
  content.style.color = "#fff"; 
  changeBg.style.border = "1px solid #fff";
  changeBg.style.color = "#fff";
}
