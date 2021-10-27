const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const router = require('express').Router();
const { ensureIsAuthenticated } = require('../config/security.config');

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

router.use('/home', ensureIsAuthenticated, (req, res, next) => {
  res.render('content/home', { user: req.user, isAuthenticated: req.isAuthenticated() });
});

router.get('/', (req, res, next) => {
  res.redirect('/auth/signin/form');
});

router.get('*', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;
