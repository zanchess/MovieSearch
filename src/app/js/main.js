/* eslint-disable import/no-named-as-default */
import '../css/style.scss';
import App from './components/App/App.js';


window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');

  const app = new App(root);
  app.getMoviesData();
  app.initSearching();
});
