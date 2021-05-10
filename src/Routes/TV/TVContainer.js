import { tvApi } from "api";
import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
  state = {
    on_the_air: null,
    popular: null,
    top_rated: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: onTheAir },
      } = await tvApi.on_the_air();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: topRated },
      } = await tvApi.top_rated();
      this.setState({
        onTheAir,
        popular,
        topRated,
      });
    } catch {
      this.setState({
        loading: false,
        error: "티비 프로그램 정보를 찾을 수 없습니다.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { onTheAir, popular, topRated, error, loading } = this.state;
    return (
      <TVPresenter
        on_the_air={onTheAir}
        popular={popular}
        top_rated={topRated}
        error={error}
        loading={loading}
      />
    );
  }
}
