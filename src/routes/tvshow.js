const router = require('express').Router();
const connection = require('../../config/dbConnection');
const { verifyToken } = require('../utils/crypto');
const createQuery = require('../utils/sqlPromise');
const axios = require('axios').default;

router.get('/:tvShowId', (req,res) => {
    
    const { tvShowId } = req.params;

    const user = req.user ? req.user : false;

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

        connection.query('SELECT * FROM rating', (error, response)=> {

            if(error) res.render('404', {toast: false});

            let ratingList = response;

            for(let rI = 0; rI < ratingList.length; rI++) {

                if(ratingList[rI].tvshowID == tvshowFormated.tvshowID) {
                    tvshowFormated.totalScore = tvshowFormated.totalScore + ratingList[rI].rating;

                    tvshowFormated.totalVotes = tvshowFormated.totalVotes + 1;
                }

            }

            res.render('tvshow', {message:"", toast: false, tvshow: tvshowFormated, user: user});
        });

    })
    .catch(error => {
        console.log(error)
        res.render('404', {toast: false})
    });
});

router.post('/:tvshowId',verifyToken, (req, res) => {

    const userId = req.user.ID;
    
    const tvshowId = req.params.tvshowId;

    const { rating } = req.body;

    const user = req.user ? req.user : false;

    axios.get('http://api.tvmaze.com/shows/' + tvshowId)
    .then((response) => response.data)
    .then( async (tvshow) => {
        
        let tvshowFormated = {
            tvshowID: tvshow.id,
            title: tvshow.name,
            img: tvshow.image.medium,
            totalScore: 0,
            totalVotes: 0
        }
        
        createQuery(connection,'SELECT * FROM rating WHERE tvshowID ='+tvshowId)
        .then((ratingList) => {

            // const ratingList = await connection.query('SELECT * FROM rating');
            if(!ratingList) return res.render('404', {toast: false});

            console.log(ratingList)

            let isFirstRating = true;
            
            for(let rI = 0; rI < ratingList.length; rI++) {
                
                if(ratingList[rI].userID == userId) {
                    isFirstRating = false;
                } 
                
                tvshowFormated.totalScore = tvshowFormated.totalScore + ratingList[rI].rating;

                tvshowFormated.totalVotes = tvshowFormated.totalVotes + 1;
            }

            if(isFirstRating) {

                tvshowFormated.totalScore = tvshowFormated.totalScore + rating;
                tvshowFormated.totalVotes = tvshowFormated.totalVotes + 1;

                const newRating = {
                    userID: userId,
                    tvshowID: tvshowId,
                    rating: rating
                }
                
                createQuery(connection,'INSERT INTO rating SET ?', newRating)
                .then((insertRating) => {

                    if(!insertRating) return res.render('404', {toast: false});
            
                    return res.render('tvshow', {message:"", toast: false, tvshow: tvshowFormated, user: user});
                });

            } else {

                return res.render('tvshow', {message:"You already have given a rating.", toast: true, tvshow: tvshowFormated, user: user});

            }

    
        })
        .catch(error => {
            console.log(error)
            res.render('404', {toast: false})
        });     

    })
    .catch(error => {
        console.log(error)
        res.render('404', {toast: false})
    });

});

module.exports = router;
