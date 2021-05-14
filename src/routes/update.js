const router = require('express').Router()
const connection = require('../../config/dbConnection')
const util = require('../utils/utils')
const axios = require('axios').default
const missingImage =
  'https://images.unsplash.com/photo-1542204637-e67bc7d41e48?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=denise-jans-WevidclYpdc-unsplash.jpg'

router.get('/day', showUpdates)
router.get('/week', showUpdates)
router.get('/month', showUpdates)

function showUpdates (req, res, param) {
  const user = req.user ? true : false
  const url = req.url
  let searchQuery = url.replace(/^\/+/g, '')
  console.log(searchQuery)
  let listLength = 20
  axios
    .get('http://api.tvmaze.com/updates/shows?since=' + searchQuery)
    .then(function (response) {
      var idList = Object.keys(response.data)
      let promises = []
      let tvshowsList = []
      for (let i = 0; i < listLength; i++) {
        promises.push(
          axios
            .get('http://api.tvmaze.com/shows/' + idList[i])
            .then(({ data }) => data)
        )
      }
      return axios.all(promises).then(values => {
        for (let i = 0; i < listLength; i++) {
          let tvshowFormated = {
            tvshowID: values[i].id,
            title: values[i].name,
            img: values[i].image ? values[i].image.medium : missingImage,
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
    })
    .catch(function (error) {
      res.send('There was an issue with your request.')
      console.log(error)
    })
}

module.exports = router
