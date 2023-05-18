const User = require('../models/users');
const fs = require('fs');
const path = require('path');

module.exports.default = function(req, res){
    return res.render('users', {
        title: 'User',
        user_msg: ''
    });
}

module.exports.profile = function(req, res){

    User.findById(req.params.id)
    .then(function(user){
        return res.render('users', {
            title: 'User',
            user_msg: 'Hello VB!!',
            profile_user: user
        });
    })

    
}

module.exports.update = async function(req, res){

    if(req.user.id == req.params.id){

        try{
            // let user = await User.findByIdAndUpdate(req.params.id, req.body)
            let user = await User.findById(req.params.id);
            User.uploadAvatar(req, res, function(err){
                if(err){
                    console.log('*** MULTER Error', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;


                if(req.file){

                    if(user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // Saving the path of uploaded file in the user model
                    user.avatar = User.avatarPath + '/' +req.file.filename;
                    // console.log(req.file);
                }
                user.save();
            });

            return res.redirect('back');
        }catch(err){
            req.flash('error', err);
            console.log('Error', err);
        }
    }
    else{
        req.flash('error', 'Unauthorized');
        return res.status('404').send('Unauthorized');
    }
    
}

module.exports.signup = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_signup', {
        title: 'User',
        user_msg: 'VB Up'
    });
}

module.exports.signin = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_signin', {
        title: 'User',
        user_msg: 'Sign In'
    });
}

module.exports.createUser = function(req, res){

    if(req.body.upass != req.body.upass_c){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email})
    .then(function(data){
        console.log('User already exist', data);
        if(!data){
            User.create({
                name: req.body.uname,
                email: req.body.email_id,
                password: req.body.upass
            })
            .then(function(data){
                console.log('Succesful Sign Up', data);
            })
            .catch(function(err){
                console.log('Error while creating User for Sign Up', err);
            })
        }
    })
    .catch(function(err){
        console.log('Error while creating User for Sign Up', err);
    });

    return res.redirect('back');
}

module.exports.createSession = function(req, res){
    console.log('In Create Session')
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}


module.exports.deleteSession = function(req, res){

   
    req.logout(function(err){
        console.log(err || 'LogOut successful.')
    });
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}