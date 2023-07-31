// const Posts=require('../../../models/post');
// const Comment=require('../../../models/comment');
// module.exports.index = async function(req, res){
//     let posts=await Posts.find({})
//     .sort('-createdAt')
//     .populate('user')
//     .populate({
//       path:'comments',
//       populate:{
//         path:'user'
//       }
//     })
//     .exec();
//     return res.json(200, {
//         message: "List of posts",
//         posts:posts
//     })
// }

// module.exports.destroy = async function (request, response) {
//   try {
//     let post = await Posts.findById(request.params.id);
//     // console.log(post);
//     if (post.user == request.user.id) {
//       //console.log("post", post);
//       post.deleteOne();
//       let comments = await Comment.deleteMany({ post: request.params.id });

//       // if (request.xhr) {
//       //   return response.status(200).json({
//       //     post_id: request.params.id,
//       //     message: "Post Deleted",
//       //   });
//       // }
//       // request.flash("successs", "Post Deleted Successfully");
//        return response.json(200, {
//         message:"post and associated comments are deleted successfully"
//        });
//     } else {
//       return response.json(401,{
//         message:"you can not delete this post"
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return response.json(500, {
//       message:"Internal server Error"
//     });
//   }
// };
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req, res){


    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
          post.deleteOne();

            await Comment.deleteMany({post: req.params.id});


    
            return res.json(200, {
                message: "Post and associated comments deleted successfully!"
            });
        }else{
            // req.flash('error', 'You cannot delete this post!');
            return res.json(401, {
              message:"you can not delete this post"
            });
        }

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}