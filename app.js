const path = require('path');
const express = require('express');
require('./db');
const router = require('./routes');
const app = express();

exports.app = app;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(3000);
