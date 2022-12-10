export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "c0c36b6248307167e7611b2961acf74f";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieInfo: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
};
