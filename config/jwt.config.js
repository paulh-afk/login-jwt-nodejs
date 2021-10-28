const secret = '47c5f5d2-1c55-4f0a-aeb5-9acc343b0abb';
const jwt = require('jsonwebtoken');
const { findUserById } = require('../queries/user.queries');
const { app } = require('../app');

const createJwtToken = ({ user = null, id = null }) => {
  const jwtToken = jwt.sign(
    { sub: id || user._id.toString(), exp: Math.floor(Date.now() / 1000) + 5 },
    secret,
  );
  return jwtToken;
};

const checkExpirationToken = (token, res) => {
  const tokenExp = token.exp;
  const nowInSec = Math.floor(Date.now() / 1000);

  if (nowInSec <= tokenExp) {
    return token;
  } else if (nowInSec > tokenExp && nowInSec - tokenExp < 60 * 60 * 24) {
    const refreshToken = createJwtToken({ id: token.sub });
    res.cookie('jwt', refreshToken);
    return jwt.verify(refreshToken, secret);
  } else {
    throw new Error('token expiré');
  }
};

const extractUserFromToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      let decodedToken = jwt.verify(token, secret, { ignoreExpiration: true });
      decodedToken = checkExpirationToken(decodedToken, res);
      const user = await findUserById(decodedToken.sub);
      if (user) {
        req.user = user;
        next();
      } else {
        res.clearCookie('jwt');
        res.redirect('/');
      }
    } catch (e) {
      console.log(e);
      res.clearCookie('jwt');
      res.redirect('/');
    }
  } else {
    next();
  }
};

const addJwtFeatures = (req, res, next) => {
  req.isAuthenticated = () => !!req.user;
  req.logout = () => res.clearCookie('jwt');
  req.login = (user) => {
    const token = createJwtToken({ user });
    res.cookie('jwt', token);
  };
  next();
};

app.use(extractUserFromToken);
app.use(addJwtFeatures);
