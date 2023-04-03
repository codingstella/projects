const card = document.querySelector('.card'),
      input = document.querySelector('.input'),
      line2 = document.querySelector('.line2');
document.querySelector('.form').addEventListener('submit', function(e) {
  input.blur();
  card.classList.add('saving');
  e.preventDefault();
});
line2.addEventListener('animationend', function(e) {
  setTimeout(() => {
    card.classList.add('done');
  }, 1000);
});