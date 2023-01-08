const replaceAnchorsWithButtons = () => {
  const anchors = document.querySelectorAll(`a[data-replace-with-button]`);

  anchors.forEach((anchor) => {
    const button = document.createElement(`button`);
    button.type = `button`;
    if (anchor.hasAttribute(`id`)) {
      button.id = anchor.id;
    }
    button.innerHTML = anchor.innerHTML;
    button.className = anchor.className;

    anchor.parentElement.replaceChild(button, anchor);
  });
};

export default replaceAnchorsWithButtons;
