const express = require('express');
const knex = require('../db/client');
const router = express.Router();

// router.post('/formPage', (req, res) => {
//   res.redirect('/form')
// })

router.get('/', (req, res) => {
  const currentDate = new Date()
  
  knex("clucks")
  .orderBy('created_at', 'desc')
  .then(data => {
    console.log(data);
    for (let i = 0; i < data.length; i++){
      const postDate = new Date(data[i].created_at)
      let nowTime = (currentDate.getTime() - postDate.getTime()) / 1000
      if(nowTime < 60) {
        data[i].created_at= "just now"
      } else if(nowTime >=60 && nowTime < 3600) {
        data[i].created_at=`${parseInt(nowTime/60)} minutes ago`
      } else if(nowTime >=3600 && nowTime < 86400){
        data[i].created_at=`${parseInt(nowTime/3600)} hours ago`
      } else if(nowTime >=86400 && nowTime < 2592000){
        data[i].created_at=`${parseInt(nowTime/86400)} days ago`
      }
    }
    res.render('clucks/index', {lists:data})
  })
})

router.post('/index', (req, res) => {
  res.redirect('/clucks')
})

router.get('/form', (req, res) => {
  res.render('clucks/form')
})

router.post('/form', (req, res) => {
  const username = req.cookies.username;
  console.log(req.cookies.username);
  if (username) {
    knex("clucks")
    .insert({
      username : username,
      content: req.body.content,
      image_url: req.body.image_url
    })
    .returning('*')
    .then(data => {
      res.redirect('/clucks')
    })
  } else {
    res.redirect('/login')
  }
})






module.exports = router;