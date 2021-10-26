const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const router = require('express').Router();

router.use('/user', userRoutes);

router.use('/auth', authRoutes);

router.get('/', (req, res, next) => {
  res.redirect('/auth/signin/form');
});

router.get('*', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;
