/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp */
/* global localStorage */

import React from 'react';
import { browserHistory } from 'react-router';

export default class Register extends React.Component {
  componentDidMount() {
    localStorage.clear();
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
