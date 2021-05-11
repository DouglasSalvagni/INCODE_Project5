const router = require('express').Router();
const connection = require('../../config/dbConnection');
const axios = require('axios').default;

router.get('/:tvShowId', (req,res) => {
    
    const { tvShowId } = req.params;

    const user = req.user ? true : false;

    axios.get('http://api.tvmaze.com/shows/' + tvShowId)
    .then((response) => response.data)
    .then((tvshow) => {

        let tvshowFormated = {
            tvshowID: tvshow.id,
            title: tvshow.name,
            img: tvshow.image.medium,
            totalScore: 0,
            totalVotes: 0
        }

        res.render('tvshow', {toast: false, tvshow: tvshowFormated, user: user});
    })
    .catch(error => {
        console.log(error)
        res.render('404', {toast: false})
    })
})

module.exports = router;