const {userSchema} = require('../models/user');

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});