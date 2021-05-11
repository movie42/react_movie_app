import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TVPresenter = ({
  movieSearch,
  tvSearch,
  error,
  loading,
  searchTerm,
  handleSubmit,
}) => null;

TVPresenter.propTypes = {
  movieSearch: PropTypes.array,
  tvSearch: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

export default TVPresenter;
