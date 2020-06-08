import { footer } from '../../constants/variables.js';
import './footer.scss';

class Footer {
  constructor(container) {
    this.container = container;
    this.footer = document.createElement('footer');
    this.footer.classList.add(`${footer}`);

    this.footerCopy = document.createElement('h3');
    this.footerCopy.classList.add(`${footer}__copy`);
    this.footerCopy.innerHTML = 'RS 2020';

    this.footerLinkBlock = document.createElement('div');
    this.footerLinkBlock.classList.add(`${footer}__link-block`);

    this.footerLinkImg = document.createElement('img');
    this.footerLinkImg.classList.add(`${footer}__link-img`);

    this.footerLink = document.createElement('a');
    this.footerLink.classList.add(`${footer}__link`);
    this.footerLink.setAttribute('href', 'https://github.com/zanchess');
    this.footerLink.innerHTML = 'My GitHub Page';

    this.footerLinkBlock.append(this.footerLinkImg, this.footerLink);

    this.footer.append(this.footerCopy, this.footerLinkBlock);

    this.container.append(this.footer);
  }
}

export default Footer;
