class ColorSchemeSwitcher {
  constructor(switcherElem) {
    this.elem = switcherElem;
    this.lightStyles = document.querySelectorAll(
      `link[rel=stylesheet][media*=prefers-color-scheme][media*=light]`
    );
    this.darkStyles = document.querySelectorAll(
      `link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]`
    );
    this.lightMedia = `(prefers-color-scheme: light)`;
    this.darkMedia = `(prefers-color-scheme: dark)`;
    this.radioSelector = `input[type=radio][name=color-scheme]`;
    this.radios = this.elem.querySelectorAll(this.radioSelector);
  }

  init() {
    const getSavedScheme = () => localStorage.getItem(`color-scheme`);
    const getSystemScheme = () => (
      matchMedia(this.darkMedia).matches ? `dark` : `light`
    );

    const savedScheme = getSavedScheme();
    const systemScheme = getSystemScheme();

    if (savedScheme !== null) {
      const currentRadio = this.elem.querySelector(
        `${this.radioSelector}[value=${savedScheme}]`
      );
      currentRadio.checked = true;
    }

    this.radios.forEach(
      (radio) => radio.addEventListener(`change`, this.onRadioChange.bind(this))
    );

    if (savedScheme !== systemScheme && savedScheme !== null) {
      this.setScheme(savedScheme);
    }
  }

  onRadioChange(evt) {
    this.setScheme(evt.target.value);
  }

  setScheme(scheme) {
    const switchMedia = () => {
      let currentLightMedia;
      let currentDarkMedia;

      if (scheme === `auto`) {
        currentLightMedia = this.lightMedia;
        currentDarkMedia = this.darkMedia;
      } else {
        currentLightMedia = (scheme === `light`) ? `all` : `not all`;
        currentDarkMedia = (scheme === `dark`) ? `all` : `not all`;
      }

      this.lightStyles.forEach((link) => {
        link.media = currentLightMedia;
      });
      this.darkStyles.forEach((link) => {
        link.media = currentDarkMedia;
      });
    };

    const manageStorage = () => {
      const clearScheme = () => localStorage.removeItem(`color-scheme`);
      const saveScheme = () => localStorage.setItem(`color-scheme`, scheme);

      if (scheme === `auto`) {
        clearScheme();
      } else {
        saveScheme();
      }
    };

    switchMedia();
    manageStorage();
  }
}

export default ColorSchemeSwitcher;
