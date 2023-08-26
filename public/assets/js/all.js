// class ChatEngine {
//     constructor(chatBoxId, userEmail) {
//         this.chatBox = $(`#${chatBoxId}`);
//         this.userEmail = userEmail;

//         this.socket = io.connect('http://localhost:5000');

//         if (this.userEmail) {
//             this.connectionHandler();
//         }
//     }

//     connectionHandler() {
//         let self = this;
//     this.socket.on('connect_error', (error) => {
//         console.error('Socket connection error:', error);
//     });

//         this.socket.on('connect', function () {
//             console.log('Connection established using sockets...!');


//             self.socket.emit('join_room',{
//                 user_email:self.userEmail,
//                 chatroom:'codial'
//             });
//             self.socket.on('user_joined',function(data){
//                 console.log(' A user joined', data);
//             });
//         });

//         $('#send-message').click(function(){
//             let msg = $('#chat-message-input').val();

//             if (msg != ''){
//                 self.socket.emit('send_message', {
//                     message: msg,
//                     user_email: self.userEmail,
//                     chatroom: 'codeial'
//                 });
//             }
//         });

//         self.socket.on('receive_message', function(data){
//             console.log('message received', data.message);


//             let newMessage = $('<li>');

//             let messageType = 'other-message';

//             if (data.user_email == self.userEmail){
//                 messageType = 'self-message';
//             }

//             newMessage.append($('<span>', {
//                 'html': data.message
//             }));

//             newMessage.append($('<sub>', {
//                 'html': data.user_email
//             }));

//             newMessage.addClass(messageType);

//             $('#chat-messages-list').append(newMessage);
//         });
//     }
// }


class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}

{
    // console.log('hello js home');
    let createPost = function () {
        let newPostForm = $("#post-form");
        newPostForm.submit(function (e) {
          e.preventDefault();
          //console.log("yesss");
          $.ajax({
            type: "post",
            url: "/posts/addPost",
            data: newPostForm.serialize(),
            success:function(data){
              // console.log(data);
              let newpost=newPostDom(data.data.post);
              $('#post-list-container>ul').prepend(newpost);
              deletePost($(' .delete-post-button',newpost));


              new PostComments(data.data.post._id);

              new Noty({
                theme: 'relax',
                text: "Post published!",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();

            },error:function(error){
              console.log(error.responseText);
            }
          });
       
});
};


// method to create post in DOM
let newPostDom=function(post){
  return $(`<li id="post-${post._id}">
  <p>
      <small>
              <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
      </small>
      ${post.content}
      <br>
      <small>
      ${post.user.name}
      </small>
  </p>
  <div class="post-comments">
          <form action="/comments/addcomment" method="POST">
          <input type="text" name="content" placeholder="type here to add comment">
          <input type="hidden"name=post value="${post._id}">
          <input type="submit" value="Add Comment">
          </form>  
      <div class="post-comments-list">
      <ul id="post-comments-${post._id}">
      </ul>
     </div>
  </div>
  
</li>`);
};

let deletePost=function(deleteLink){
  $(deleteLink).click(function(e){
    e.preventDefault();
    $.ajax({
      type:'get',
      url:$(deleteLink).prop('href'),
      success:function(data){
        $(`#post-${data.post_id}`).remove();

        new Noty({
          theme: 'relax',
          text: "Post Deleted",
          type: 'success',
          layout: 'topRight',
          timeout: 1500
          
      }).show();
      },error: function(error){
        console.log(error.responseText);
      }
       
    })
  })
}
let convertPostsToAjax = function(){
  $('#post-list-container>ul>li').each(function(){
      let self = $(this);
      let deleteButton = $(' .delete-post-button', self);
      deletePost(deleteButton);

      // get the post's id by splitting the id attribute
      let postId = self.prop('id').split("-")[1]
      new PostComments(postId);
  });
}
createPost();
convertPostsToAjax();
}
class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/addcomment',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                        </p>    

                </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}
function toggleFriend(toggleFriendBtn){
    console.log(toggleFriendBtn);
    console.log($(toggleFriendBtn));
    $(toggleFriendBtn).click(function(event){
        event.preventDefault();
        $.ajax({
            type : "GET",
            url : $(toggleFriendBtn).attr("href"),
            success : function(data){
                console.log(data.deleted);
                if(data.deleted){
                    $(toggleFriendBtn).html("Add Friend")
                }else{
                    $(toggleFriendBtn).html("Remove Friend")
                }
                
            },
            error : function(error){
                console.log(error.responseText);
            }

                
            })

       })
}

console.log('hiii')

toggleFriend($(".toggle-friend-btn"));
// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }


                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} Likes`);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}


let preview = function(){
    $("#change-avtar").change(function(){
        const reader = new FileReader();
        let file = event.target.files[0];
        
        reader.readAsDataURL(file);
        reader.addEventListener("load" , function(){
            $("#img").attr("src" , this.result);
            console.log(this , this.result);
        })
       
})
}

preview();