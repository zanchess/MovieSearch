import './search.scss';
import { search, error } from '../../constants/variables.js';
import keyboradIcon from '../../../assets/img/keyboard.png';
import createKeyboard from './keyboard/keyboard.js';


class Search {
  constructor(container) {
    this.container = container;
    this.inputValue = null;
    this.wordTranslate = null;

    this.errorBlock = document.createElement('div');
    this.errorBlock.classList.add(`${error}`);

    this.keyboardBlock = document.createElement('div');

    this.searchForm = document.createElement('form');
    this.searchForm.classList.add(search);

    this.searchInput = document.createElement('input');
    this.searchInput.classList.add(`${search}__input`);
    this.searchInput.setAttribute('placeholder', 'Search Movie');
    this.searchInput.setAttribute('type', 'text');

    this.serchClearBtn = document.createElement('span');
    this.serchClearBtn.classList.add(`${search}__clear-btn`);
    this.serchClearBtn.innerHTML = 'X';

    this.keyboardBtn = document.createElement('img');
    this.keyboardBtn.classList.add(`${search}__keyboard`);
    this.keyboardBtn.setAttribute('src', keyboradIcon);

    this.searchBtn = document.createElement('input');
    this.searchBtn.setAttribute('type', 'submit');
    this.searchBtn.setAttribute('value', 'Search');
    this.searchBtn.classList.add(`${search}__search-btn`);

    this.virtualEnter = document.querySelector('.enter');

    this.searchForm.append(this.searchInput, this.serchClearBtn, this.keyboardBtn, this.searchBtn);
    this.container.append(this.errorBlock, this.searchForm, this.keyboardBlock);
  }

  showErrors(errorMessage) {
    this.errorBlock.innerHTML = `${errorMessage}`;
  }

  hideErrors() {
    setTimeout(() => {
      this.errorBlock.innerHTML = '';
    }, 2500);
  }

  clearInput() {
    this.searchInput.value = '';
    this.inputValue = null;
  }

  setInputWord() {
    this.inputValue = this.searchInput.value;
  }

  removeWordInput() {
    this.clearInput();
    this.searchInput.focus();
  }

  focusInput() {
    this.searchInput.focus();
  }

  searchFilms() {
    if (this.inputValue) {
      return this.inputValue;
    }
    return false;
  }

  appendKeyboard() {
    createKeyboard(this.keyboardBlock, this.searchInput);
  }


  showKeyboard() {
    this.keyboardBtn.addEventListener('click', () => {
      const keyboard = document.querySelector('.keyboard');
      keyboard.classList.toggle('keyboard-hidden');
    });
  }
}


export default Search;
