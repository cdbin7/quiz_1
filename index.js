const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true })); //*


app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res, next) => {
  const username = req.cookies.username || '';
  res.locals.username = username;
  next();
})

app.get('/', (req, res) => {
  res.redirect('/clucks')
})

app.get('/login', (req, res) => {
  res.render('clucks/login')
})

app.post('/login', (req, res) => {
  const username = req.body.username;
  res.cookie('username', username);
  res.redirect('/');
});

app.post('/loginHeader', (req, res) => {
  res.redirect('/login');
});

app.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/login');
});

app.post('/formPage', (req, res) => {
  res.redirect('/clucks/form')
})

const cluckRouter = require('./routes/clucks');
const { default: knex } = require('knex');
app.use('/clucks', cluckRouter)


const PORT = 2000;
const DOMAIN = 'localhost';

app.listen(PORT, DOMAIN, () => {
  console.log(`Server listening on http://${DOMAIN}:${PORT}`);
})

module.exports = app;