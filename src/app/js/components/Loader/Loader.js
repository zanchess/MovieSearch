import { loading } from '../../constants/variables.js';
import './loader.scss';


class Loader {
  constructor(container) {
    this.container = container;

    this.loaderWrap = document.createElement('div');
    this.loaderWrap.classList.add(`${loading}__wrapper`);
    this.loaderWrap.classList.add(`${loading}__wrapper_hidden`);

    this.windowOverlay = document.createElement('div');
    this.windowOverlay.classList.add(`${loading}__overlay`);

    this.loader = document.createElement('div');
    this.loader.classList.add(`${loading}__dual-ring`);

    this.loaderWrap.append(this.loader, this.windowOverlay);
    this.container.append(this.loaderWrap);
  }

  loadContent() {
    this.loaderWrap.classList.remove(`${loading}__wrapper_hidden`);
  }

  endLoadContent() {
    this.loaderWrap.classList.add(`${loading}__wrapper_hidden`);
  }
}

export default Loader;
