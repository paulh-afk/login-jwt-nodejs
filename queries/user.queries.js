const User = require('../db/models/user.model');

exports.createUser = async (user) => {
  try {
    const hashedPassword = await User.hashPassword(user.password);
    const newUser = await new User({
      username: user.username,
      local: { email: user.email, password: hashedPassword },
    });
    return newUser.save();
  } catch (e) {
    throw e;
  }
};

exports.findUserByEmail = (email) => {
  try {
    return User.findOne({ 'local.email': email }).exec();
  } catch (e) {
    throw e;
  }
};

exports.findUserById = (id) => {
  try {
    return User.findById(id).exec();
  } catch (e) {
    throw e;
  }
};
