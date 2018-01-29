import React, {Component} from 'react';


export default class Comments extends Component {
  constructor(props) {
    super(props);
  }
  addComment() {
    let comment = this.refs.comment.value;
    let title = this.refs.title.value;
    this.props.addTextComment(comment, title);
    this.refs.comment.value = '';
    this.refs.title.value = '';
  }
  render() {
    return(
      <div className="panel">
        <div className="panel-header">
          <hr className="divider" />
          <h1>Text Comments</h1>
          <hr className="divider" />
        </div>
        <div id="new-post">
          <h3>Add New Text Comment</h3>
          <div className="form-inline">
              <div className="form-group">
                <label for="comment">Comment</label>
                &nbsp;
                <textarea cols="30" rows="4"
                  ref="comment"
                  className="form-control"
                  name="comment"
                  id="comment"
                  placeholder="Text Comment" ></textarea>
                &nbsp;
                &nbsp;
              </div>

              <div className="form-group">
                <label for="group-name">Title</label>
                &nbsp;
                <input
                  ref="title"
                  className="form-control"
                  name="title"
                  id="title"
                  placeholder="Add title so that you can choose comment easily." />
                &nbsp;
                &nbsp;
              </div>
              <input
                onClick={this.addComment.bind(this)}
                type="submit"
                className="btn btn-primary" />
          </div>
        </div>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>COMMENT</th>
              <th>TITLE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.comments.map((comment) => {
                return (
                    <tr key={comment.id}>
                      <td>{comment.text}</td>
                      <td>{comment.title}</td>
                      <td>
                        <button className="btn btn-danger" onClick={this.props.deleteTextComment.bind(this, comment)}>Delete</button>
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
