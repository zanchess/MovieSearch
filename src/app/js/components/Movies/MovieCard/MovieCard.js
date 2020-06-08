/* eslint-disable import/no-named-as-default */
import './movie-cards.scss';
import { film, filmsLink, movies } from '../../../constants/variables.js';
import getMovieRate from '../../../api/get-rate.js';
import MovieInfo from './MovieInfo/MovieInfo.js';
import noPoster from '../../../../assets/img/noposter.jpg';


class MovieCard {
  constructor(
    title,
    year,
    id,
    poster,
    modalWrapper,
    modalWindow,
    modalOverlay,
    modalCloseButton,
  ) {
    this.title = title;
    this.year = year;
    this.id = id;
    this.poster = poster;
    this.modalWrapper = modalWrapper;
    this.modalWindow = modalWindow;
    this.modalOverlay = modalOverlay;
    this.modalCloseButton = modalCloseButton;
    this.infoBlock = null;

    this.filmsWindow = document.createElement('div');
    this.filmsWindow.classList.add(`${film}__window`);

    this.movieCard = document.createElement('div');
    this.movieCard.className = `${film} swiper-slide`;

    this.movieTitle = document.createElement('a');
    this.movieTitle.classList.add(`${film}__title`);
    this.movieTitle.setAttribute('href', `${filmsLink}${this.id}/`);
    this.movieTitle.innerHTML = this.title;

    this.movieImg = document.createElement('div');
    this.movieImg.classList.add(`${film}__img`);
    this.movieImg.style.backgroundImage = `url(${this.poster !== 'N/A' ? this.poster : noPoster})`;

    this.movieDescripton = document.createElement('div');
    this.movieDescripton.classList.add(`${film}__descr`);

    this.movieBtn = document.createElement('div');
    this.movieBtn.classList.add(`${film}__btn`);
    this.movieBtn.innerHTML = 'More Info';

    this.movieRate = document.createElement('div');
    this.movieRate.classList.add(`${film}__rate`);


    this.movieYear = document.createElement('div');
    this.movieYear.classList.add(`${film}__year`);

    this.movieDescripton.append(this.movieBtn, this.movieRate, this.movieYear);
  }


  getRateData(id) {
    getMovieRate(id)
      .then((res) => {
        this.movieInfo = res;
        return res;
      })
      .then(() => {
        this.movieRate.innerHTML = `Score: ${this.movieInfo.imdbRating}`;
        this.movieYear.innerHTML = `Release: ${this.movieInfo.Year}`;
        this.movieCard.append(this.movieTitle, this.movieImg, this.movieDescripton);
      });
  }

  setImageHandler() {
    this.movieBtn.addEventListener('click', () => {
      this.modalWindow.classList.remove(`${movies}__info_hidden`);
      this.modalOverlay.classList.remove(`${movies}__overlay_hidden`);
      this.modalWrapper.innerHTML = '';
      this.infoBlock = new MovieInfo(
        this.movieInfo,
        this.modalWrapper,
        this.modalWindow,
        this.modalOverlay,
        this.modalCloseButton,
      );
    });
  }
}


export default MovieCard;
