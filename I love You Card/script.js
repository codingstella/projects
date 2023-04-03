(function () {

  hljs.highlightAll();

  var Confetti = function (options) {
    var t = this;
    t.o = options || {};


    //DOM storage
    t.doms = {};

    //Vars storage
    t.vars = {
      confettiFrequency: 3, //DEP???
      confettiColors: ['#fce18a', '#ff726d', '#b48def', '#f4306d'],
      confettiSpeed: ['slow', 'medium', 'fast'],
      confetiCount: 0,
      confetiLimit: 100,
      confettiDestroyTime: 3000, //ms
      confettiRenderTime: 60, //ms
      confettiSizeRange: [3, 7] };


    //classes store
    t.classes = {
      'confettiContainer': 'confetti-container' };


    //callbacks store
    t.callbacks = {};

    //Init if options are valid
    if (t.handleOptions()) {
      t.init();
    }

  };



  Confetti.prototype.handleOptions = function () {
    var t = this;

    if (t.o.target) {
      t.doms.target = t.o.target;
    } else {
      throw 'Confetti.options.target - is not valid DOM element';
      return false;
    }

    if (!!t.o.onstart) {
      t.callbacks.onstart = t.o.onstart;
    }

    if (!!t.o.ondone) {
      t.callbacks.ondone = t.o.ondone;
    }

    return true;
  };

  Confetti.prototype.setupElements = function () {
    var t = this,
    containerDOM = document.createElement('div'),
    targetPosition = t.doms.target.style.position;

    containerDOM.className = t.classes['confettiContainer'];

    if (targetPosition != 'relative' || targetPosition != 'absolute') {
      t.doms.target.style.position = 'relative';
    }

    t.doms.target.appendChild(containerDOM);
    t.doms.containerDOM = containerDOM;
  };

  Confetti.prototype.getContainerSize = function () {
    var t = this;

    return Math.floor(Math.random() * t.vars.confettiSizeRange[0]) + t.vars.confettiSizeRange[1] + 'px';
  };

  Confetti.prototype.getConfettiColor = function () {
    var t = this;

    return t.vars.confettiColors[Math.floor(Math.random() * t.vars.confettiColors.length)];
  };


  Confetti.prototype.getConfettiSpeed = function () {
    var t = this;

    return t.vars.confettiSpeed[Math.floor(Math.random() * t.vars.confettiSpeed.length)];
  };


  Confetti.prototype.getConfettiPosition = function () {
    var t = this;

    return Math.floor(Math.random() * t.doms.target.offsetWidth) + 'px';
  };

  Confetti.prototype.generateConfetti = function () {var _confettiDOM$classLis, _confettiDOM$classLis2;
    var t = this,
    confettiDOM = document.createElement('div'),
    confettiSize = t.getContainerSize(),
    confettiBackground = t.getConfettiColor(),
    confettiLeft = t.getConfettiPosition(),
    confettiSpeed = t.getConfettiSpeed();

    confettiDOM === null || confettiDOM === void 0 ? void 0 : (_confettiDOM$classLis = confettiDOM.classList) === null || _confettiDOM$classLis === void 0 ? void 0 : _confettiDOM$classLis.add('confetti');
    confettiDOM === null || confettiDOM === void 0 ? void 0 : (_confettiDOM$classLis2 = confettiDOM.classList) === null || _confettiDOM$classLis2 === void 0 ? void 0 : _confettiDOM$classLis2.add('confetti-animation-' + confettiSpeed);
    confettiDOM.style.left = confettiLeft;
    confettiDOM.style.width = confettiSize;
    confettiDOM.style.height = confettiSize;
    confettiDOM.style.backgroundColor = confettiBackground;

    confettiDOM.removeTimeout = setTimeout(function () {
      confettiDOM.parentNode.removeChild(confettiDOM);
    }, t.vars.confettiDestroyTime);

    t.doms.containerDOM.appendChild(confettiDOM);
  };

  Confetti.prototype.renderConfetti = function () {
    var t = this;

    if (t.callbacks.onstart) {
      t.callbacks.onstart();
    }

    t.confettiInterval = setInterval(function () {
      t.vars.confetiCount++;

      if (t.vars.confetiCount > t.vars.confetiLimit) {
        if (t.callbacks.ondone) {
          t.callbacks.ondone();
        }
        clearInterval(t.confettiInterval);
        return false;
      } else {
        t.generateConfetti();
      }


    }, t.vars.confettiRenderTime);
  };

  Confetti.prototype.restart = function (instance) {
    var t = this || instance;
    t.vars.confetiCount = 0;
    t.renderConfetti();
  };

  Confetti.prototype.start = Confetti.prototype.restart;

  Confetti.prototype.stop = function () {
    var t = this || instance;
    t.vars.confetiCount = t.vars.confetiLimit;
  };


  Confetti.prototype.init = function () {
    var t = this;

    t.setupElements();
  };


  const content = document.querySelector('.content');
  const gradient = document.querySelector('#background');
  const cardWrapper = document.querySelector('.card-wrapper');
  const audio = document.querySelector('audio');
  const confetti = new Confetti({ target: content });

  cardWrapper.addEventListener('click', () => {
    const isActive = cardWrapper.classList.contains('active');

    if (isActive) {
      cardWrapper.classList.remove('active');
      audio.pause();
      confetti.stop();
      gradient.style.opacity = 0;
    } else {
      cardWrapper.classList.add('active');
      audio.play();
      confetti.start();
      gradient.style.opacity = 1;
    }
  });


  //  https://codesandbox.io/s/3d-hover-effect-hqy6h?file=/src/index.js:0-944
  const card = cardWrapper;
  const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");
  const THRESHOLD = 30;

  function handleHover(e) {
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;
    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

    card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
  }

  function resetStyles(e) {
    card.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
  }

  if (!motionMatchMedia.matches) {
    card.addEventListener("mousemove", handleHover);
    card.addEventListener("mouseleave", resetStyles);
  }


  new Granim({
    element: '#gradient',
    direction: 'radial',
    isPausedWhenNotInView: true,
    states: {
      "default-state": {
        gradients: [
        ['#ff8faf', '#ffe5ed'],
        ['#f38fff', '#ffe5ed'],
        ['#ff8f8f', '#ffe5ed']] } } });




})();