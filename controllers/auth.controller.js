const { findUserByEmail } = require('../queries/user.queries');

exports.signinForm = (req, res, next) => {
  res.render('content/signin', { error: null, isAuthenticated: req.isAuthenticated() });
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      const compare = await user.comparePassword(password);
      if (compare) {
        req.login(user);
        res.redirect('/home');
      } else {
        res.render('content/signin', {
          error: 'Mot de passe non valide !',
          isAuthenticated: req.isAuthenticated(),
        });
      }
    } else {
      res.render('content/signin', {
        error: 'Champs non valides !',
        isAuthenticated: req.isAuthenticated(),
      });
    }
  } catch (e) {
    next(e);
  }
};

exports.signout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};
