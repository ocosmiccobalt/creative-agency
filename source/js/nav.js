import getCoords from './util/getCoords.js';

class Nav {
  constructor(navElem, buttonClass, menuClass) {
    this.navElem = navElem;
    this.buttonNoJSClass = `${buttonClass}--nojs`;
    this.menuNoJSClass = `${menuClass}--nojs`;
    this.buttonOpenClass = `${buttonClass}--open`;
    this.menuOpenClass = `${menuClass}--open`;
    this.button = this.navElem.querySelector(`.${buttonClass}`);
    this.menu = this.navElem.querySelector(`.${menuClass}`);
  }

  init() {
    if (this.button !== null && this.menu !== null) {
      // show button
      this.button.classList.remove(this.buttonNoJSClass);
      this.button.setAttribute(`aria-expanded`, false);
      // hide menu
      this.menu.classList.remove(this.menuNoJSClass);

      this.button.addEventListener(`click`, this.onButtonClick.bind(this));

      this.innerLinks = this.menu.querySelectorAll(`a[href^='#']`);

      this.innerLinks.forEach((link) => {
        const href = link.getAttribute(`href`);
        link.pageFragment = (href.length > 1) ? document.querySelector(href) : null;

        if (link.pageFragment !== null) {
          link.addEventListener(`click`, this.onLinkClick.bind(this));
        }
      });
    }
  }

  onButtonClick(evt) {
    const target = evt.currentTarget;
    const expanded = target.getAttribute(`aria-expanded`) === `true`;

    target.setAttribute(`aria-expanded`, !expanded);
    target.classList.toggle(this.buttonOpenClass);
    this.menu.classList.toggle(this.menuOpenClass);
  }

  onLinkClick(evt) {
    const target = evt.currentTarget;
    const linkedFragmentCoords = getCoords(target.pageFragment);
    const menuCoords = getCoords(this.menu);

    if (menuCoords.bottom > linkedFragmentCoords.top) {
      this.button.setAttribute(`aria-expanded`, false);
      this.button.classList.remove(this.buttonOpenClass);
      this.menu.classList.remove(this.menuOpenClass);
    }
  }
}

export default Nav;
