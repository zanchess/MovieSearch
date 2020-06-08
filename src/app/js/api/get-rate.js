const getMovieRate = (id) => {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=399cdd22`;

  const result = fetch(url)
    .then((res) => res.json());
  return result;
};

export default getMovieRate;
