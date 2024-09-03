const { User, Thought } = require('../models');

module.exports = {

    async createUser(req, res) {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email
        })

        res.json({
            message: 'New user has been created',
            user:newUser});
    },
    async updateUser(req, res) {
        const updatedUser = await User.findOneAndUpdate(req.params.user_id, req.body, { new: true })

        res.json({
            message: 'This user has been updated',
            user:updatedUser})
    },
    async deleteUser(req, res) {
        const user = await User.findOneAndDelete(req.params.user_id);

        await user.deleteOne();
        res.json({
            message: 'A user has been deleted'
        });
    },
    async getSingleUser(req, res) {
        const user = await User.findById(req.params.user_id).populate('thoughts').populate('friends');

        res.json(user)
    },
    async getAllUsers(req, res) {
        const users = await User.find();

        res.json(users)
    },
    async addFriend(req, res) {
        const user = await User.findById(req.params.userId);

        user.friends.push(req.params.friendId);

        await user.save();

        res.json({
            message: 'You have added a friend'
        })
    },
    async deleteFriend(req, res) {
        const user = await User.findOneAndDelete(req.params.userId);

        user.friends.pull(req.params.friendId);

        await user.save();

        res.json({
            message: 'You have removed a friend'
        })
    }
}