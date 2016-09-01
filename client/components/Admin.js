/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp, jsx-a11y/href-no-hash, react/prefer-stateless-function */
/* global localStorage, window */

import React from 'react';
import axios from 'axios';

export default class Admin extends React.Component {

  constructor(props) {
    super(props);
    const authorization = localStorage.getItem('token');
    this.state = { authorization };
    this.deleteUser = this.deleteUser.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    axios.get('http://localhost:9001/api/users', { headers: { authorization: this.state.authorization } })
    .then((response) => {
      this.setState({ userList: response.data.content });
    });
  }

  deleteUser(e) {
    e.preventDefault();
    const userToDelete = this.refs.userToDelete.value;

    axios.delete(`http://localhost:9001/api/users/${userToDelete}/delete`, { headers: { authorization: this.state.authorization } })
    .then(() => {
      this.refs.userToDelete.value = '';
      this.refresh();
    });
  }


  render() {
    let tableBody = '';

    if (this.state.userList) {
      tableBody = this.state.userList.map((user) => {
        return (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td><img className="userThumb" alt="user" src={user.profile ? user.profile.photo : 'DELETE ME!'} /></td>
          </tr>);
      });
    }

    return (
      <div>
        <h1>Admin</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="userToDelete">User To Delete</label>
                <input ref="userToDelete" type="text" className="form-control" id="userToDelete" />
              </div>
              <button onClick={this.deleteUser} type="submit" className="btn btn-default">Delete User</button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Users</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
              {tableBody}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
