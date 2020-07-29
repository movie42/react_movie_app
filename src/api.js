import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "c8217c197351c46c3ee280e4e9a2e542",
    language: "ko-KOREA",
  },
});

export const tvApi = {
  topRated: () =>
    api.get("tv/top_rated", {
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
  airingToday: () =>
    api.get("tv/airing_today", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
      },
    }),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        query: encodeURIComponent(term),
      },
    }),
};

export const moviesApi = {
  nowPlaying: () =>
    api.get("movie/now_playing", {
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
  popular: () =>
    api.get("movie/popular", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
      },
    }),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        query: encodeURIComponent(term),
      },
    }),
};
