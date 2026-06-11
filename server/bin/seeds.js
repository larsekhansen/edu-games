const mongoose = require("mongoose")
const Game = require('../models/game')
const User = require('../models/user')
const Review = require('../models/review')
const Dictionary = require('../models/dictionary')
require('dotenv').config()

const dbName = 'edu-fun';
const mongoUri = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`
mongoose.connect(mongoUri)

const games = [
  {
    name: "Tetris",
    keywords: ["fine motor coordination", "fine motor coordination", "fine motor coordination", "fine motor coordination", "fine motor coordination", "retention", "short-term-memory", "reaction speed", "information processing", "executive functions", "planning/visualising", "shape visualisation"],
    description: "Tetris is excellent for several important cognitive abilities. As the games pace progresses it requires more skills from the user. Reaction speed and planning, which are less important in the start becomes imperative to master at higher levels. ",
    imgURL: "https://www.geek.com/wp-content/uploads/2016/05/image-625x352.jpg",
    gameURL: "https://tetris.com/play-tetris"
  },
  {
    name: "Snake",
    keywords: ["fine motor coordination", "reaction speed", "information processing"],
    description: "Snake is a classic game where the goal is to get as big as possible by eating as much food as possible. Steer the snake to the food, and crashing into the wall or yourself",
    imgURL: "http://www.coolmath-games.com/sites/cmatgame/files/snake.png",
    gameURL: "http://www.coolmath-games.com/0-snake"
  },
  {
    name: "Mouse-maze",
    keywords: ["fine motor coordination", "visuo spatial ability", "sense of space"],
    description: "Recieving 3rd place in the prestigious vote for three best games in the May 2018 Ironhack web-dev-bootcamp, this games needs no introduction. But let's introduce it anyway. The goal of mouse-maze is to guide your cursor 'Pointy' through the maze without touching the cursed walls - or any of the monsters that lurk in the maze. Will you make it through?",
    imgURL: "https://image.ibb.co/nFhfTd/mouse_maze_card.png",
    gameURL: "https://lars1702.github.io/Mouse-Maze-Game/"
  },
  {
    name: "Counting in the Kitchen",
    keywords: ["dyscalculia", "number processing", "counting", "order and quantities", "math"],
    description: "In this number recognition game, children have to identify quantities as quickly as possible to serve customers in a restaurant. After Floyd expertly stacks up the burgers, it's your job to determine which group has the right number of burgers and to choose quickly.",
    imgURL: "https://image.ibb.co/cDLLuJ/counting_in_the_kitchen.png",
    gameURL: "https://www.education.com/game/counting-in-the-kitchen/"
  },
  {
    name: "Addition pizza party",
    keywords: ["dyscalculia", "number processing", "addition", "math"],
    description: "Explore simple addition using pizza topping manipulatives in this interactive math game. Preschoolers practice counting toppings one-by-one, aided by visual clues to help them get each order just right. This concrete counting game helps kids master one-to-one correspondence, a foundation for success with addition problems.",
    imgURL: "https://image.ibb.co/d64SPJ/Addition_pizza_party.png",
    gameURL: "https://www.education.com/game/addition-pizza-1-10/"
  },
  {
    name: "Synonym quiz",
    keywords: ["information processing", "word processing", "reading comprehension", "synonyms", "reading comprehension"],
    description: "Sentence clues can help us identify synonyms, or words with similar meanings, to learn what new words mean. In this interactive quiz, kids use sentence clues to identify the meaning of new words. Strengthening this essential skill now will help young learners apply it to any text, expanding their vocabulary every time they read!",
    imgURL: "https://image.ibb.co/ey9SPJ/Synonym_from_context_quiz.png",
    gameURL: "https://www.education.com/game/vocabulary-context-clues-quiz/"
  },
  {
    name: "Hangman",
    keywords: ["autism", "dyslexia", "fine motor coordination", "reaction speed", "information processing"],
    description: "Try to guess the word before the hangman is fully drawn! In this version you have several fun categories to choose from, like animals, sports, nature numbers, letters and more.",
    imgURL: "https://image.ibb.co/d9CYWy/hangman2.png",
    gameURL: "https://www.gamestolearnenglish.com/hangman-english/"
  },
]

const dictionary = [
  {
    term: "Autism",
    entry: "Autism is a developmental disorder characterized by difficulties with social interaction and communication, and by restricted and repetitive behavior. Parents usually notice signs during the first three years of their child's life. These signs often develop gradually, though some children with autism reach their developmental milestones at a normal pace before worsening.",
    references: [
      "https://en.wikipedia.org/wiki/Autism",
      "Autism Spectrum Disorder, 299.00 (F84.0). In: American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition. American Psychiatric Publishing; 2013.",
    ]
  }
]

const reviews = [
  {
    title: "This game was great",
    comment: "I tried this game with a 13-year old autistic child, with high concentration difficulties. He got right into the game, I've never seen him so focused. I just hope he will be able to use that concentration for real-life situations later.",
    _user: "5b476beeb98e0a72337f2c20",
    _game: "5b476beeb98e0a72337f2c20",
    created: { type: Date, default: Date.now },
  }
]

const user = new User(
  {
    email: "admin@admin.com",
    name: "admin",
    imgURL: "https://avatars2.githubusercontent.com/u/38748483?s=460&v=4",
    favs: ["5b476beeb98e0a72337f2c20", "5b476beeb98e0a72337f2c20"]
  })


Game.deleteMany()
.then(() => User.deleteMany())
.then(() => Review.deleteMany())
.then(() => Game.create(games))
.then(() => User.register(user, "kaffekopp"))
.then(() => Review.create(reviews))
.then(() => Dictionary.create(dictionary))
.then(() => console.warn(`\n Created a collection of ${games.length} games, 1 user, ${reviews.length} reviews, ${dictionary.length} dict entries(s) \n`))
.then(() => mongoose.connection.close())
.catch(err => console.error("ERROR ERROR ERROR: \n \n", err))
