import React, {Component} from 'react';


class Photos extends Component {
  constructor(props) {
    super(props);
  }
  addPhoto() {
      let photo_id = this.refs.photo_id.value;
      let photo_title = this.refs.photo_title.value;
      this.props.addPhoto(photo_id, photo_title);
      this.refs.photo_id.value = '';
      this.refs.photo_title.value = '';
  }
  render() {
    return(
      <div className="panel">
        <div className="panel-header">
          <hr className="divider" />
          <h1>PHOTOS</h1>
          <hr className="divider" />
        </div>
        <div id="new-photo">
          <h3>Add New Photo</h3>
          <div className="form-inline">
              <div className="form-group">
                <label for="post-id">Photo URL</label>
                &nbsp;
                <input
                  ref="photo_id"
                  className="form-control"
                  name="photo-id"
                  id="photo-id"
                  placeholder="Photo URL" />
                &nbsp;
                &nbsp;
              </div>
              <div className="form-group">
                <label for="photo-title">Photo Title</label>
                &nbsp;
                <input
                  ref="photo_title"
                  className="form-control"
                  name="photo-title"
                  id="photo-title"
                  placeholder="Photo Title" />
                &nbsp;
                &nbsp;
              </div>
              <input
                onClick={this.addPhoto.bind(this)}
                type="submit"
                className="btn btn-primary" />
          </div>
        </div>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>PHOTO TITLE</th>
              <th>PHOTO</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.photos.map((photo) => {
                return (
                    <tr key={photo.url}>
                      <td>{photo.title}</td>
                      <td><img src={photo.url} /></td>
                      <td>
                        <button className="btn btn-danger" onClick={this.props.deletePhoto.bind(this, photo)}>Delete</button>
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

export default Photos;
