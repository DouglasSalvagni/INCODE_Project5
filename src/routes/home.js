const router = require('express').Router();

router.get("/", (req, res) => {

    res.render('home', {toast: false});
    
});

module.exports = router;