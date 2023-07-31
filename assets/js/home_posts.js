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