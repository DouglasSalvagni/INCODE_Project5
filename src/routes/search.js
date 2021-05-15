const router = require('express').Router()
const connection = require('../../config/dbConnection')
const axios = require('axios').default
const missingImage =
  'https://images.unsplash.com/photo-1542204637-e67bc7d41e48?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=denise-jans-WevidclYpdc-unsplash.jpg'

router.get('/', (req, res) => {
  const user = req.user ? req.user : false

  let searchQuery = req.query.search
  axios
    .get('http://api.tvmaze.com/search/shows?q=' + searchQuery)
    .then(response => response.data)
    .then(tvshows => {
      let tvshowsList = []
      let listLength = tvshows.length <= 20 ? tvshows.length : 20
      //Limit 20 tvshows
      for (let i = 0; i < listLength; i++) {
        let tvshowFormated = {
          tvshowID: tvshows[i].show.id,
          title: tvshows[i].show.name,
          img: tvshows[i].show.image
            ? tvshows[i].show.image.medium
            : missingImage,
          totalScore: 0,
          totalVotes: 0
        }
        tvshowsList.push(tvshowFormated)
      }

      connection.query('SELECT * FROM rating', (error, response) => {
        if (error) res.render('404', { toast: false })

        let ratingList = response

        for (let rI = 0; rI < ratingList.length; rI++) {
          for (let mI = 0; mI < tvshowsList.length; mI++) {
            if (ratingList[rI].tvshowID == tvshowsList[mI].tvshowID) {
              tvshowsList[mI].totalScore =
                tvshowsList[mI].totalScore + ratingList[rI].rating

              tvshowsList[mI].totalVotes = tvshowsList[mI].totalVotes + 1
            }
          }
        }

        res.render('home', { toast: false, tvshows: tvshowsList, user: user })
      })
    })
    .catch(error => {
      console.log(error)
      res.render('404', { toast: false })
    })
})

module.exports = router
