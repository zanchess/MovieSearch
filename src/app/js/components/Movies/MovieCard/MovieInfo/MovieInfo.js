import { info } from '../../../../constants/variables.js';
import './movie-info.scss';


class MovieInfo {
  constructor(
    movieData, modalWraper, modalWindow,
  ) {
    this.modalWindow = modalWindow;
    this.modalWraper = modalWraper;
    this.movieData = movieData;

    this.infoWrapper = document.createElement('div');
    this.infoWrapper.classList.add(`${info}__wparrer`);

    this.title = document.createElement('h2');
    this.title.classList.add(`${info}__title`);
    this.title.innerHTML = `${this.movieData.Title}`;

    this.country = document.createElement('p');
    this.country.classList.add(`${info}__country`);
    this.country.innerHTML = `Country: ${this.movieData.Country}`;

    this.actors = document.createElement('p');
    this.actors.classList.add(`${info}__country`);
    this.actors.innerHTML = `Actors: ${this.movieData.Actors}`;

    this.year = document.createElement('p');
    this.year.classList.add(`${info}__year`);
    this.year.innerHTML = `Year: ${this.movieData.Year}`;

    this.genre = document.createElement('p');
    this.genre.classList.add(`${info}__genre`);
    this.genre.innerHTML = `Genre: ${this.movieData.Genre}`;

    this.plot = document.createElement('p');
    this.plot.classList.add(`${info}__plot`);
    this.plot.innerHTML = `Description: ${this.movieData.Plot}`;

    this.runtime = document.createElement('p');
    this.runtime.classList.add(`${info}__runtime`);
    this.runtime.innerHTML = `Runtime: ${this.movieData.Runtime}`;

    this.modalWraper.append(
      this.title,
      this.actors,
      this.country,
      this.year,
      this.genre,
      this.runtime,
      this.plot,
    );
  }

  showWindowWithInfo() {
    this.movieInfoWindow.classList.remove(`${info}__hidden`);
    this.movieInfoOverlay.classList.remove(`${info}__hidden`);
  }

  hideWindowWithInfo() {
    this.movieInfoWindow.classList.add(`${info}__hidden`);
    this.movieInfoOverlay.classList.add(`${info}__hidden`);
  }

  createWindowWithInfo() {
    this.movieInfoWrapper.innerHTML = '';
    const fragmet = document.createDocumentFragment();

    const movieName = document.createElement('h2');
    const movieYear = document.createElement('p');
    const movieRating = document.createElement('p');
    const movieDescription = document.createElement('p');

    fragmet.append(
      movieName,
      movieYear,
      movieRating,
      movieDescription,
    );

    this.movieInfoWrapper.append(fragmet);
    this.showWindowWithInfo();
  }
}

export default MovieInfo;
