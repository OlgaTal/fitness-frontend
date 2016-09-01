/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp */
/* global localStorage */

import React from 'react';
import axios from 'axios';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    const authorization = localStorage.getItem('token');
    this.state = { authorization, profile: {} };
    this.refresh = this.refresh.bind(this);
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    axios.get('http://localhost:9001/api/profiles', { headers: { authorization: this.state.authorization } })
    .then(res => {
      this.setState({ profile: res.data });
    });
  }

  create(e) {
    e.preventDefault();
    const gender = this.refs.gender.value;
    const age = this.refs.age.value;
    const height = this.refs.height.value;
    const weight = this.refs.weight.value;
    const photo = this.refs.photo.value;
    axios.post('http://localhost:9001/api/profiles', { gender, age, height, weight, photo }, { headers: { authorization: this.state.authorization } })
    .then(() => {
      this.refresh();
    });
  }

  render() {
    return (
      <div>

        <h1>Profile</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input ref="gender" type="text" className="form-control" id="gender" />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input ref="age" type="text" className="form-control" id="age" />
              </div>

              <div className="form-group">
                <label htmlFor="height">Height</label>
                <input ref="height" type="text" className="form-control" id="height" />
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <input ref="weight" type="text" className="form-control" id="weight" />
              </div>

              <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <input ref="photo" type="text" className="form-control" id="photo" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
          <div className="col-xs-9">

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Height</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.profile.gender}</td>
                  <td>{this.state.profile.age}</td>
                  <td>{this.state.profile.height}</td>
                  <td>{this.state.profile.weight}</td>
                </tr>
              </tbody>
            </table>
            <div><img className="thumbnail" alt="profile" src={this.state.profile.photo} /></div>

          </div>
        </div>

      </div>
    );
  }
}
