const button = document.querySelector(".ripple-btn");

button.addEventListener("click", drawRipple);

function drawRipple(event) {
  const x = event.clientX - event.target.offsetLeft;
  const y = event.clientY - event.target.offsetTop;

  const ripples = document.createElement("span");
  ripples.style.left = x + "px";
  ripples.style.top = y + "px";

  this.appendChild(ripples);

  setTimeout(() => {
    ripples.remove();
  }, 1000);
}