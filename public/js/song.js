$('#songForm').submit(function (e) {
  e.preventDefault();
  const song = $('#songField').val();
  const dedicate = $('#forField').val();

  notifyUser(song, dedicate);

  // Start the fading out of the previous songs
  document.getElementById('songsContainer').style.opacity = 0;

  searchSong(song).then(songsData => {
      displaySongs(songsData);
  });
  sendToPlaylist(song, dedicate);
});

function notifyUser(song, dedicate){
  const add = document.getElementById('notify');
  const success = document.createElement('div');
  if(dedicate.value == ""){
    dedicate.value = '-';
  }
  success.innerHTML = `<div class="alert alert-success">
  <b><span class="glyphicon glyphicon-ok"></span></b><strong> Success!</strong> The song <b>${song}</b> for <b>${dedicate} </b> has been sent.
  </div>`;
  add.appendChild(success);
  setTimeout(function(){
        success.innerHTML = '';
      add.appendChild(success);
      song.value='';
      dedicate.value='';
    }, 4000);
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function searchSong(song) {

  let songsData = await $.ajax({
    method: "POST",
    url: '/maskRadio/search',
    data: {song:song},
    success: songsData => {
      return songsData;
    }
  });

  return songsData;
}

function displaySongs(songsData) {
  let songsContainer = document.getElementById('songsContainer');
  songsContainer.style.opacity = 1;

  let row = document.createElement('div');
  row.setAttribute('class', 'row text-center');
  row.setAttribute = ('style', 'font: 1vh bold');
  row.innerHTML = `Suggest A Song`;
  songsContainer.appendChild(row)

  songsData.forEach(song => {
    // Create the grid for the songs
    let row = document.createElement('div');
    row.setAttribute('class', 'row');

    let songThumbnail = document.createElement('img');
    songThumbnail.setAttribute('class', 'col-xs-6 col-md-offset-1 thumbnail');
    songThumbnail.setAttribute('src', song['thumbnail']);
    row.appendChild(songThumbnail);

    let songTitle = document.createElement('div');
    songTitle.setAttribute('class', 'col-xs-8 vertical-align');
    songTitle.innerHTML = song['title'];
    row.appendChild(songTitle);

    songsContainer.appendChild(row);

  });

}

function sendToPlaylist(song, dedicate) {
  $.ajax({
    method: "POST",
    url: '/maskRadio/addToPlaylist',
    data: {song:song, dedicate: dedicate, listener: getCookie("username")},
    success: suc => {
      console.log(suc)
    }
  });
}
