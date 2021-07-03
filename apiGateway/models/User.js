const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'], //validation message if it goes false
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'] //isEmail is inside Validator package.
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  role:{
    type: String,
    required: true
  }
});

//.post is used to run after 'save' event has occured
// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email }); //find email
  if (user) {
    const auth = await bcrypt.compare(password, user.password); //find password if user exists
    if (auth) {
      return user; //password is match
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const dataBase = mongoose.model('user', userSchema);

module.exports = dataBase;