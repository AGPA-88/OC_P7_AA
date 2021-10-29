const Post = require ('../models/posts');

//GET
exports.getPosts = (req, res, next) => {
    Post.findAll().then(
        (posts) => {
            res.status(200).json(posts);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
exports.getPost = (req, res, next) => {
    Post.findOne({where: {id:req.params.id}}).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

//POST

exports.createPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId,
        readerUsers: ":" + req.body.userId + ":"
    });
    if (req.file){
        post.imageUrl =  url + '/images/' + req.file.filename;
    }
    post.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};    

//DELETE 
exports.deletePost = (req, res, next) => {
    Post.findOne({where: {id:req.params.id}}).then(
        (post) => {
            post.destroy();
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

//Update
exports.update = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    Post.findOne({where: {id:req.params.id}}).then(
        (post) => {
            if(req.body.title){
                post.title = req.body.title;
            }
            if(req.body.description){
                post.description = req.body.description;
            }
            if(req.body.imageUrl){
                post.imageUrl = req.body.imageUrl;
            }
            if(req.body.readerUsers){
                console.log(post.readerUsers, req.body.readerUsers);
                post.readerUsers = req.body.readerUsers;
            }
            if (req.file){
                post.imageUrl =  url + '/images/' + req.file.filename;
            }
            post.save().then(
                () => {
                    res.status(201).json({
                        message: 'Post modified successfully!'
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


exports.apiMsg = (req,res) => {
    res.status(200).json({
        message: "This API only authorizes GET, POST, PUT and DELETE"
    });
};
