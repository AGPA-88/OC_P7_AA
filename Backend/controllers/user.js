const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//GET
exports.getUsers = (req, res, next) => {
    User.findAll().then(
        (user) => {
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getUser = (req, res, next) => {
    User.findOne({where: { id: req.params.id }}).then(
        (user) => {
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};
  

//SIGNUP
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                avatarUrl:"http://localhost:8080/static/image/icon-small.png",
                description: "",
                job:""
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'User added successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    );
};


//Update
exports.update = (req, res, next) => {
    User.findOne({where: { id: req.params.id }}).then(
        (user) => {
            console.log(req.body);
            if(req.body.firstname){
                user.firstname = req.body.firstname;
            }
            if(req.body.lastname){
                user.lastname = req.body.lastname;
            }
            if(req.body.description){
                user.description = req.body.description;
            }
            if(req.body.job){
                user.job = req.body.job;
            }
            if(req.body.avatarUrl){
                user.avatarUrl = req.body.avatarUrl;
                console.log(user.avatarUrl);
            }
            if (req.body.password){
                bcrypt.hash(req.body.password, 10).then(
                    (hash) => {
                        console.log(hash);
                        user.password= hash;
                        console.log(user.password);
                    });
            }
            console.log(user);
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'User modified successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        });
};

//LOGIN
exports.login = (req, res, next) => {
    User.findOne({where: { email: req.body.email }}).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    message: 'User not found!'
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            message: 'Incorrect password!'
                        });
                    }
                    const token = jwt.sign(
                        {userId: user.id}, 
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' });
                    res.status(200).json({
                        userId: user.id,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
};


//DELETE
exports.delete = (req, res, next) => {
    User.findOne({where: {id:req.params.id}}).then(
        (user) => {
            user.destroy().then(
                () => {
                    res.status(201).json({
                        message: 'Deleted!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                });
        });
};

