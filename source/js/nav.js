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
      // close menu
      this.menu.classList.remove(this.menuNoJSClass);

      this.button.setAttribute(`aria-expanded`, false);
      this.button.addEventListener(`click`, this.onButtonClick.bind(this));
    }
  }

  onButtonClick(evt) {
    const target = evt.currentTarget;
    const expanded = target.getAttribute(`aria-expanded`) === `true`;

    target.setAttribute(`aria-expanded`, !expanded);
    target.classList.toggle(this.buttonOpenClass);
    this.menu.classList.toggle(this.menuOpenClass);
  }
}

export default Nav;
