const option = {
  animation: true,
  delay: 10000
}

function toasty () {
  const toastHTMLElement = document.getElementById('message')

  const toastElement = new bootstrap.Toast(toastHTMLElement, option)

  toastElement.show()
}

if (toast) {
  toasty()
}

var ajaxResult = []
var shows = []
var toast
var user

$(document).ready(function () {
  $('#go').click(function () {
    var data = {}
    data.search = $('#search').val()

    $.ajax({
      type: 'GET',
      url: '/search',
      data: data,
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        try {
          ajaxResult.push(data)
          toast = data.toast
          user = data.user
          shows = data.tvshows
          //update user
          var $user = $('<li class="nav-item status">')
          var isLoginUser = user ? '/logout' : '/login'
          $user.append(
            `<a class="nav-link active text-light" aria-current="page" href="<%= ${isLoginUser} ? "/logout" : "/login"%>">
            ${isLoginUser}</a>`
          )
          $('#status').html($user)
          //update shows
          var $tvshows = $(
            '<div class="row row-cols-1 row-cols-md-2 g-4" id="shows">'
          )
          shows.forEach(function (show) {
            var commScore =
              show.totalScore > 0
                ? (show.totalScore / show.totalVotes).toFixed(1)
                : 0
            $tvshows.append(`   
              <div class="col">
              <div class="card">
              <img src="${show.img}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">
                    <a href="/tvshow/${show.tvshowID} ">${show.title}</a>
                </h5>
                <h5 class="card-title text-secondary">
                    Community score: ${commScore}
                </h5>
                <h5 class="card-title text-secondary">
                    Total vote:${show.totalVotes}
                </h5>
                
              </div>
            </div> `)
          })
          $('#showsContainer').html($tvshows)
        } catch (e) {
          alert(e)
        }
      },
      error: function (xhr, status, error) {
        alert(xhr.responseText)
      }
    }).done(function () {
      console.log('OK')
    })
  })
})

$('#updateDay').click(function (e) {
  e.preventDefault()
  updateDom($(e.currentTarget).attr('href'))
})

$('#updateWeek').click(function (e) {
  e.preventDefault()
  updateDom($(e.currentTarget).attr('href'))
})

$('#updateMonth').click(function (e) {
  e.preventDefault()
  updateDom($(e.currentTarget).attr('href'))
})

function updateDom (urlClicked) {
  $.ajax({
    type: 'GET',
    url: urlClicked,
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      try {
        ajaxResult.push(data)
        toast = data.toast
        user = data.user
        shows = data.tvshows
        //update user
        var $user = $('<li class="nav-item status">')
        var isLoginUser = user ? '/logout' : '/login'
        $user.append(
          `<a class="nav-link active text-light" aria-current="page" href="<%= user ? "/logout" : "/login"%>">
              ${isLoginUser}</a>`
        )
        $('#status').html($user)
        //update shows
        var $tvshows = $(
          '<div class="row row-cols-1 row-cols-md-2 g-4" id="shows">'
        )
        shows.forEach(function (show) {
          var commScore =
            show.totalScore > 0
              ? (show.totalScore / show.totalVotes).toFixed(1)
              : 0
          $tvshows.append(`   
                <div class="col">
                <div class="card">
                <img src="${show.img}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">
                      <a href="/tvshow/${show.tvshowID} ">${show.title}</a>
                  </h5>
                  <h5 class="card-title text-secondary">
                      Community score: ${commScore}
                  </h5>
                  <h5 class="card-title text-secondary">
                      Total vote:${show.totalVotes}
                  </h5>
                  
                </div>
              </div> `)
        })
        $('#showsContainer').html($tvshows)
      } catch (e) {
        alert(e)
      }
    },
    error: function (xhr, status, error) {
      alert(xhr.responseText)
    }
  }).done(function () {
    console.log('OK')
  })
}
