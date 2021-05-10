import React from "react";
import HomePresenter from "./HomePresenter";
import { movieApi } from "api";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    popular: null,
    upComing: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: popular },
      } = await movieApi.popular();
      const {
        data: { results: upComing },
      } = await movieApi.upComing();
      this.setState({ nowPlaying, popular, upComing });
    } catch {
      this.setState({
        error: "영화 정보를 찾을 수가 없습니다.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { nowPlaying, popular, upComing, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        popular={popular}
        upComing={upComing}
        error={error}
        loading={loading}
      />
    );
  }
}
