import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TVPresenter = ({ topRate, airingToday, popular, error, loading }) => null;

TVPresenter.propTyeps = {
  topRate: PropTypes.array,
  airingToday: PropTypes.array,
  popular: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TVPresenter;
