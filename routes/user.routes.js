const router = require('express').Router();
const { userNew, userCreate } = require('../controllers/user.controller');

router.get('/signup/form', userNew);

router.post('/signup', userCreate);

module.exports = router;
