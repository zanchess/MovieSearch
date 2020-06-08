import {
  dataKeyLetters, notSymbol, dataKeyNumbers, dataKeyFunc,
} from './data-keyboar.js';
import { ru, eng } from '../../../constants/variables.js';
import './keyboard.scss';

const container = document.createElement('div');
export const keyboard = document.createElement('div');


const createKeyboard = (parent, searchInput) => {
  let currentLanguage = ru;
  /* Get root block  and create dom nodes */

  /* add main blocks in dom */
  keyboard.className = 'keyboard keyboard-hidden';

  const fragment = document.createDocumentFragment();
  fragment.append(container);

  container.append(keyboard);
  parent.append(fragment);

  /* parse data keyboard */
  const setLanguage = () => {
    const cashLanguage = localStorage.getItem('lang');
    if (!cashLanguage || cashLanguage === ru) {
      currentLanguage = ru;
    } else if (cashLanguage === eng) {
      currentLanguage = eng;
    }
  };

  /* create keys for keyboard */
  const createKeys = (element) => {
    const key = document.createElement('div');
    switch (currentLanguage) {
      case ru:
        key.innerHTML = element.RU.toLocaleLowerCase();
        break;
      case eng:
        key.innerHTML = element.EN.toLocaleLowerCase();
        break;
      default:
        break;
    }
    key.className = `key ${element.key}`;
    key.setAttribute('data-code', element.code);
    keyboard.appendChild(key);
  };

  /* Func which create russian keyboard DOM */
  const createKeyboardBlocks = () => {
    dataKeyLetters.forEach((elem) => {
      createKeys(elem);
    });
    dataKeyNumbers.forEach((elem) => {
      createKeys(elem);
    });
    dataKeyFunc.forEach((elem) => {
      createKeys(elem);
    });
  };

  /* Get keyboard with language which we need */
  setLanguage();
  createKeyboardBlocks();

  /* Change on English Keyboard func */
  const changeLanguage = () => {
    const letters = keyboard.querySelectorAll('div');
    if (currentLanguage === ru) {
      currentLanguage = eng;
      letters.forEach((elem) => {
        const datacode = elem.getAttribute('data-code');
        dataKeyLetters.forEach((cell) => {
          if (cell.code === datacode) {
            elem.innerHTML = cell.EN.toLowerCase();
          }
        });
      });
    } else {
      currentLanguage = ru;
      letters.forEach((elem) => {
        const datacode = elem.getAttribute('data-code');
        dataKeyLetters.forEach((cell) => {
          if (cell.code === datacode) {
            elem.innerHTML = cell.RU.toLowerCase();
          }
        });
      });
    }
    localStorage.setItem('lang', currentLanguage);
  };

  /* key down CapsLock key */
  const changeCaps = () => {
    const letters = keyboard.querySelectorAll('div');
    letters.forEach((elem) => {
      const datacode = elem.getAttribute('data-code');
      if (!notSymbol.includes(datacode)) {
        elem.classList.toggle('caps-lock');
      }
    });
  };

  /* MOUSE */
  /* handler functions for mouse events */
  const mouseDown = (e) => {
    const dataCode = e.target.getAttribute('data-code');
    e.target.classList.add('click');
    const textArray = searchInput.value.split('');
    const positionOfEntry = searchInput.selectionStart;

    if (!e.target.classList.contains('keyboard') && (!notSymbol.includes(dataCode)) && e.target.classList.contains('caps-lock')) {
      textArray.splice(positionOfEntry, 0, e.target.innerHTML.toUpperCase());
      searchInput.value = textArray.join('');
      searchInput.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
    }
    if (!e.target.classList.contains('keyboard') && (!notSymbol.includes(dataCode)) && !e.target.classList.contains('caps-lock')) {
      textArray.splice(positionOfEntry, 0, e.target.innerHTML.toLowerCase());
      searchInput.value = textArray.join('');
      searchInput.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
    }
    if (dataCode === 'Tab') {
      textArray.splice(positionOfEntry, 0, '    ');
      searchInput.value = textArray.join('');
      searchInput.setSelectionRange(positionOfEntry + 4, positionOfEntry + 4);
    }
    if (dataCode === 'ArrowLeft') {
      searchInput.value = textArray.join('');
      searchInput.setSelectionRange(positionOfEntry - 1, positionOfEntry - 1);
    }
    if (dataCode === 'ArrowRight') {
      searchInput.value = textArray.join('');
      searchInput.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
    }
    if (dataCode === 'Backspace') {
      const str = searchInput.value;
      searchInput.value = str.substring(0, str.length - 1);
    }
    if (dataCode === 'CapsLock') {
      changeCaps();
    }
    if (dataCode === 'Delete') {
      textArray.splice(positionOfEntry, 1);
      searchInput.value = textArray.join('');
      searchInput.setSelectionRange(positionOfEntry, positionOfEntry);
    }
    if (dataCode === 'ControlLeft') {
      changeLanguage();
    }
  };

  /* mouse up handler */
  const endClick = (e) => {
    if (!e.target.classList.contains('keyboard')) {
      e.target.classList.remove('click');
    }
    if (e.target.classList.contains('key')) {
      searchInput.focus();
    }
  };

  /* add handler for mousedown */
  keyboard.addEventListener('mousedown', mouseDown);

  /* add handlers for mousedown and mouseout */
  keyboard.addEventListener('mouseup', endClick);
  keyboard.addEventListener('mouseout', endClick);

  /* add handler for keydown and keyup  */
};

export default createKeyboard;
