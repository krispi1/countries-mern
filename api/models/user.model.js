const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    notes: []
  }, 
  {
    timestamps: true
  }
);

/* 
UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();

  } catch(err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function(attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    next(err);
  }
}
*/

const User = mongoose.model('User', UserSchema);

module.exports = User;
