/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp */

import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
  }

  create(e) {
    e.preventDefault();
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    axios.post('http://localhost:9001/api/users', { username, password })
    .then(() => {
      browserHistory.push('/login');
    })
    .catch(() => {
      // notify user registration failed
    });
  }

  render() {
    return (
      <div>

        <h1>Register</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input ref="username" type="text" className="form-control" id="username" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input ref="password" type="password" className="form-control" id="password" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
          <div className="col-xs-9">
          </div>
        </div>

      </div>
    );
  }
}
