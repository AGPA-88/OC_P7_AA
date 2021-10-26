const Sauce = require ('../models/sauces');

//GET
exports.getSauces = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
        res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
        res.status(400).json({
            error: error
        });
        }
    );
  };

exports.getSauce = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };


  exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}).then((sauce) => {
          if (req.body.like == 1 && sauce.usersLiked.includes(req.body.userId) === false) {
              sauce.usersLiked.push(req.body.userId)
              if (sauce.likes){
                sauce.likes += 1}
              else {
                sauce.likes = 1
              }
              console.log('Added user in userLiked')
          } else if (req.body.like == 0 && sauce.usersLiked.includes(req.body.userId)) {
              sauce.usersLiked.remove(req.body.userId)
              sauce.likes -= 1
          } else if (req.body.like == -1 && sauce.usersDisliked.includes(req.body.userId) === false) {
              sauce.usersDisliked.push(req.body.userId)
              if (sauce.dislikes){
                sauce.dislikes += 1}
              else {
                sauce.dislikes = 1
              }
          } else if (req.body.like == 0 && sauce.usersDisliked.includes(req.body.userId)) {
              sauce.usersDisliked.remove(req.body.userId)
              sauce.dislikes -= 1
          }         
          sauce.save().then(
              () => {
                  res.status(201).json({
                      message: "Sauce Like Updated!"
                  });
              }
          ).catch(
              (error) => {
                  res.status(400).json({
                      error: error
                  });
              }
          );
      });
    };


//POST

exports.createSauce = (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');
  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: req.body.sauce.heat,
    userId: req.body.sauce.userId,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save().then(
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


//PUT  
  exports.putSauce = (req,res) => {
    const url = req.protocol + '://' + req.get('host');
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => { 
        console.log(req.body);
        if(req.file){
          sauce.imageUrl = url + '/images/' + req.file.filename
          req.body = JSON.parse(req.body.sauce)
          console.log(req.body);

        }   
        sauce.userId =req.body.userId
        sauce.name =req.body.name
        sauce.description =req.body.description
        sauce.manufacturer =req.body.manufacturer
        sauce.mainPepper =req.body.mainPepper
        sauce.heat =req.body.heat
     
        sauce.save().then(
          () => {
            res.status(201).json({
              message: 'Updated successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        )
    })
  };

//DELETE 
  exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id}).then(
      () => {
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

  exports.apiMsg = (req,res) => {
    res.status(200).json({
      message: "This API only authorizes GET, POST, PUT and DELETE"
    });
  };
