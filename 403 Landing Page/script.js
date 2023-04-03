function norm(value, min, max) {
  return (value - min) / (max - min);
}

function lerp(norm, min, max) {
  return (max - min) * norm + min;
}

function map(value, sourceMin, sourceMax, destMin, destMax) {
  return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
}

function map2(value, sourceMin, sourceMax, destMin, destMax, percent) {
  return percent <= 0.5
    ? map(value, sourceMin, sourceMax, destMin, destMax)
    : map(value, sourceMin, sourceMax, destMax, destMin);
}

function fisheye(el) {
  let text = el.innerText.trim(),
    numberOfChars = text.length;

  el.innerHTML =
    "<span>" +
    text
      .split("")
      .map(c => {
        return c === " " ? "&nbsp;" : c;
      })
      .join("</span><span>") +
    "</span>";

  el.querySelectorAll("span").forEach((c, i) => {
    const skew = map(i, 0, numberOfChars - 1, -15, 15),
      scale = map2(i, 0, numberOfChars - 1, 1, 3, i / numberOfChars),
      letterSpace = map2(i, 0, numberOfChars - 1, 5, 20, i / numberOfChars);

    c.style.transform = "skew(" + skew + "deg) scale(1, " + scale + ")";
    c.style.letterSpacing = letterSpace + "px";
  });
}

fisheye(document.querySelector("h1"));