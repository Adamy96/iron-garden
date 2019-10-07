const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('homepage');
});

router.get('/feed', (req, res, next) => {
  // res.send(req.user);
  res.render('feed');
})

module.exports = router;
