import './header.scss';
import { header } from '../../constants/variables.js';

class Header {
  constructor(container) {
    this.container = container;

    this.header = document.createElement('header');
    this.header.classList.add(header);

    this.heading = document.createElement('h1');
    this.heading.classList.add(`${header}__h1`);
    this.heading.innerHTML = 'Movie Search';

    this.header.append(this.heading);
    this.container.append(this.header);
  }
}

export default Header;
