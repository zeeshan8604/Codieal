const Post =require('../models/post');
const User=require('../models/user');
module.exports.home= async function(req,res){
  // console.log(req.cookies);
    // return res.render('home',{
    //    title:"Home"
    // })
  try{
    let posts=await Post.find({})
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    })
    .exec();
    let user= await User.find({});
      return res.render('home',{
        title:'codiel | home ',
        posts:posts,
        all_users:user
      })
    }catch (error) {
      console.log("Error in displaying post", error);
      return;
    }
  }