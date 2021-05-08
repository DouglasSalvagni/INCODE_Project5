const router = require('express').Router();
const authTokens = require('../storedTokens');

router.get("/", (req, res) => {
    authTokens[req.cookies['AuthToken']] = "";
    res.redirect('/login');
});

module.exports = router;