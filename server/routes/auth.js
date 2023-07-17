const express = require('express')
const router = express.Router();
const { signup, signin, signout } = require('../controllers/auth.controller');
const { isSignedIn } = require('../middlewares/auth');

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/signout', signout)

router.get('/test', isSignedIn, (req, res) => {
    res.json(req.user)
})

module.exports = router;