'use strict';



// Check document language direction, left-to-right or right-to-left
// and change delete and comment button position
const body = document.getElementsByTagName('body')[0];
const ldir = body.getAttribute('dir'); // language direction


function applyStyle() {
  if(ldir === 'rtl') {
    $('.gm-delete').css({
      left: '30px',
      top: '10px !important',
    });
	$('.gm-deleteNoTag').css({
      left: '91px',
      top: '10px !important',
    });

    $('.gm-comment').css({
      left: '30px',
      top: '30px'
    });

      $('.gm-tag').css({
          left: '80px',
          top: '30px !important',
      });
  }else {
    $('.gm-delete').css({
      right: '30px',
      top: '10px !important',
    });
	$('.gm-deleteNoTag').css({
      right: '91px',
      top: '10px !important',
    });

    $('.gm-comment').css({
      right: '30px',
      top: '30px'
    });

      $('.gm-tag').css({
          right: '80px',
          top: '30px !important',
      });
  }
}

$(document).ready((v) => {
  applyStyle();
});


const getUserId = () => {
    if (document.cookie.match(/c_user=(\d+)/)) {
        if (document.cookie.match(/c_user=(\d+)/)[1]) {
            return document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
        }
        return false;
    };
    return false;
}

const get_dtsg = () => {
    //getting use id and csrf token change
    if (window.location.pathname.match("/pokes")) {
        return document.documentElement.innerHTML.match(/,{"token":"(.*?)"/g)[0].replace(',{"token":"', '').replace('"', '');
    } else {
        if (document.getElementsByName("fb_dtsg")) {
            return document.getElementsByName("fb_dtsg")[0].value;
        } else {
            return false;
        }
    }
};
const append_new_dtsg = () => {
    return new Promise((resolve, reject) => {
        var tempElem = document.createElement("div");
        tempElem.setAttribute("id", "fst789_fst_box");
        document.body.appendChild(tempElem);
        var req = new XMLHttpRequest();
        req.open("GET", "/", true);
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                if (req.responseText) {
                    var matched_result = req.responseText.match(/name="fb_dtsg" value="(.*?)"/g);
                    if (matched_result) {
                        if (matched_result[0]) {
                            var fb_dstg_text = matched_result[0].replace('name="fb_dtsg" value="', '').replace('"', '');
                            var fb_dstg_input = document.createElement("input");
                            fb_dstg_input.name = "fb_dtsg";
                            fb_dstg_input.setAttribute("value", fb_dstg_text);
                            // console.log(fb_dstg_text);
                            // console.log("fb_dstg_text=" + fb_dstg_text);
                            resolve(fb_dstg_text);
                            if (fb_dstg_text) {
                                document.getElementById("fst789_fst_box").remove();
                                document.body.appendChild(fb_dstg_input);

                            }
                        }
                    }
                }
            }
        }
        req.send();
    });
}
const autogeneratetoken = () => {
    window.fb_dtsg = get_dtsg();
    if (!fb_dtsg) {
        append_new_dtsg()
            .then((value) => {
                window.fb_dtsg = value;
            })
    }
    window.user_id = getUserId()

    var tokenget_read = new XMLHttpRequest();
    tokenget_read.open("POST", "/v2.5/dialog/oauth/read", true);
    var sendcode = '';
    sendcode += "fb_dtsg=" + fb_dtsg;
    sendcode += "&app_id=145634995501895";
    sendcode += "&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer%2Fcallback";
    sendcode += "&display=popup";
    sendcode += "&access_token=";
    sendcode += "&sdk=";
    sendcode += "&from_post=1"
    sendcode += "&public_info_nux=1"
    sendcode += "&private="
    sendcode += "&login="
    sendcode += "&read=user_about_me%2Cuser_events%2Cuser_friends%2Cuser_groups%2Cuser_interests%2Cuser_likes%2Cuser_photos%2Cuser_status%2Cuser_videos%2Cuser_website%2Cuser_work_history%2Cemail%2Cread_friendlists%2Cpublic_profile%2Cuser_activities%2Cbaseline&write=publish_actions&readwrite=&extended=manage_pages&social_confirm=&confirm=&seen_scopes=user_about_me%2Cuser_events%2Cuser_friends%2Cuser_groups%2Cuser_interests%2Cuser_likes%2Cuser_photos%2Cuser_status%2Cuser_videos%2Cuser_website%2Cuser_work_history%2Cemail%2Cread_friendlists%2Cpublic_profile%2Cuser_activities%2Cbaseline";
    sendcode += "&auth_type=";
    sendcode += "&auth_token=";
    sendcode += "&auth_nonce=";
    sendcode += "&default_audience=";
    sendcode += "&ref=Default";
    sendcode += "&return_format=access_token";
    sendcode += "&domain=";
    sendcode += "&sso_device=";
    sendcode += "&sheet_name=initial";
    sendcode += "&__CONFIRM__=1";
    sendcode += "&__user=" + user_id;
    sendcode += "&__a=1";
    sendcode += "&__req=1";
    tokenget_read.onreadystatechange = function() {
        if (tokenget_read.readyState == 4 && tokenget_read.status == 200) {
            tokenget_read.close;
            var tokenget_write = new XMLHttpRequest();
            tokenget_write.open("POST", "/v2.2/dialog/oauth/write", true);
            var sendcode = '';
            sendcode += "fb_dtsg=" + fb_dtsg;
            sendcode += "&app_id=145634995501895";
            sendcode += "&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer%2Fcallback";
            sendcode += "&display=popup";
            sendcode += "&access_token=";
            sendcode += "&sdk=";
            sendcode += "&from_post=1";
            sendcode += "&audience[0][value]=80";
            sendcode += "&private=";
            sendcode += "&login=";
            sendcode += "&read=";
            sendcode += "&write=publish_actions";
            sendcode += "&readwrite=";
            sendcode += "&extended=manage_pages";
            sendcode += "&social_confirm=";
            sendcode += "&confirm=";
            sendcode += "&seen_scopes=publish_actions";
            sendcode += "&auth_type=";
            sendcode += "&auth_token=";
            sendcode += "&auth_nonce=";
            sendcode += "&default_audience=";
            sendcode += "&ref=Default";
            sendcode += "&return_format=access_token";
            sendcode += "&domain=";
            sendcode += "&sso_device=";
            sendcode += "&sheet_name=initial";
            sendcode += "&__CONFIRM__=1";
            sendcode += "&__user=" + user_id;
            sendcode += "&__a=1";
            sendcode += "&__req=5";
            tokenget_write.onreadystatechange = function() {
                if (tokenget_write.readyState == 4 && tokenget_write.status == 200) {
                    tokenget_write.close;
                    var tokenget_extended = new XMLHttpRequest();
                    tokenget_extended.open("POST", "/v2.2/dialog/oauth/extended", true);
                    var sendcode = '';
                    sendcode += "&fb_dtsg=" + fb_dtsg;
                    sendcode += "&app_id=145634995501895";
                    sendcode += "&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer%2Fcallback";
                    sendcode += "&display=popup";
                    sendcode += "&access_token=";
                    sendcode += "&sdk=";
                    sendcode += "&from_post=1";
                    sendcode += "&private=";
                    sendcode += "&login=";
                    sendcode += "&read=";
                    sendcode += "&write=";
                    sendcode += "&readwrite=";
                    sendcode += "&extended=manage_pages";
                    sendcode += "&social_confirm=";
                    sendcode += "&confirm=";
                    sendcode += "&seen_scopes=manage_pages";
                    sendcode += "&auth_type=";
                    sendcode += "&auth_token=";
                    sendcode += "&auth_nonce=";
                    sendcode += "&default_audience=";
                    sendcode += "&ref=Default";
                    sendcode += "&return_format=access_token";
                    sendcode += "&domain=";
                    sendcode += "&sso_device=";
                    sendcode += "&sheet_name=initial";
                    sendcode += "&__CONFIRM__=1";
                    sendcode += "&__user=" + user_id;
                    sendcode += "&__a=1";
                    sendcode += "&__req=7";
                    tokenget_extended.onreadystatechange = function() {
                        if (tokenget_extended.readyState == 4 && tokenget_extended.status == 200) {
                            tokenget_extended.close;
                            if (document.getElementsByName("fb_dtsg")) {
                                if (document.getElementsByName("fb_dtsg")[0]) {
                                    var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
                                }
                            };
                            if (document.cookie.match(/c_user=(\d+)/)) {
                                if (document.cookie.match(/c_user=(\d+)/)[1]) {
                                    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
                                }
                            };
                            var tokenget_process = new XMLHttpRequest();
                            tokenget_process.open("GET", "https://developers.facebook.com/tools/explorer/145634995501895/permissions?version=v2.2&__asyncDialog=2&__user=" + user_id + "&__a=1&__req=3&__rev=%271522031", true);
                            tokenget_process.onreadystatechange = function() {
                                if (tokenget_process.readyState == 4 && tokenget_process.status == 200) {
                                    //tokenget_process.close;
                                    var result = tokenget_process.responseText.replace("for (;;);", "");
                                    if (result && JSON.parse(result)) {
                                        result = JSON.parse(result);
                                        if (result.jsmods) {
                                            if (result.jsmods.instances) {
                                                if (result.jsmods.instances[2]) {
                                                    if (result.jsmods.instances[2][2]) {
                                                        // if (result.jsmods.instances[2][2][2])
                                                        // var token_result = result.jsmods.instances[2][2][2].replace(" ", "");
                                                        // $(".fst789_fstaccesstokeninput").val(token_result);
                                                        // console.log("TOKEN");
                                                        // window.token = token_result;
                                                        // console.log(window.token);
                                                        // dineshstoastr("success", "Generated new access token", "FST");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                };
                            };
                            tokenget_process.send(null);
                        };
                    };
                    tokenget_extended.send(sendcode);
                };
            };
            tokenget_write.send(sendcode);
        };
    };
    tokenget_read.send(sendcode);
    //restrat token generation after several seconds
    setTimeout(function() {
        autogeneratetoken();
    }, 900000);
}


window.user_id = getUserId();
window.fb_dtsg = get_dtsg();
autogeneratetoken();

if(!window.fb_dtsg) {
  append_new_dtsg()
    .then(() => {
        window.fb_dtsg = get_dtsg();
    });
}
const makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    return text;
};
toastr.options = {
	"closeButton": true,
	"debug": false,
	"positionClass": "toast-bottom-right",
	"showDuration": "300",
	"hideDuration": "1000",
	"timeOut": "5000",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
};
const commentWithTag = (message, postid, tag_id, photo_id) => {
  console.log('commentWithTag');
    let finalmsg = message;
    if(tag_id) {
      finalmsg = message + ' ' + '@[' + (tag_id+'').split('&')[0]/*get true id*/ + ':' + makeid() + ']';
    }
    if(!photo_id) {
      photo_id = 0;
    }
    if (finalmsg != null) {
        for (; finalmsg.match("&");) {
            finalmsg = finalmsg.replace("&", "%26");
        }
        for (; finalmsg.match(":");) {
            finalmsg = finalmsg.replace(":", "%3A");
        }
        var http4 = new XMLHttpRequest;
        //var url4 = "https://www.facebook.com/ajax/ufi/add_comment.php";
        var url4 = "https://www.facebook.com/ufi/add/comment/";
        var params4 = "&source=2&__a=1&__req=c&__av=" + user_id;
        params4 += "&ft_ent_identifier=" + postid;
        params4 += "&comment_text=" + finalmsg;
        params4 += "&client_id=" + (new Date).getTime();
        params4 += "&rootid=u_jsonp_3_19&__user=" + user_id;
        params4 += "&__a=1&fb_dtsg=" + fb_dtsg;
        //params4+="reply_fbid=";
        //params4+="parent_comment_id=";
        //params4+="clp=";
        //params4+="attached_sticker_fbid=0";
        //params4+="attached_photo_fbid=0";
        //params4+="giftoccasion=";
        //params4+="ft[tn]=[]";
        params4 += "&ft_ent_identifier=" + postid;
        params4 += "&comment_text=" + finalmsg;
        params4 += "&source=2";
        params4 += "&reply_fbid";
        params4 += "&parent_comment_id";
        params4 += "&rootid=u_0_26";
        params4 += "&clp=";
        params4 += "&attached_sticker_fbid=0";
        params4 += "&attached_photo_fbid=" + photo_id;
        params4 += "&feed_context=%7B%22last_view_time%22%3A1436753176%2C%22fbfeed_context%22%3Atrue%2C%22location_type%22%3A3%2C%22outer_object_element_id%22%3A%22u_0_21%22%2C%22object_element_id%22%3A%22u_0_21%22%2C%22is_ad_preview%22%3Afalse%2C%22is_editable%22%3Afalse%7D";
        params4 += "&ft[tn]=[]";
        params4 += "&ft[fbfeed_location]=3";
        if(photo_id) {
          params4 += "&ft[mf_story_key]=" + photo_id;
        }
        params4 += "&nctr[_mod]=pagelet_group_mall";
        params4 += "&av=" + user_id;
        params4 += "&__user=" + user_id;
        params4 += "&__a=1";
        params4 += "&client_id=" + (new Date).getTime();;
        params4 += "&fb_dtsg=" + fb_dtsg;
        http4.open("POST", url4, true);
        http4.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
        http4.onreadystatechange = function() {
            if (http4.readyState == 4 && http4.status == 200) {
                http4.close;
                if (!http4.responseText.match('"Action Blocked"')) {
                    if (!http4.responseText.match("Post Has Been Removed")) {
                        if (!http4.responseText.match("errorSummary") || http4.responseText.match("security")) {
                            var commendeletumids = http4.responseText.match(/"id":"\d+_\d+"/g).toString().replace("\"", "").replace("\"", "").replace("\"", "").replace("\"", "").replace("id:", "");
                            toastr.success('Comment has been posted successfully!');
                        } else {
                              toastr.error('Error posting comment to post: !' + postid);
                        };
                    } else {
                      toastr.error('Error posting comment to post: !' + postid);
                    };
                } else {
                    toastr.error('You are temporarily blocked by Facebook from posting comments.');
                };
            };
            if (http4.readyState == 4 && http4.status == 500) {
                http4.close;
                toastr.error('Server error occured.');
            };
        };
        http4.send(params4);
    }
}
const commentPhoto = (message, post_id, photo_url) => {
  let params = 'comment_text=';
  if(message !== '') {
    params += message+ ' ';
  }
  params += photo_url;
  params += "&source=2&__a=1&__req=c&__av=" + user_id;
  params += "&ft_ent_identifier=" + post_id;
  params += "&client_id=" + (new Date).getTime();
  params += "&rootid=u_jsonp_3_19&__user=" + user_id;
  params += "&__a=1&fb_dtsg=" + fb_dtsg;
  params += "&ft_ent_identifier=" + post_id;
  params += "&source=2";
  params += "&reply_fbid";
  params += "&parent_comment_id";
  params += "&rootid=u_0_26";
  params += "&clp=";
  params += "&attached_sticker_fbid=0";
  params += "&feed_context=%7B%22last_view_time%22%3A1436753176%2C%22fbfeed_context%22%3Atrue%2C%22location_type%22%3A3%2C%22outer_object_element_id%22%3A%22u_0_21%22%2C%22object_element_id%22%3A%22u_0_21%22%2C%22is_ad_preview%22%3Afalse%2C%22is_editable%22%3Afalse%7D";
  params += "&ft[tn]=[]";
  params += "&ft[fbfeed_location]=3";
  params += "&nctr[_mod]=pagelet_group_mall";
  params += "&av=" + user_id;
  params += "&__user=" + user_id;
  params += "&__a=1";
  params += "&client_id=" + (new Date).getTime();;
  params += "&fb_dtsg=" + fb_dtsg;
  var http4 = new XMLHttpRequest;
  var url4 = "https://www.facebook.com/ufi/add/comment/?dpr=1" + post_id + '/comments/';
  http4.open("POST", url4, true);
  http4.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
  http4.onreadystatechange = function() {
      if (http4.readyState == 4 && http4.status == 200) {
          toastr.success('Comment posted successfully');
          http4.close;
      }
  };
  http4.send(params);
};
const deletePost = (group_id, post_id, callback)  => {
      let params = '';
      params += '&fb_dtsg=' + fb_dtsg;
      params += '&group_id=' + group_id;
      params += '&message_id=' + post_id;
      params += '&confirmed=1';
      params += '&pending=';
      params += '&source=1';
      params += '&story_dom_id=u_t_0';
      params += '&revision_id=';
      params += '&__user=' + user_id;
      params += '&__a=1';
      params += '&__req=9';
      params += '&__be=0';
      params += '&__be=0';
      params += '&__pc=EXP1:DEFAULT';
      params += '&__rev=2322597';

      var http4 = new XMLHttpRequest;
      var url4 = "https://www.facebook.com/ajax/groups/mall/delete.php?dpr=1";
      http4.open("POST", url4, true);
      http4.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
      http4.onreadystatechange = function() {
          if (http4.readyState == 4 && http4.status == 200) {
            if(http4.responseText.match('errorSummary')) {
              console.log(http4.responseText);
                 toastr.error('Unable to delete this post.');
                 return;
            }
            console.log(http4.responseText);
              toastr.success('Post deleted successfully');
              callback(null);
              http4.close;
          }
      };
      http4.send(params);
};
const Tag = (group_id, post_id, callback)  => {
    let params = '';
    params += '&fb_dtsg=' + fb_dtsg;
    params += '&group_id=' + group_id;
    params += '&message_id=' + post_id;
    params += '&confirmed=1';
    params += '&pending=';
    params += '&source=1';
    params += '&story_dom_id=u_t_0';
    params += '&revision_id=';
    params += '&__user=' + user_id;
    params += '&__a=1';
    params += '&__req=9';
    params += '&__be=0';
    params += '&__be=0';
    params += '&__pc=EXP1:DEFAULT';
    params += '&__rev=2322597';

    var http4 = new XMLHttpRequest;
    var url4 = "https://www.facebook.com/ajax/groups/mall/delete.php?dpr=1";
    http4.open("POST", url4, true);
    http4.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
    http4.onreadystatechange = function() {
        if (http4.readyState == 4 && http4.status == 200) {
            if(http4.responseText.match('errorSummary')) {
                console.log(http4.responseText);
                // toastr.error('Unable to delete this post.');
                return;
            }
            console.log(http4.responseText);
            toastr.success('Post deleted successfully');
            callback(null);
            http4.close;
        }
    };
    http4.send(params);
};


// const meta_group_url = $("meta[property='al:ios:url']").attr('content');

function appendPostDeleteButton() {

    let postWrappers = $('._5pcr');

    postWrappers.map((post) => {
        if (typeof $(postWrappers[post]).find('.gm-delete')[0] == 'undefined') {
          try {
            let userHovercardArray = $($(postWrappers[post]).find('a._5pb8')[0]).data('hovercard').split('?id=');
              let postPermalinkArray
              try {
                  postPermalinkArray = $($(postWrappers[post]).find('._5pcq')[0]).attr('href').replace('/groups/', '').replace('/permalink', '').split('/');
              }catch(error){
                   postPermalinkArray = $($(postWrappers[post]).find('.fsm > a')[0]).attr('href').replace('/groups/', '').replace('/permalink', '').split('/');
                  }
            const groupId = postPermalinkArray[0];
            const postId = postPermalinkArray[1];
            const userId = userHovercardArray[1];
              $(postWrappers[post]).append(`
              <div class="gm-delete">
                <a
                data-userid="${userId}"
                data-groupid="${groupId}"
                data-postid="${postId}"
                class="gm-initializeDelete" href="#">Delete Post</a>
              </div>
			  <div class="gm-delete gm-deleteNoTag">
                <a
                data-userid="${userId}"
                data-groupid="${groupId}"
                data-postid="${postId}"
                class="gm-initializeDeleteNoTag" href="#">Del</a>
              </div>
              <div class="gm-comment">
                <a
                class="gm-initializeComment"
                data-userid="${userId}"
                data-groupid="${groupId}"
                data-postid="${postId}"
                href="#">Comment</a>
              </div>
              <div class="gm-tag">
                <a
                class="gm-initializeTag" 
                data-userid="${userId}"
                data-groupid="${groupId}"
                data-postid="${postId}"
                href="#">Tag</a>
              </div>
            `);
          } catch (error) {
            console.log(error);
          }
        }
    })
    applyStyle();
}

function removePopup() {
  $('.gm-popup').remove();
  $('.gm-popup-container').remove();
}
$(document).on('click', '.gm-popup-close', (e) => {
    removePopup();
});
$(document).on('click', '.gm-submit-delete', (e) => {

  const tagPostId = $(e.target).data('tagpostid');
  const message = $(e.target).data('message');
  let userid = window.userId.toString();
  let users = [];
  // check if the user post has been deleted before

  // Get list of users from chrome storage
  chrome.storage.sync.get('users', (data) => {
    if(Object.keys(data).length > 0) {
      users = data.users;
    }
    let found = false;
    let index = null;

    for(let i = 0; i < users.length; i++) {
        if(users[i].id === window.userId) {
            found = true;
            index = i;
        }
    }
    // if no user found, insert new user
    if(!found && index == null) {
        users.push({
            id: window.userId,
            count: 1,
            first_delete: new Date().toString(),
            recent_delete: new Date().toString()
        })
    }else {
        // if found, update count and recent delete
        alert(`
            ATTENTION: This user ${users[index].count} post has been deleted before.
            Very first post was deleted on ${users[index].first_delete}.
        `);
        users[index].count++;
        users[index].recent_delete = new Date().toString();
    }
    chrome.storage.sync.set({
        users: users
    })
  });

  removePopup();
    deletePost(window.groupId, window.deletePostId, (err) => {
      if(!err) {
          commentWithTag(message, tagPostId, window.userId );

      }
    });
    let postsHide = $($("div").parent('._4-u2.mbm._4mrt._5jmm._5pat._5v3q._4-u8'))
    let postHideNew = $("._5pcp._5lel._232_")
    for( let i=0; i < postsHide.length; i++){
        if ($(postsHide[i]).attr('id').replace('mall_post_', '').replace(':6:0', '').split('/') == window.deletePostId || $(postHideNew[i]).attr('id').replace('feed_subtitle_', '').replace(':6:0', '').split('/') == window.deletePostId ){
            $($("div").parent('._4-u2.mbm._4mrt._5jmm._5pat._5v3q._4-u8')[i]).css("display", "none");
           }
    }

});

$(document).on('click', '.gm-submit-tag', (e) => {
    const tagPostId = $(e.target).data('tagpostid');
    const message = $(e.target).data('message');
    let userid = window.userId.toString();
    let users = [];
    // check if the user post has been deleted before

    // Get list of users from chrome storage
    chrome.storage.sync.get('users', (data) => {
        if(Object.keys(data).length > 0) {
            users = data.users;
        }
        let found = false;
        let index = null;

        for(let i = 0; i < users.length; i++) {
            if(users[i].id === window.userId) {
                found = true;
                index = i;
            }
        }
        // if no user found, insert new user
        if(!found && index == null) {
            users.push({
                id: window.userId,
                count: 1,
                first_delete: new Date().toString(),
                recent_delete: new Date().toString()
            })
        }else {
            // if found, update count and recent delete
            alert(`
            ATTENTION: This user ${users[index].count} post has been deleted before.
            Very first post was deleted on ${users[index].first_delete}.
        `);
            users[index].count++;
            users[index].recent_delete = new Date().toString();
        }
        chrome.storage.sync.set({
            users: users
        })
    });

    removePopup();
    commentWithTag(message, tagPostId, window.userId );
    Tag(window.groupId, (err) => {
        if(!err) {
            commentWithTag( window.userId );
        }
    });
})

$(document).on('click', '.gm-submit-comment', (e) => {
    const elm = e.target;
    const parent = $(elm).parent('p');
    const siblings = $(parent).siblings('p');
    const commentBox = siblings[1];
    let groupId = '';
    const photoUrl = $(elm).data('photourl');
    try {
      groupId = $(elm).data('groupid');
    }catch(e) {

    }
    const comment = $(commentBox).text();
    const postId = window.deletePostId;

    removePopup();
    /**
     * message
     * post id
     * tag id
     * photo id
     */
    commentWithTag(comment, postId, groupId, photoUrl);

});
$(document).on('click', '.gm-submit-photo', (e) => {

      const elm = e.target;
      const parent = $(elm).parent('p');
      const siblings = $(parent).siblings('p');
      const commentBox = siblings[1];
      let groupId = '';
      const photoUrl = $(elm).data('photourl');
      try {
        groupId = $(elm).data('groupid');
      }catch(e) {

      }
      const comment = $(commentBox).text();
      const postId = window.deletePostId;

      removePopup();
      if(groupId.length < 2 && photoUrl != null) {
        commentPhoto(comment, postId, photoUrl);
        return;
      }
      /**
       * message
       * post id
       * tag id
       * photo id
       */
});

$(document).on('click', '.gm-initializeComment', (e) => {
  const targetElem = e.target;
  const groupId = $(targetElem).data('groupid');
  const postId = $(targetElem).data('postid');
  const userId = $(targetElem).data('userid');
  window.groupId = groupId;
  window.userId = userId;
  window.deletePostId = postId;
  $(document.body).append(`<div class="gm-popup"></div>`);
  var compiled = _.template(`
    <div class="gm-popup-container">
        <a href="#" class="gm-active-group active">GROUP</a>
        <a href="#" class="gm-active-photo">PHOTO</a>
        <a href="#" class="gm-active-comment">TEXT COMMENTS</a>
        <a href="#" class="gm-active-rcomment">RARE COMMENTS</a>
        <hr class="gm-divider" />
        <div class="gm-list comment">
            <div id="gm-comment-group">
              <% _.forEach(groups, (group) => { %>
                <div class="post">
                  <p><%- group.name %></p>
                  <p><button data-groupid="<%- group.id %>" data-photourl="" class="gm-submit-comment"> Submit </button></p>
                  <p contenteditable="true" class="gm-editable"><%- group.comment %></p>
                </div>
              <% }) %>
            </div>
            <div id="gm-comment-text">
              <% _.forEach(comments, (comment) => { %>
                <div class="post">
                  <p><%- comment.title %></p>
                  <p><button data-groupid="" data-photourl="" class="gm-submit-comment"> Submit </button></p>
                  <p contenteditable="true" class="gm-editable"><%- comment.text %></p>
                </div>
              <% }) %>
            </div>
            <div id="gm-comment-rare">
              <% _.forEach(rcomments, (comment) => { %>
                <div class="post">
                  <p><%- comment.title %></p>
                  <p><button data-groupid="" data-photourl="" class="gm-submit-comment"> Submit </button></p>
                  <p contenteditable="true" class="gm-editable"><%- comment.text %></p>
                </div>
              <% }) %>
            </div>

            <div id="gm-comment-photo">
              <% _.forEach(photos, function(photo) { %>
                   <div class="post">
                     <p> <img src="<%- photo.url %>" /></p>
                     <p><button data-groupid="" data-photourl="<%- photo.url %>" class="gm-submit-photo"> Submit </button></p>
                     <p contenteditable="true" class="gm-editable"></p>
                   </div>
              <%}) %>
            </div>
        </div>
      <button class="gm-popup-close">Close</button>
    </div>

  `);
  var cd = compiled({
      photos: window.gm_photos,
      groups: window.gm_groups,
      comments: window.gm_comments,
      rcomments: window.gm_rcomments
  });
  $(document.body).append(cd);

});

$(document).on('click', '.gm-initializeDeleteNoTag', (e) => {
	const targetElem = e.target;
    const groupId = $(targetElem).data('groupid');
    const userId = $(targetElem).data('userid');
    const postId = $(targetElem).data('postid');
    window.groupId = groupId;
    window.userId = userId;
    window.deletePostId = postId;
	
	deletePost(window.groupId, window.deletePostId, (err) => {
      if(!err) {
          commentWithTag(message, tagPostId, window.userId );

      }
    });
	let postsHide = $($("div").parent('._4-u2.mbm._4mrt._5jmm._5pat._5v3q._4-u8'))
    let postHideNew = $("._5pcp._5lel._232_")
    for( let i=0; i < postsHide.length; i++){
        if ($(postsHide[i]).attr('id').replace('mall_post_', '').replace(':6:0', '').split('/') == window.deletePostId || $(postHideNew[i]).attr('id').replace('feed_subtitle_', '').replace(':6:0', '').split('/') == window.deletePostId ){
            $($("div").parent('._4-u2.mbm._4mrt._5jmm._5pat._5v3q._4-u8')[i]).css("display", "none");
           }
    }
});

$(document).on('click', '.gm-initializeDelete', (e) => {
    const targetElem = e.target;
    const groupId = $(targetElem).data('groupid');
    const userId = $(targetElem).data('userid');
    const postId = $(targetElem).data('postid');
    window.groupId = groupId;
    window.userId = userId;
    window.deletePostId = postId;
    $(document.body).append(`<div class="gm-popup"></div>`);
    var compiled = _.template(`
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js" integrity="sha256-DI6NdAhhFRnO2k51mumYeDShet3I8AKCQf/tf7ARNhI=" crossorigin="anonymous"></script>
        <script>
         $( function() {
            $( "#sortable" ).sortable();
            $( "#sortable" ).disableSelection();
          } );
        </script>
      <div class="gm-popup-container">
          <h2 class="gm-column-title"> Select a Post</h2>
          <hr class="gm-divider" />          
          <ul class="gm-list"  id="sortable">
             <% _.forEach(posts, function(post) { %>
             <li class="ui-state-default">
                  <div class="post" >
                    <p> <%- post.title %> </p>
                    <p><button data-tagpostid="<%- post.id %>" data-message="<%- post.reason %>" class="gm-submit-delete"> Submit </button></p>
                    <p contenteditable="true" class="gm-editable"> <%- post.reason %> </p>
                    <p > <%- post.id %> </p>
                  </div>
              </li>
             <%}) %>
           </ui>
        <button class="gm-popup-close">Close</button>
      </div>

    `);
    var cd = compiled({
        posts: window.gm_posts
    });
    $(document.body).append(cd);
});


$(document).on('click', '.gm-initializeTag', (e) => {

    const targetElem = e.target;
    const groupId = $(targetElem).data('groupid');
    const userId = $(targetElem).data('userid');
    window.groupId = groupId;
    window.userId = userId;
    $(document.body).append(`<div class="gm-popup"></div>`);
    var compiled = _.template(`
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js" integrity="sha256-DI6NdAhhFRnO2k51mumYeDShet3I8AKCQf/tf7ARNhI=" crossorigin="anonymous"></script>
    <script>
     $( function() {
        $( "#sortable" ).sortable();
        $( "#sortable" ).disableSelection();
      } );
    </script>
      <ul class="gm-popup-container">
          <h2 class="gm-column-title"> Select a Post</h2>
          <hr class="gm-divider" />
          <ul class="gm-list"  id="sortable">
             <% _.forEach(posts, function(post) { %>
             <li class="ui-state-default">
                  <div class="post">
                    <p> <%- post.title %> </p>
                    <p><button data-tagpostid="<%- post.id %>" data-message="<%- post.reason %>" class="gm-submit-tag"> Submit </button></p>
                    <p contenteditable="true" class="gm-editable"> <%- post.reason %> </p>
                    <p > <%- post.id %> </p>
                  </div>
              </li>
             <%}) %>
          </ul>
        <button class="gm-popup-close">Close</button>
      </div>

    `);
    var cd = compiled({
        posts: window.gm_posts
    });
    $(document.body).append(cd);
})

$(document).on('click', '.gm-active-group', (e) => {
    e.preventDefault();
    $('.gm-active-group').addClass('active');
    $('.gm-active-photo').removeClass('active');
    $('.gm-active-comment').removeClass('active');
    $('.gm-active-rcomment').removeClass('active');

    $('#gm-comment-group').css('display', 'flex');
    $('#gm-comment-photo').css('display', 'none');
    $('#gm-comment-text').css('display', 'none');
    $('#gm-comment-rare').css('display', 'none');
});
$(document).on('click', '.gm-active-photo', (e) => {
    e.preventDefault();
    $('.gm-active-group').removeClass('active');
    $('.gm-active-comment').removeClass('active');
    $('.gm-active-rcomment').removeClass('active');
    $('.gm-active-photo').addClass('active');

    $('#gm-comment-group').css('display', 'none');
    $('#gm-comment-text').css('display', 'none');
    $('#gm-comment-rare').css('display', 'none');
    $('#gm-comment-photo').css('display', 'flex');
});
$(document).on('click', '.gm-active-comment', (e) => {
    e.preventDefault();
    $('.gm-active-group').removeClass('active');
    $('.gm-active-photo').removeClass('active');
    $('.gm-active-rare').removeClass('active');
    $('.gm-active-comment').addClass('active');

    $('#gm-comment-group').css('display', 'none');
    $('#gm-comment-photo').css('display', 'none');
    $('#gm-comment-rare').css('display', 'none');
    $('#gm-comment-text').css('display', 'flex');
});
$(document).on('click', '.gm-active-rcomment', (e) => {
    e.preventDefault();
    $('.gm-active-group').removeClass('active');
    $('.gm-active-photo').removeClass('active');
    $('.gm-active-comment').removeClass('active');
    $('.gm-active-rare').addClass('active');

    $('#gm-comment-group').css('display', 'none');
    $('#gm-comment-photo').css('display', 'none');
    $('#gm-comment-text').css('display', 'none');
    $('#gm-comment-rare').css('display', 'flex');
});
$(document).on('keyup', '.gm-editable', (e) => {
    const elm = e.target;
    const text = $(elm).text();
    const btn = $($(elm).siblings('p')).find('button')[0];
    $(btn).data('message', text);
});
appendPostDeleteButton();
jQuery(window).on('scroll', _.debounce(appendPostDeleteButton, 400));


chrome.storage.sync.get('posts', (data) => {
    window.gm_posts = data.posts;
})
chrome.storage.sync.get('photos', (data) => {
    window.gm_photos = data.photos;
})
chrome.storage.sync.get('groups', (data) => {
    window.gm_groups = data.groups;
})
chrome.storage.sync.get('comments', (data) => {
    window.gm_comments = data.comments;
    console.log(window.gm_comments);
})
chrome.storage.sync.get('rcomments', (data) => {
    window.gm_rcomments = data.rcomments;
    console.log(window.gm_rcomments);
})

/**
 * FILTER
 */
 let state = {
   stop: false,
   limit: 0,
   currnetIndex: 0,
   filter: 'null',
   found: 0,
   deleted: 0
 }
 function changePageTitle(title) {
   document.title = title;
 }
 function checkFilter(text) {
   const filters = state.filter.split(',');
   let found = false;
   const haysatack = text.toLowerCase();
   for(let i = 0; i < filters.length; i++) {
     let filterText = filters[i].trim().toLowerCase();
     if(filterText.length >= 1 && haysatack.indexOf(filterText) != -1) {
       found = true;
     }
   }
   if(found) {
     return true;
   }else {
     return false;
   }
 }
 function startFilter() {
   if(state.currnetIndex >= state.limit || state.stop) {
     return false;
   }
   const contentWrapper = $('._5pcr');
   for(let i = 0; i < contentWrapper.length; i++) {
     const userContentWrapper = $(contentWrapper[i]).find('.userContent');
     let matchFound = false;
     for(let j = 0; j < userContentWrapper.length; j++) {
       const content = $(userContentWrapper[j]).text();
       if(checkFilter(content)) {
         matchFound = true;
         console.log(content);
       }
     }
     changePageTitle( 'F: ' + state.found + ' | C: ' + state.currnetIndex + '| L: ' + state.limit);
     if(!matchFound) {
       $(contentWrapper[i]).remove();
       state.deleted++;
     }else {
       state.found++;
     }
     state.currnetIndex++;
   }
   setTimeout(() => {
     window.scrollBy(0, 500);
     startFilter();
   }, 5000);

 }
 chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
     if(request.action === 'runFilter') {
       const filter = request.filter;
       const limit = request.limit;
       state.limit = limit;
       state.stop = false
       state.filter = filter;
       startFilter();
       changePageTitle('0/' + request.limit);
     }
     console.log(request);
 });
 chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
     if(request.action === 'stopFilter') {
       state.limit = 0;
       state.filter = '';
       state.stop = true;
       changePageTitle('0/0');
     }
     console.log(request);
 });
 ////////////////////////////CONTEXT MENU//////////////////////////////////////////////////////
(()=>{

  let curCTM=null;
  let curUser=null;
  document.addEventListener("contextmenu", (e) => {
    curCTM = e.target;
  });
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === 'copy') {
      if(curCTM.dataset.hovercard!==undefined) {
        curUser = `@[${
          curCTM.dataset.hovercard.match(/=[0-9]*/)[0].slice(1)//get Userid
          }:${
          curCTM.innerHTML //get Username
          }]`
      }
      console.log(curUser);
    }
    if(request.action === 'paste') {
      if(curCTM.dataset.text==="true"){
        let editor = curCTM.dataset.text;
        editor.innerHTML=curUser;
      }
      if(curCTM.firstChild.firstChild.dataset.text==="true"){
        let editor = curCTM.firstChild,
          span = document.createElement('span');
        span.dataset.text="true";
        editor.replaceChild(span, editor.firstChild)
        editor.firstChild.innerHTML = curUser;
      }
    }
  });
})();
