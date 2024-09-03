const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(val) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
      }
    }
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});

userSchema.virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })

const User = model('User', userSchema);

module.exports = User;