import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  parmas: {
    api_key: "c8217c197351c46c3ee280e4e9a2e542",
    language: "ko-KOREA",
  },
});

export const movieApi = {
  nowPlaying: () =>
    api.get("movie/now_playing", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
      },
    }),
  popular: () =>
    api.get("movie/popular", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
      },
    }),
  upComing: () =>
    api.get("movie/upcoming", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
      },
    }),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        query: term,
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
      },
    }),
};

export const tvApi = {
  on_the_air: () =>
    api.get("tv/on_the_air", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
      },
    }),
  popular: () =>
    api.get("tv/popular", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
      },
    }),
  top_rated: () =>
    api.get("tv/top_rated", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
      },
    }),
  tvDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
      },
    }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: term,
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
      },
    }),
};
