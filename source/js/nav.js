class Nav {
  constructor(navElem) {
    this.navElem = navElem;
    this.button = this.navElem.querySelector(`.main-nav__toggle`);
    this.menu = this.navElem.querySelector(`.site-list`);
  }

  init() {
    if (this.button !== null && this.menu !== null) {
      // show button
      this.button.classList.remove(`main-nav__toggle--nojs`);
      // close menu
      this.menu.classList.remove(`site-list--nojs`);

      this.button.setAttribute(`aria-expanded`, false);
      this.button.addEventListener(`click`, this.onButtonClick.bind(this));
    }
  }

  onButtonClick(evt) {
    const target = evt.currentTarget;
    const expanded = target.getAttribute(`aria-expanded`) === `true`;

    target.setAttribute(`aria-expanded`, !expanded);
    target.classList.toggle(`main-nav__toggle--open`);
    this.menu.classList.toggle(`site-list--open`);
  }
}

export default Nav;
