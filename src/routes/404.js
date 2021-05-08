const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('404', {toast:false});
});

module.exports = router;