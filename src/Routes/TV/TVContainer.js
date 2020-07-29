import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

export default class extends React.Component {
  state = {
    topRate: null,
    popular: null,
    airingToday: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    const {
      data: { results: topRated },
    } = await tvApi.topRated();
    try {
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      this.setState({ topRated, popular, airingToday });
    } catch {
      this.setState({
        error: "Can't find tv information.",
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { topRate, popular, airingToday, error, loading } = this.state;
    return (
      <TVPresenter
        topRate={topRate}
        airingToday={airingToday}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
