const router = require('express').Router();
const thoughtController = require('../controllers/thought_controller');
const userController = require('../controllers/user_controller');

//User Routes

//Create a new user
router.post('/users', userController.createUser);

//GET all users
router.get('/users', userController.getAllUsers);

//GET a to retrieve a single user
router.get('/users/:id', userController.getSingleUser);

//Update a user by id
router.put('/users/:id', userController.updateUser);

//DELETE a user by id
router.delete('/users/:id', userController.deleteUser);

//Add a friend to a user's friend list
router.post('/users/:userId/friends/:friendId', userController.addFriend);

// DELETE a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', userController.deleteFriend);

//Thought Routes

//GET all thoughts
router.get('/thoughts', thoughtController.getAllThoughts);

//GET a single thought by id
router.get('/thoughts/:id', thoughtController.getSingleThought);

//Create a new thought
router.post('/thoughts', thoughtController.createThought);

//Update a thought by id
router.put('/thoughts/:id', thoughtController.updateThought);

//DELETE a thought by id
router.delete('/thoughts/:id', thoughtController.deleteThought);

module.exports = router;