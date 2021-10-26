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

exports.findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ 'local.email': email });
    return user;
  } catch (e) {
    throw e;
  }
};
