import Nav from './nav.js';
import replaceAnchorsWithButtons from './util/replaceAnchorsWithButtons.js';

const init = (Component, elemSelector, ...rest) => {
  const elem = document.querySelector(elemSelector);

  if (elem !== null) {
    const instance = new Component(elem, ...rest);
    instance.init();
  }
};

const work = () => {
  init(Nav, `.main-nav`, `main-nav__toggle`, `site-list`);
  replaceAnchorsWithButtons();
};

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
