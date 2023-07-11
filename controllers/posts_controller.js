const Posts=require('../models/post');
const Comment=require('../models/comment');

// creating post and  saving it in db
module.exports.addPost= async function(req, res){
    try{
      let post= await Posts.create({
        content: req.body.content,
        user: req.user._id,

       });
      //  console.log(req.user._id);
       return res.redirect('back');


    }catch (error) {
        console.log("Error in creating post", error);
        return;
    }
}


//for delete the post

module.exports.destroy = async function (request, response) {
  try {
    let post = await Posts.findById(request.params.id);
    // console.log(post);

    if (post.user == request.user.id) {
      //console.log("post", post);
      post.deleteOne();
      let comments = await Comment.deleteMany({ post: request.params.id });

      if (request.xhr) {
        return response.status(200).json({
          post_id: request.params.id,
          message: "Post Deleted",
        });
      }
      // request.flash("successs", "Post Deleted Successfully");
       return response.redirect("back");
    } else {
      return response.redirect("back");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};