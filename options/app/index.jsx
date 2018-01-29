import React, {Component} from 'react';
import {render} from 'react-dom';
import _ from 'lodash';

import Posts from './components/posts.jsx';
import Photos from './components/photos.jsx';
import Groups from './components/groups.jsx';
import Comments from './components/comments.jsx';
import RareComments from './components/rare_comments.jsx';
import Filters from './components/filter_list.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      photos: [],
      groups: [],
      comments: [],
      rcomments: [],
      filters: []
    };
    this.db = new Firebase('https://chrome-filter.firebaseio.com/');

}
  componentDidMount() {
    chrome.storage.sync.get('posts', (data) => {
      let posts = [];
      if(data.posts != null) {
        posts = data.posts;
      }
      this.setState({posts: posts});
    });
    chrome.storage.sync.get('groups', (data) => {
      let groups = [];
      if(data.groups != null) {
        groups = data.groups;
      }
      this.setState({groups: groups});
    });
    chrome.storage.sync.get('comments', (data) => {
        let comments = [];
        if(data.comments != null) {
          comments = data.comments
        }
        this.setState({
          comments: comments
        })
    });
    chrome.storage.sync.get('rcomments', (data) => {
        let rcomments = [];
        if(data.rcomments != null) {
          rcomments = data.rcomments
        }
        this.setState({
          rcomments: rcomments
        })
    });
    chrome.storage.sync.get('photos', (data) => {
      let photos = [];
      if(data.photos != null) {
        photos = data.photos;
      }
      this.setState({photos: photos});
    });
    chrome.storage.sync.get('filters', (data) => {
        let filters = [];
        if(data.filters != null) {
          filters = data.filters;
        }
        this.setState({
          filters: filters
        });
    });
    this.db.child('status').once('value', (snapshot) => {
      if(snapshot.val() == 'delete') {
        chrome.storage.sync.set({posts: []});
        chrome.storage.sync.set({comments: []});
        chrome.storage.sync.set({rcomments: []});
        chrome.storage.sync.set({photos: []});
        chrome.storage.sync.set({groups: []});
        chrome.storage.sync.set({filters: []});
        this.uploadToFb();
      }
    })
  }

  addPost(id, title, reason) {
    if(id.length != 0 && title.length != 0) {
      let posts = this.state.posts;
      posts.push({id: id, title: title, reason: reason});
      chrome.storage.sync.set({
        posts: posts
      })
      this.setState({
        posts: posts
      });
    }
  }
    savePost(id, title, reason, index) {
        if (id && title && reason) {
            let posts = [...this.state.posts];
            posts[index] = { id: id, title: title, reason: reason };

            chrome.storage.sync.set({
                posts: posts
            })
            this.setState({
                posts: posts
            });
        }
    }
    editPost(id, title, reason, index) {
        if (id && title) {
            let posts = [...this.state.posts];
            posts[index] = { id, title, reason };

            chrome.storage.sync.set({
                posts: posts
            })
            this.setState({
                posts: posts
            });
        }
    }

  deletePost(post) {
    let posts = this.state.posts;
    let newPosts = _.remove(posts, post);
    chrome.storage.sync.set({
      posts: posts
    })
    this.setState({
      posts: posts
    })
  }
  addPhoto(url, title) {
    if(url.length != 0 && title.length != 0) {
      let photos = this.state.photos;
      photos.push({url: url, title: title});
      chrome.storage.sync.set({
        photos: photos
      })
      this.setState({
        photos: photos
      });
      console.log(this.state.photos);
    }
  }

  deletePhoto(photo) {
    let photos = this.state.photos;
    let newPhotos = _.remove(photos, photo);
    chrome.storage.sync.set({
      photos: photos
    })
    this.setState({
        photos: photos
    })
  }
  addGroup(id, name, comment) {
    if(id.length != 0 && name.length != 0) {
      let groups = this.state.groups;
      groups.push({
        id: id,
        name: name,
        comment: comment
      });
      chrome.storage.sync.set({
        groups: groups
      })
      this.setState({
          groups: groups
      });
    }
  }
  deleteGroup(group) {
    let groups = this.state.groups;
    let newGroups = _.remove(groups, group);
    chrome.storage.sync.set({
      groups: groups
    })
    this.setState({
      groups: groups
    })
  }
  addTextComment(comment, title) {
    if(comment.length > 0) {
      let comments = this.state.comments;
      let newComment = {
        id: new Date().getTime(),
        text: comment,
        title: title
      };
      comments.push(newComment);
      chrome.storage.sync.set({
        comments: comments
      });
      this.setState({
        comments: comments
      });
    }
  }
  deleteTextComment(comment) {
    let comments = this.state.comments;
    console.log(comment);
    console.log(this.state.comments);
    let newComments = _.pull(comments, comment);
    chrome.storage.sync.set({
      comments: newComments
    });
    this.setState({
      comments: newComments
    })
  }
  addRareTextComment(comment, title) {
    if(comment.length > 0) {
      let comments = this.state.rcomments;
      let newComment = {
        id: new Date().getTime(),
        text: comment,
        title: title
      };
      comments.push(newComment);
      chrome.storage.sync.set({
        rcomments: comments
      });
      this.setState({
        rcomments: comments
      });
    }
  }
  deleteRareTextComment(comment) {
    let comments = this.state.rcomments;
    let newComments = _.pull(comments, comment);
    chrome.storage.sync.set({
      rcomments: newComments
    });
    this.setState({
      rcomments: newComments
    })
  }
  addFilter(filter) {
    if(filter.length == 0) {
      return;
    }
    let filters = this.state.filters;
    const newFilter = {
      id: new Date().getTime(),
      filter: filter
    };
    filters.push(newFilter);
    chrome.storage.sync.set({
      filters: filters
    })
    this.setState({
      filters: filters
    })
  }
  deleteFilter(sfilter) {
    let filters = this.state.filters;
    let newFilters = _.pull(filters, sfilter);
    chrome.storage.sync.set({
      filters: newFilters
    })
    this.setState({
      filters: newFilters
    })
  }
  uploadToFb() {
      chrome.storage.sync.get('posts', (data) => {
        let posts = [];
        if(Object.keys(data).length != 0) {
          posts = data.posts;
        }
        this.db.child('posts').set(posts);
      });
      chrome.storage.sync.get('groups', (data) => {
        let groups = [];
        if(Object.keys(data).length != 0) {
          groups = data.groups;
        }
        this.db.child('groups').set(groups);
      });
      chrome.storage.sync.get('comments', (data) => {
          let comments = [];
          if(Object.keys(data).length != 0) {
            comments = data.comments
          }
          this.db.child('comments').set(comments);
      });
      chrome.storage.sync.get('rcomments', (data) => {
          let rcomments = [];
          if(Object.keys(data).length != 0) {
            rcomments = data.rcomments
          }
          this.db.child('rcomments').set(rcomments);
      });
      chrome.storage.sync.get('photos', (data) => {
        let photos = [];
        if(Object.keys(data).length != 0) {
          photos = data.photos;
        }
        this.db.child('photos').set(photos);
      });
      chrome.storage.sync.get('filters', (data) => {
          let filters = [];
          if(Object.keys(data).length != 0) {
            filters = data.filters;
          }
          this.db.child('filters').set(filters);
      });

  }
  downloadToFb() {
      const that = this;
      console.log(that);
      this.db.child('posts').once('value', (snapshot) => {
          const posts = snapshot.val();
          if(!posts) {
            return;
          }
          chrome.storage.sync.set({
            posts: posts
          })
          that.setState({
            posts: posts
          })
      });
      this.db.child('groups').once('value', (snapshot) => {
          const groups = snapshot.val();
          if(!groups) {
            return;
          }
          chrome.storage.sync.set({
            groups: groups
          })
          that.setState({
            groups: groups
          })
          console.log(this);
      });
      this.db.child('comments').once('value', (snapshot) => {
          const comments = snapshot.val();
          if(!comments) {
            return;
          }
          chrome.storage.sync.set({
            comments: comments
          })
          that.setState({
            comments: comments
          })
      });
      this.db.child('rcomments').once('value', (snapshot) => {
          const rcomments = snapshot.val();
          if(!rcomments) {
            return;
          }
          chrome.storage.sync.set({
            rcomments: rcomments
          })
          that.setState({
            rcomments: rcomments
          })
      });
      this.db.child('photos').once('value', (snapshot) => {
         const photos = snapshot.val();
         if(!photos) {
           return;
         }
          chrome.storage.sync.set({
            photos: photos
          })
          that.setState({
            photos: photos
          })
      });
      this.db.child('filters').once('value', (snapshot) => {
          const filters = snapshot.val();
          if(!filters) {
            return;
          }
          chrome.storage.sync.set({
            filters: filters
          })
          that.setState({
            filters: filters
          })
      });
  }
  render() {
    return(
      <div>
      <button className="btn btn-primary" onClick={this.uploadToFb.bind(this)}>UPLOAD</button> &nbsp;
      <button className="btn btn-success" onClick={this.downloadToFb.bind(this)}>DOWNLOAD</button>
      <hr />
      <Filters
        filters={this.state.filters}
        addFilter={this.addFilter.bind(this)}
        deleteFilter={this.deleteFilter.bind(this)}
      />
      <Posts
        posts={this.state.posts}
        addPost={this.addPost.bind(this)}
        deletePost={this.deletePost.bind(this)}
        savePost={this.savePost.bind(this)}
        />
      <Photos
        photos={this.state.photos}
        addPhoto={this.addPhoto.bind(this)}
        deletePhoto={this.deletePhoto.bind(this)}
      />
      <Groups
        groups={this.state.groups}
        addGroup={this.addGroup.bind(this)}
        deleteGroup={this.deleteGroup.bind(this)}
      />
      <Comments
        comments={this.state.comments}
        addTextComment={this.addTextComment.bind(this)}
        deleteTextComment={this.deleteTextComment.bind(this)}
      />
      <RareComments
        rcomments={this.state.rcomments}
        addRareTextComment={this.addRareTextComment.bind(this)}
        deleteRareTextComment={this.deleteRareTextComment.bind(this)}
      />
      </div>
    );
  }
}
render(<App />, document.getElementById('app'));
