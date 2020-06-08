const getMovieData = (page, word = 'dream') => {
  const url = `https://www.omdbapi.com/?s=${word}&page=${page}&apikey=399cdd22`;

  const resolve = fetch(url)
    .then((res) => res.json());
  return resolve;
};

export default getMovieData;
