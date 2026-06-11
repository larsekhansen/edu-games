const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Game = require('../models/game');
const passport = require('passport');
const config = require('../configs/index');
const { uploadCloud, uploadImage } = require('../configs/cloudinary');

// Route to get profile

router.get("/profile", passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  console.log("ENTERING PROFILE ROUTE")
  User.findById(req.user.id)
  .populate('_games')
  .populate({
    path: '_favs.games',
    model: 'Game'
  })
  .then(currentUser => {
    console.log("LEAVING PROFILE ROUTE", currentUser)
    res.json(currentUser)
  })
});


router.post('/add-game', uploadCloud.single('picture'), async (req, res, next) => {
  try {
    console.log('DEBUG req.file', req.body);

    const uploadedImage = req.file
      ? await uploadImage(req.file.buffer, req.file.originalname)
      : null;

    const newGame = {
      name: req.body.name,
      description: req.body.description,
      keywords: req.body.keywords.split(","),
      gameURL: req.body.gameURL,
      imgURL: uploadedImage ? uploadedImage.secure_url : undefined,
    };

    const createdGame = await Game.create(newGame);

    res.json({
      success: true,
      newGame: createdGame
    });
  } catch (err) {
    next(err);
  }
});

router.post('/add-to-fav',  passport.authenticate("jwt", config.jwtSession),(req, res, next) => {
  let userId = req.user.id;
  let ListName = req.body.newFavGame.value;
  let gameId = req.body.gameId;
  
  console.log("\nUSER:", userId,"\nLIST:",ListName, "\nGAME:",gameId)

  User.findById(userId)
  .then((user)=>{console.log(user._favs)})
 
})


module.exports = router;