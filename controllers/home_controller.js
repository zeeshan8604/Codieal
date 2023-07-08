const Post =require('../models/post');
module.exports.home= async function(req,res){
  // console.log(req.cookies);
    // return res.render('home',{
    //    title:"Home"
    // })
  try{
    let posts=await Post.find({}).populate('user').exec();
      return res.render('home',{
        title:'codiel | home ',
        posts:posts
      })
    }catch (error) {
      console.log("Error in displaying post", error);
      return;
    }
  }