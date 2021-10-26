const router = require('express').Router();
const { signinForm, signin } = require('../controllers/auth.controller');

router.get('/signin/form', signinForm);

router.post('/signin', signin);

module.exports = router;
