/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp, jsx-a11y/href-no-hash */
/* global localStorage, window */

import React from 'react';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    const authorization = localStorage.getItem('token');
    this.state = { authorization };
    this.refresh = this.refresh.bind(this);
  }

  componentDidUpdate() {
    this.refresh();
  }

  refresh() {
    const auth = localStorage.getItem('token');
    if (this.state.authorization !== auth) {
      this.setState({ authorization: auth });
    }
  }

  render() {
    let registerButton = (<li><Link to="/register"><i className="fa fa-user fa-fw" /> Register</Link></li>);
    let loginButton = (<li><Link to="/login"><i className="fa fa-key fa-lock" /> Login</Link></li>);
    let profileButton = '';
    let deviceButton = '';
    let logoutButton = '';
    let exerciseButton = '';
    let displayedUserName = '';
    let admin = '';

    if (this.state.authorization) {
      profileButton = (<li><Link to="/profile"><i className="fa fa-key fa-heartbeat" /> Profile</Link></li>);
      deviceButton = (<li><Link to="/device"><i className="fa fa-key fa-heartbeat" /> Device</Link></li>);
      logoutButton = (<li><Link to="/logout"><i className="fa fa-key fa-unlock" /> Logout</Link></li>);
      registerButton = '';
      loginButton = '';
      exerciseButton = (<li><Link to="/exercise"><i className="fa fa-star" /> Exercise</Link></li>);
      displayedUserName = (<li>Logged In As: {jwtDecode(this.state.authorization).sub}</li>);
      const adminRoles = jwtDecode(this.state.authorization).roles.filter((r) => r.role === 'ADMIN');
      if (adminRoles.length > 0) {
        admin = (<li><Link to="/Admin"><i className="fa fa-question-circle-o fa-fw" /> Admin</Link></li>);
      }
    }

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="#">Fitness</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav" />
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/"><i className="fa fa-home fa-fw" /> Home</Link></li>
              <li><Link to="/about"><i className="fa fa-hashtag fa-fw" /> About</Link></li>
              <li><Link to="/faq"><i className="fa fa-question-circle-o fa-fw" /> Faq</Link></li>
              {registerButton}
              {loginButton}
              {profileButton}
              {exerciseButton}
              {deviceButton}
              {admin}
              {logoutButton}
              {displayedUserName}
            </ul>
          </div>
        </div>
      </nav>
      );
  }

}
