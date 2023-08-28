import getCoords from '../util/getCoords.js';

class Nav {
  constructor(navElem, buttonClass, menuClass, currentLinkClass) {
    this.navElem = navElem;
    this.buttonNoJSClass = `${buttonClass}--nojs`;
    this.menuNoJSClass = `${menuClass}--nojs`;
    this.buttonOpenClass = `${buttonClass}--open`;
    this.menuOpenClass = `${menuClass}--open`;
    this.button = this.navElem.querySelector(`.${buttonClass}`);
    this.menu = this.navElem.querySelector(`.${menuClass}`);
    this.links = (this.menu !== null) ? [...this.menu.querySelectorAll(`a[href]`)] : [];
    this.currentLinkClass = currentLinkClass;
  }

  init() {
    if (this.button !== null && this.menu !== null) {
      // show button
      this.button.classList.remove(this.buttonNoJSClass);
      // set initial `aria-expanded` value
      this.button.setAttribute(`aria-expanded`, false);
      // hide menu
      this.menu.classList.remove(this.menuNoJSClass);
      this.button.addEventListener(`click`, this.onButtonClick.bind(this));

      this.handleCurrentLinkClass();
      window.addEventListener(`hashchange`, this.onHashchange.bind(this));

      this.links.forEach((link) => {
        const htmlHref = link.getAttribute(`href`);
        const pageFragment = (htmlHref[0] === `#` && htmlHref.length > 1) ?
          document.querySelector(htmlHref) :
          null;

        if (pageFragment !== null) {
          link.pageFragment = pageFragment;
          link.addEventListener(`click`, this.onPageFragmentLinkClick.bind(this));
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

  handleCurrentLinkClass () {
    const loc = window.location;

    this.links.forEach((link) => {
      if (link.href === loc.href) {
        link.classList.add(this.currentLinkClass);
      } else {
        link.classList.remove(this.currentLinkClass);
      }
    });
  }

  onHashchange () {
    this.handleCurrentLinkClass();
  }

  onPageFragmentLinkClick(evt) {
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
