/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp */
/* global localStorage */

import React from 'react';
import axios from 'axios';

export default class Device extends React.Component {
  constructor(props) {
    super(props);
    const authorization = localStorage.getItem('token');
    this.state = { authorization, devices: [] };
    this.refresh = this.refresh.bind(this);
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    axios.get('http://localhost:9001/api/devices', { headers: { authorization: this.state.authorization } })
    .then(res => {
      this.setState({ devices: res.data });
    });
  }

  create(e) {
    e.preventDefault();
    const serialNumber = this.refs.serialNumber.value;
    const product = this.refs.product.value;
    const category = this.refs.category.value;
    axios.post('http://localhost:9001/api/devices', { serialNumber, product, category },
                { headers: { authorization: this.state.authorization } })
    .then(() => {
      this.refresh();
    });
  }

  render() {
    return (
      <div>

        <h1>Device</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="serialNumber">SerialNumber</label>
                <input ref="serialNumber" type="text" className="form-control" id="serialNumber" />
              </div>

              <div className="form-group">
                <label htmlFor="product">Product</label>
                <input ref="product" type="text" className="form-control" id="product" />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input ref="category" type="text" className="form-control" id="category" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
          <div className="col-xs-9">

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>SerialNumber</th>
                  <th>Product</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {this.state.devices.map(d =>
                  <tr key={d.id}>
                    <td>{d.serialNumber}</td>
                    <td>{d.product}</td>
                    <td>{d.category}</td>
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
