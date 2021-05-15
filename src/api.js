import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "c8217c197351c46c3ee280e4e9a2e542",
  },
});

export const movieApi = {
  nowPlaying: () =>
    api.get("movie/now_playing", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        language: "ko-KR",
      },
    }),
  popular: () =>
    api.get("movie/popular", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        language: "ko-KR",
      },
    }),
  upComing: () =>
    api.get("movie/upcoming", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        language: "ko-KR",
      },
    }),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        language: "ko-KR",
      },
    }),
  movieDetailVideo: (id) =>
    api.get(`movie/${id}/videos`, {
      params: {
        append_to_response: "videos",
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        language: "en-US",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        query: term,
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        language: "ko-KR",
      },
    }),
};

export const tvApi = {
  on_the_air: () =>
    api.get("tv/on_the_air", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        language: "ko-KR",
      },
    }),
  popular: () =>
    api.get("tv/popular", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        language: "ko-KR",
      },
    }),
  top_rated: () =>
    api.get("tv/top_rated", {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        language: "ko-KR",
      },
    }),
  tvDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        language: "ko-KR",
      },
    }),
  tvDetailVideo: (id) =>
    api.get(`tv/${id}/videos`, {
      params: {
        append_to_response: "videos",
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        language: "en-US",
      },
    }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: term,
        api_key: "c8217c197351c46c3ee280e4e9a2e542",
        language: "en-US",
      },
    }),
};
