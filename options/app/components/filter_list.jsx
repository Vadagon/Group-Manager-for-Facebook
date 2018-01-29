import React, {Component} from 'react';


export default class Filters extends Component {
  constructor(props) {
    super(props);
  }
  addFilter() {
    let filter = this.refs.filter.value;
    this.props.addFilter(filter);
    this.refs.filter.value = '';
  }
  render() {
    return(
      <div className="panel">
        <div className="panel-header">
          <hr className="divider" />
          <h1>FILTER LISTS</h1>
          <hr className="divider" />
        </div>
        <div id="new-post">
          <h3>Add New Filter</h3>
          <div className="form-inline">
              <div className="form-group">
                <label for="post-id">Comma (,) Separated Words</label>
                &nbsp;
                <textarea rows="5" cols="40"
                  ref="filter"
                  className="form-control"
                  name="post-id"
                  id="post-id"
                  placeholder="Post ID"></textarea>
                &nbsp;
                &nbsp;
              </div>
              <input
                onClick={this.addFilter.bind(this)}
                type="submit"
                className="btn btn-primary" />
          </div>
        </div>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>FILTER</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.filters.map((filter) => {
                return (
                    <tr key={filter.id}>
                      <td>{filter.filter}</td>
                      <td>
                        <button className="btn btn-danger" onClick={this.props.deleteFilter.bind(this,filter)}>Delete</button>
                      </td>
                    </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
