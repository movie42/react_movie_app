import { movieApi, tvApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      video: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = +id;
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let video = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
        ({ data: video } = await movieApi.movieDetailVideo(parsedId));
      } else {
        ({ data: result } = await tvApi.tvDetail(parsedId));
        ({ data: video } = await tvApi.tvDetailVideo(parsedId));
      }
      this.setState({ result, video });
    } catch {
      this.setState({ error: "영화 정보를 불러올 수 없습니다." });
    } finally {
      this.setState({ loading: false, result, isMovie });
    }
  }

  render() {
    const { result, video, error, loading, isMovie } = this.state;
    return (
      <DetailPresenter
        result={result}
        video={video}
        error={error}
        loading={loading}
        isMovie={isMovie}
      />
    );
  }
}
