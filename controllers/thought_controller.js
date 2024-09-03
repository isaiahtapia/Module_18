const { User, Thought } = require('../models');

module.exports = {

    async createThought(req, res) {
        const user = await User.findById(req.params.user_id);
        const newThought = await Thought.create({
            thoughtText: req.body.thoughtText,
            username: user.username
        })

        user.thoughts.push(newThought._id);
        await user.save();

        res.json({
            message: 'Your new thought has been Created',
            thought: newThought
        })
    },
    async getAllThoughts(req, res) {
        const thoughts = await Thought.find().populate({
            path: 'username',
            select: 'email -_id -username'
        });
        res.json(thoughts)
    },
    async getSingleThought(req, res) {
        const thought = await Thought.findById(req.params.thought_id)

        res.json(thought);
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedThought) {
                return res.status(404).json({ message: 'The thought was not found' });
            }
            res.json({
                message: 'Your thought has been updated',
                thought: updatedThought
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error has occurred, thought could not be updated.',
                error
            });
        }
    },
    async deleteThought(req, res) {
        const thought = await Thought.findByIdAndDelete(req.params.id);

        res.json({
            message: 'The Thought has been deleted'
        })
    },
    async createReaction(req, res) {
        const thought = await Thought.findById(req.params.thought_id);

        thought.reactions.push(req.body);
        await thought.save();

        res.json(thought)
    }
}