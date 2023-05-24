const navigationOptions = [
  {
    name: 'home',
    color: '#5B37B7'
  },
  {
    name: 'likes',
    color: '#C9379D'
  },
  {
    name: 'search',
    color: '#E6A919'
  },
  {
    name: 'profile',
    color: '#1892A6'
  }
];

const links = document.querySelectorAll('nav a');

function handleClick(e) {
  e.preventDefault();
  links.forEach(link => {
    if (link.classList.contains('active')) {
      link.classList.remove('active');
    }
  });

  const name = this.textContent.trim().toLowerCase();
  const { color } = navigationOptions.find(item => item.name === name);
  const style = window.getComputedStyle(this);
  const hoverColor = style.getPropertyValue('--hover-c');

  if (color !== hoverColor) {
    this.style.setProperty('--hover-bg', `${color}20`);
    this.style.setProperty('--hover-c', color);
  }

  this.classList.add('active');
  document.querySelector('body').style.background = color;
}

links.forEach(link => link.addEventListener('click', handleClick));