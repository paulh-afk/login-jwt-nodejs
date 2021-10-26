const { createUser } = require('../queries/user.queries');
const { findUserByEmail } = require('../queries/user.queries');

exports.userNew = (req, res, next) => {
  res.render('content/signup', { error: null });
};

exports.userCreate = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await createUser(body);
    res.status(200).render('content/home', { user });
  } catch (e) {
    const user = await findUserByEmail(body.email);
    if (user) {
      res.render('content/signup', { error: 'Un compte à déjà cette adresse mail !' });
    } else {
      res.render('content/signup', { error: 'Certains champs ne sont pas valides !' });
    }
  }
};
