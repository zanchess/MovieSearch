/* eslint-disable import/no-extraneous-dependencies */
import './movies.scss';


import Swiper from 'swiper';
import MovieCard from './MovieCard/MovieCard.js';
import { movies, info } from '../../constants/variables.js';
import swiperSettings from '../../constants/swiper-settings.js';
import getMovieData from '../../api/get-movies.js';


class Movies {
  constructor(container) {
    this.page = 1;
    this.data = null;
    this.container = container;
    this.mySwiper = null;
    this.moviesData = null;
    this.currentRequest = 'dream';

    this.moviesBlock = document.createElement('div');
    this.moviesBlock.className = `${movies} swiper-container`;

    this.swiperWrap = document.createElement('div');
    this.swiperWrap.className = 'swiper-wrapper';

    this.swipePagination = document.createElement('div');
    this.swipePagination.className = 'swiper-pagination';

    this.swipeLeftArrow = document.createElement('div');
    this.swipeLeftArrow.className = 'swiper-button-prev swiper-prew';

    this.swipeRightArrow = document.createElement('div');
    this.swipeRightArrow.className = 'swiper-button-next swiper-next';

    this.moviesInfoWindow = document.createElement('div');
    this.moviesInfoWindow.className = `${movies}__info ${movies}__info_hidden`;

    this.movieInfoWrapper = document.createElement('div');
    this.movieInfoWrapper.classList.add(`${info}__wapprer`);

    this.closeButton = document.createElement('button');
    this.closeButton.className = `${movies}__close-btn`;
    this.closeButton.innerHTML = 'Close';

    this.movieInfoOverlay = document.createElement('div');
    this.movieInfoOverlay.className = `${movies}__overlay ${movies}__overlay_hidden`;


    this.moviesInfoWindow.append(this.movieInfoWrapper, this.closeButton);

    this.moviesBlock.append(
      this.swiperWrap,
      this.swipePagination,
      this.swipeLeftArrow,
      this.swipeRightArrow,
    );
    this.container.append(this.moviesBlock, this.moviesInfoWindow, this.movieInfoOverlay);
  }

  /* Load next 10 cards with film */
  setHundlerForSwiper() {
    this.mySwiper.on('slideChange', () => {
      if ((this.mySwiper.slides.length - 8) <= this.mySwiper.activeIndex) {
        this.page += 1;
        getMovieData(this.page, this.currentRequest)
          .then((res) => {
            this.moviesData = res;
            return res;
          })
          .then(() => {
            this.addNextPageOfFilms(this.moviesData);
          });
      }
    });
  }

  /* close modal window with information about current film */
  setCloseBtnHandler() {
    this.closeButton.addEventListener('click', () => {
      this.moviesInfoWindow.classList.add(`${movies}__info_hidden`);
      this.movieInfoOverlay.classList.add(`${movies}__overlay_hidden`);
    });
  }

  /* Renderd card func */
  parseCards(arr, fr) {
    arr.forEach((elem) => {
      const card = new MovieCard(
        elem.Title,
        elem.Year,
        elem.imdbID,
        elem.Poster,
        this.movieInfoWrapper,
        this.moviesInfoWindow,
        this.movieInfoOverlay,
        this.closeButton,
      );
      card.getRateData(elem.imdbID);
      fr.append(card.movieCard);
      card.setImageHandler();
      this.setCloseBtnHandler();
    });
  }

  /* render start page cards */
  renderMovieCards(data) {
    this.data = data;
    const arrOfMovies = this.data.Search;
    const fragment = document.createDocumentFragment();
    this.parseCards(arrOfMovies, fragment);
    this.mySwiper = new Swiper('.swiper-container', swiperSettings);
    this.mySwiper.appendSlide(fragment);
    this.setHundlerForSwiper();
  }

  /* Render next page cars */
  addNextPageOfFilms(data) {
    this.data = data;
    const arrOfMovies = this.data.Search;
    const fragment = document.createDocumentFragment();
    this.parseCards(arrOfMovies, fragment);
    this.mySwiper.appendSlide(fragment);
    this.mySwiper.update();
  }

  /* Render cards for our search */
  updateMoviesCard(data, request) {
    this.data = data;
    this.currentRequest = request;
    const arrOfMovies = this.data.Search;
    const fragment = document.createDocumentFragment();
    this.parseCards(arrOfMovies, fragment);
    this.mySwiper.removeAllSlides();
    this.swiperWrap.append(fragment);
    this.mySwiper.update();
    this.mySwiper.slideTo(0);
  }
}


export default Movies;
