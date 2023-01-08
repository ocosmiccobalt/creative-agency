import Nav from './nav';

const work = () => {
  const navElem = document.querySelector(`.main-nav`);

  if (navElem !== null) {
    const nav = new Nav(navElem);
    nav.init();
  }
};

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
