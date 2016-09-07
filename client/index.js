/* eslint-disable import/imports-first */
/* global document */

import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Faq from './components/Faq';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Exercise from './components/Exercise';
import Device from './components/Device';
import Admin from './components/Admin';


import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="faq" component={Faq} />
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="profile" component={Profile} />
      <Route path="exercise" component={Exercise} />
      <Route path="device" component={Device} />
      <Route path="admin" component={Admin} />
    </Route>
  </Router>
  , document.getElementById('root'));
