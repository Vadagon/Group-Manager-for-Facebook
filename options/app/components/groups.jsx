import React, {Component} from 'react';


class Groups extends Component {
  constructor(props) {
    super(props);
  }
  addGroup() {
    let name = this.refs.name.value;
    let id = this.refs.id.value;
    let comment = this.refs.comment.value;
    this.props.addGroup(id, name, comment);
    this.refs.name.value = '';
    this.refs.id.value = '';
    this.refs.comment.value = '';
  }
  render() {
    return(
      <div className="panel">
        <div className="panel-header">
          <hr className="divider" />
          <h1>GROUPS</h1> <span> Selected group will be tagged in comment</span>
          <hr className="divider" />
        </div>
        <div id="new-post">
          <h3>Add New Group</h3>
          <div className="form-inline">
              <div className="form-group">
                <label for="group-id">Group ID</label>
                &nbsp;
                <input
                  ref="id"
                  className="form-control"
                  name="group-id"
                  id="group-id"
                  placeholder="Group ID" />
                &nbsp;
                &nbsp;
              </div>

              <div className="form-group">
                <label for="group-name">Group Name</label>
                &nbsp;
                <input
                  ref="name"
                  className="form-control"
                  name="group-name"
                  id="group-name"
                  placeholder="Group Name" />
                &nbsp;
                &nbsp;
              </div>
              <div className="form-group">
                <label for="group-comment">Default Comment</label>
                &nbsp;
                <input
                  ref="comment"
                  className="form-control"
                  name="group-comment"
                  id="group-comment"
                  placeholder="Default Comment" />
                &nbsp;
                &nbsp;
              </div>
              <input
                onClick={this.addGroup.bind(this)}
                type="submit"
                className="btn btn-primary" />
          </div>
        </div>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>GROUP ID</th>
              <th>GROUP NAME</th>
              <th>DEFAULT COMMENT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.groups.map((group) => {
                return (
                    <tr key={group.id}>
                      <td>{group.id}</td>
                      <td>{group.name}</td>
                      <td>{group.comment}</td>
                      <td>
                        <button className="btn btn-danger" onClick={this.props.deleteGroup.bind(this, group)}>Delete</button>
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

export default Groups;
