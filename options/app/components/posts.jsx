import React, {Component} from 'react';

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editblePosts: null,
        };
    }
    addPost() {
        let title = this.refs.title.value;
        let id = this.refs.id.value;
        let reason = this.refs.reason.value;

        this.props.addPost(id, title, reason);
        this.refs.title.value = '';
        this.refs.id.value = '';
    }
    editPost(index) {
        this.setState({
            editblePosts: index
        })
    }
    savePost(index) {
        let title = this.refs.e_title.value;
        let id = this.refs.e_id.value;
        let reason = this.refs.e_reason.value;

        this.props.savePost(id, title, reason, index);
        this.state.editblePosts = null;

    }
    textPost(post, postIndex) {
      return (
          <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.reason}</td>
              <td>
                  <button className="btn btn-primary" onClick={this.editPost.bind(this, postIndex)}>Edit</button>
                  <button className="btn btn-danger" onClick={this.props.deletePost.bind(this, post)}>Delete</button>
              </td>
          </tr>
      );
    }
    editblePost(postIndex) {
        return (
            <tr>
                <td><input ref='e_id' /></td>
                <td><input ref='e_title' /></td>
                <td><input ref='e_reason' /></td>
                <td>
                    <button className="btn btn-danger" onClick={this.savePost.bind(this, postIndex)}>Save</button>
                </td>
            </tr>
        );
    }

    render() {
        return(
            <div className="panel">
                <div className="panel-header">
                    <hr className="divider" />
                    <h1>POSTS</h1> <span> User will be tagged one fo the selected post after deleting their post</span>
                    <hr className="divider" />
                </div>
                <div id="new-post">
                    <h3>Add New Post</h3>
                    <div className="form-inline">
                        <div className="form-group">
                            <label for="post-id">Post ID</label>
                            &nbsp;
                            <input
                                ref="id"
                                className="form-control"
                                name="post-id"
                                id="post-id"
                                placeholder="Post ID"/>
                            &nbsp;
                            &nbsp;
                        </div>
                        <div className="form-group">
                            <label for="post-title">Post Title</label>
                            &nbsp;
                            <input
                                ref="title"
                                className="form-control"
                                name="post-title"
                                id="post-title"
                                placeholder="Post Title" />
                            &nbsp;
                            &nbsp;
                        </div>
                        <div className="form-group">
                            <label for="post-reason">Tag Reason</label>
                            &nbsp;
                            <input
                                ref="reason"
                                className="form-control"
                                name="post-reason"
                                id="post-reason"
                                placeholder="Post Deletation Reason" />
                            &nbsp;
                            &nbsp;
                        </div>
                        <input
                            onClick={this.addPost.bind(this)}
                            type="submit"
                            className="btn btn-primary" />
                    </div>
                </div>
                <table className="table table-responsive">
                    <thead>
                    <tr>
                        <th>POST ID</th>
                        <th>POST TITLE</th>
                        <th>TAG REASON</th>
                        <th>ACTIONS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.posts.map((post, postIndex) => {
                            return this.state.editblePosts === postIndex ? this.editblePost(postIndex) : this.textPost(post, postIndex);
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Posts;
