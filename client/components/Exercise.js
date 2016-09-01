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
    const type = this.refs.type.value;
    const quantity = this.refs.quantity.value;
    const calories = this.refs.calories.value;
    const duration = this.refs.duration.value;
    axios.put('http://localhost:9001/api/exercises', { type, quantity, calories, duration }, { headers: { authorization: this.state.authorization } })
    .then(() => {
      this.refresh();
    });
  }

  grab(e) {
    const id = e.target.attributes.getNamedItem('data-tag').value;
    axios.get(`http://localhost:9001/api/exercises/${id}`,
        { headers: { authorization: this.state.authorization } })
    .then(res => {
      console.log(res.data);
      this.setState({ selected: res.data });
    });
  }

  render() {
    let type = '';
    let quantity = '';
    let calories = '';
    let duration = '';
    if (this.state.selected) {
      type = this.state.selected.type;
      quantity = this.state.selected.quantity;
      calories = this.state.selected.calories;
      duration = this.state.selected.duration;
    }

    return (
      <div>

        <h1>Exercise</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="type">Exercise Type</label>
                <select className="form-control" ref="type" value={type}>
                  <option value=""> Select </option>
                  <option value="BIKE"> BIKE </option>
                  <option value="LIFT"> LIFT </option>
                  <option value="RUN"> RUN </option>
                  <option value="SWIM"> SWIM </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input ref="quantity" type="text" className="form-control" id="quantity" value={quantity} />
              </div>

              <div className="form-group">
                <label htmlFor="calories">Calories</label>
                <input ref="calories" type="text" className="form-control" id="calories" value={calories} />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input ref="duration" type="text" className="form-control" id="duration" value={duration} />
              </div>

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
                    <td><a onClick={this.grab} data-tag={ex.id}><i data-tag={ex.id} className="fa fa-pencil-square-o" /></a>
                    </td>
                    <td><a onClick={this.delete} data-tag={ex.id}><i className="fa fa-key fa-trash" /></a>
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
