const Post = require('../models/posts');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({})
    // .then(function(posts){
    //     return res.render('home',{
    //         title: 'Codial | Home',
    //         posts: posts
    //     });
    // })


    // Populate the user of each post
    Post.find({})
    .populate('user').exec()
    .then(function(posts){
        return res.render('home',{
            title: 'Codial | Home',
            posts: posts
        });
    })

    // return res.render('home', {
    //     title: 'Home',
    //     posts: []
    // });
}