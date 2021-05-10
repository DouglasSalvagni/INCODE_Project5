const router = require('express').Router();
const connection = require('../../config/dbConnection');
const axios = require('axios').default;

router.get("/", (req, res) => {

    const user = req.user ? true : false

    axios.get('https://yts.pm/api/v2/list_movies.json')
    .then((response) => {
        console.log(response)
        response.data.data.movies
    })
    .then((movies) => {
        
        let moviesList = []

        for(movie of movies) {
            let movieFormated = {
                movieID: movie.id,
                title: movie.title,
                img: movie.background_image_original,
                totalScore: null,
                totalVotes: 0
            }

            moviesList.push(movieFormated);

        }

        connection.query('SELECT * FROM rating', (error, response)=> {

            if(error) res.render('404', {toast: false});

            let ratingList = response;

            for(let rI = 0; rI < ratingList.length; rI++) {

                for(let mI = 0; mI < moviesList.length; mI++) {

                    if(ratingList[rI].movieID == moviesList[mI].movieID) {
                        moviesList[mI].totalScore = moviesList[mI].totalScore !== null ?
                            moviesList[mI].totalScore + ratingList[rI].rating
                            :
                            ratingList[rI].rating;

                        moviesList[mI].totalVotes = moviesList[mI].totalVotes + 1;
                    }
    
                }

            }
            
            res.render('home', {toast: false, movies: moviesList, user: user});
            

        })



    })
    .catch(error => {
        console.log(error)
        res.render('404', {toast: false})
    })

    
});

module.exports = router;