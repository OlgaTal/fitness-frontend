/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp, no-debugger, no-restricted-syntax, react/jsx-indent */
/* global localStorage */

import React from 'react';
import axios from 'axios';

export default class Exercise extends React.Component {
  constructor(props) {
    super(props);
    const authorization = localStorage.getItem('token');
    this.state = { authorization, exercises: [] };
    this.refresh = this.refresh.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.grab = this.grab.bind(this);
    this.clear = this.clear.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    axios.get('http://localhost:9001/api/exercises', { headers: { authorization: this.state.authorization } })
    .then(res => {
      this.setState({ exercises: res.data });
    });
  }

  create(e) {
    e.preventDefault();
    const type = this.refs.type.value;
    const quantity = this.refs.quantity.value;
    const calories = this.refs.calories.value;
    const duration = this.refs.duration.value;
    axios.post('http://localhost:9001/api/exercises', { type, quantity, calories, duration }, { headers: { authorization: this.state.authorization } })
    .then(() => {
      this.refresh();
    });
  }

  update(e) {
    e.preventDefault();
    const id = this.refs.id.value;
    const type = this.refs.type.value;
    const quantity = this.refs.quantity.value;
    const calories = this.refs.calories.value;
    const duration = this.refs.duration.value;
    if (id) {
      axios.put('http://localhost:9001/api/exercises', { id, type, quantity, calories, duration }, { headers: { authorization: this.state.authorization } })
      .then(() => {
        this.refresh();
      });
    }
  }

  clear(e) {
    e.preventDefault();
    this.refs.id.value = '';
    this.refs.type.value = '';
    this.refs.quantity.value = '';
    this.refs.calories.value = '';
    this.refs.duration.value = '';
  }

  grab(e) {
    const id = e.target.attributes.getNamedItem('data-id').value;
    axios.get(`http://localhost:9001/api/exercises/${id}`,
        { headers: { authorization: this.state.authorization } })
    .then(res => {
      this.refs.id.value = res.data.id;
      this.refs.type.value = res.data.type;
      this.refs.quantity.value = res.data.quantity;
      this.refs.calories.value = res.data.calories;
      this.refs.duration.value = res.data.duration;
    });
  }

  delete(e) {
    const id = e.target.attributes.getNamedItem('data-id').value;
    axios.delete(`http://localhost:9001/api/exercises/${id}`,
        { headers: { authorization: this.state.authorization } })
    .then(() => {
      this.refresh();
    });
  }

  render() {
    return (
      <div>

        <h1>Exercise</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <input ref="id" type="hidden" id="id" />
              <div className="form-group">
                <label htmlFor="type">Exercise Type</label>
                <select className="form-control" ref="type">
                  <option value=""> Select </option>
                  <option value="BIKE"> BIKE </option>
                  <option value="LIFT"> LIFT </option>
                  <option value="RUN"> RUN </option>
                  <option value="SWIM"> SWIM </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input ref="quantity" type="text" className="form-control" id="quantity" />
              </div>

              <div className="form-group">
                <label htmlFor="calories">Calories</label>
                <input ref="calories" type="text" className="form-control" id="calories" />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input ref="duration" type="text" className="form-control" id="duration" />
              </div>

              <button onClick={this.clear} type="submit" className="btn btn-default">Clear</button>
              <button onClick={this.update} type="submit" className="btn btn-default">Update</button>
              <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
          <div className="col-xs-9">

            <table className="table table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Exercise Type</th>
                  <th>Quantity</th>
                  <th>Calories</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {this.state.exercises.map(ex =>
                  <tr key={ex.id}>
                    <td><a onClick={this.grab}><i data-id={ex.id} className="fa fa-pencil-square-o" /></a>
                    </td>
                    <td><a onClick={this.delete}><i data-id={ex.id} className="fa fa-key fa-trash" /></a>
                    </td>
                    <td>{ex.type}</td>
                    <td>{ex.quantity}</td>
                    <td>{ex.calories}</td>
                    <td>{ex.duration}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  }
}
