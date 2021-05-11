import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TVPresenter = ({ onTheAir, popular, topRated, error, loading }) => null;

TVPresenter.propTypes = {
  onTheAir: PropTypes.array,
  popular: PropTypes.array,
  topRated: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TVPresenter;
