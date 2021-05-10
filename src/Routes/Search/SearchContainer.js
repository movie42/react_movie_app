import { movieApi, tvApi } from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    movieSearch: null,
    tvSearch: null,
    searchTerm: "",
    error: null,
    loading: false,
  };

  handleSubmit = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    try {
      const {
        data: { results: movieSearch },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvSearch },
      } = await tvApi.search(searchTerm);
      this.setState({
        movieSearch,
        tvSearch,
      });

      this.setState({
        loading: true,
      });
    } catch {
      this.setState({ error: "검색 결과를 찾을 수 없습니다." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { movieSearch, tvSearch, searchTerm, error, loading } = this.state;
    return (
      <SearchPresenter
        movieSearch={movieSearch}
        tvSearch={tvSearch}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
