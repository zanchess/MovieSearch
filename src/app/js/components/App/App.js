/* eslint-disable import/no-named-as-default */
import Header from '../Header/Header.js';
import Movies from '../Movies/Movies.js';
import Search from '../Search/Search.js';
import Footer from '../Footer/Footer.js';
import Loader from '../Loader/Loader.js';
import getMovieData from '../../api/get-movies.js';
import getEngTranslate from '../../api/get-translate.js';
import { keyboard } from '../Search/keyboard/keyboard.js';


class App {
  constructor(container) {
    this.container = container;

    this.page = 1;
    this.translate = null;

    this.header = new Header(this.container);
    this.search = new Search(this.container);
    this.loader = new Loader(this.container);
    this.movies = new Movies(this.container);
    this.footer = new Footer(this.container);
    this.moviesData = [];
  }

  /* Func for start load page */
  getMoviesData() {
    this.loader.loadContent();
    getMovieData(this.page)
      .then((res) => {
        this.moviesData = res;
        return res;
      })
      .then(() => {
        this.movies.renderMovieCards(this.moviesData);
      })
      .then(() => {
        this.loader.endLoadContent();
      });
  }

  /* Func for load page for request */
  getDataForRequest(word) {
    this.loader.loadContent();
    getMovieData(this.page, word)
      .then((res) => {
        try {
          this.movies.updateMoviesCard(res, word);
          this.search.showErrors(`You get ${res.totalResults} films for request '${word}'`);
          this.movies.mySwiper.update();
        } catch (error) {
          this.loader.endLoadContent();
          this.search.showErrors(`No results for '${word}'`);
        }
      })
      .then(() => {
        this.search.hideErrors();
        this.loader.endLoadContent();
      });
  }

  /* Get translate  russian word */
  getWordForSearch(word) {
    getEngTranslate(word)
      .then((res) => {
        this.getDataForRequest(res.text[0]);
      });
  }

  setSearchHandlers() {
    this.search.serchClearBtn.addEventListener('click', () => {
      this.search.removeWordInput();
    });

    this.search.searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.search.setInputWord();
      const word = this.search.searchFilms();
      if (word) {
        this.getWordForSearch(word);
      }
    });
    keyboard.addEventListener('click', (e) => {
      if (e.target.classList.contains('enter')) {
        this.search.setInputWord();
        const word = this.search.searchFilms();
        if (word) {
          this.getWordForSearch(word);
        }
      }
    });
  }

  initSearching() {
    this.setSearchHandlers();
    this.search.appendKeyboard();
    this.search.searchInput.focus();
    this.search.showKeyboard();
  }
}

export default App;
