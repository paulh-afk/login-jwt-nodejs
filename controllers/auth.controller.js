const { findUserByEmail } = require('../queries/user.queries');

exports.signinForm = (req, res, next) => {
  res.render('content/signin');
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        console.log('connecté avec succès');
        res.render('content/home', { user });
      } else {
        res.render('content/signin', { error: 'Mot de passe incorrecte !' });
      }
    } else {
      res.render('content/signin', { error: 'Email non valide !' });
    }
  } catch (e) {
    next(e);
  }
};
