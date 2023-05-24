let rect = document.getElementById("rect");
let username = document.getElementById("username");
let password = document.getElementById("password");

function handle1() {
	rect.setAttribute("class", "rect2");
}

function handle2() {
	rect.setAttribute("class", "rect1");
}

//For codepen header!!!
setTimeout(() => {
	password.focus();
}, 500);

setTimeout(() => {
	username.focus();
}, 1500);