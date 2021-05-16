const router = require('express').Router();
const connection = require('../../config/dbConnection');
const axios = require('axios').default;

router.get("/", (req, res) => {

    const user = req.user ? req.user : false;

    axios.get('http://api.tvmaze.com/shows')
    .then((response) => response.data)
    .then((tvshows) => {
        
        let tvshowsList = []

        //Limit 20 tvshows
        for(let i = 0; i < 20; i++) {
            let tvshowFormated = {
                tvshowID: tvshows[i].id,
                title: tvshows[i].name,
                img: tvshows[i].image.medium,
                totalScore: 0,
                totalVotes: 0
            }

            tvshowsList.push(tvshowFormated);

        }

        connection.query('SELECT * FROM rating', (error, response)=> {

            if(error) res.render('404', {toast: false});

            let ratingList = response;

            for(let rI = 0; rI < ratingList.length; rI++) {

                for(let mI = 0; mI < tvshowsList.length; mI++) {

                    if(ratingList[rI].tvshowID == tvshowsList[mI].tvshowID) {
                        tvshowsList[mI].totalScore = tvshowsList[mI].totalScore + ratingList[rI].rating;

                        tvshowsList[mI].totalVotes = tvshowsList[mI].totalVotes + 1;
                    }
    
                }

            }
            
            res.render('home', {toast: false, tvshows: tvshowsList, user: user});
            

        });



    })
    .catch(error => {
        console.log(error)
        res.render('404', {toast: false})
    })

    
});

module.exports = router;