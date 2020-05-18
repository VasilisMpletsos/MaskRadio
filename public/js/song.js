$('#songForm').submit(function (e) {
  e.preventDefault();

  //They need to be the whole object because else is just like assign them a string
  var song = document.getElementById('songField');
  var dedicate = document.getElementById('forField');

  if(dedicate.value == ""){
    dedicate.value = '-';
  }

  // Start the fading out of the previous songs
  var songsContainer = document.getElementById('songsContainer');
  songsContainer.innerHTML = '';
  songsContainer.style.opacity = 0;

  searchSong(song.value).then(songsData => {
      displaySongs(songsContainer, songsData);
  }); // .then(=> {sendToPlaylist})
});

function notifyUser(song, dedicate) {
  let add = document.getElementById('notify');
  let success = document.createElement('div');

  success.innerHTML = `<div class="alert alert-success"><b>
                       <span class="glyphicon glyphicon-ok"></span></b>
                       <strong> Success!</strong> The song <b>${song.value}</b> for <b>${dedicate.value} </b> has been sent.
                       </div>`;
  add.appendChild(success);
  setTimeout( () => {
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
    data: {song: song},
    success: songsData => {
      return songsData;
    }
  });
  console.log(songsData);
  return songsData;
}

function displaySongs(songsContainer, songsData) {
  songsContainer.style.opacity = 1;

  let rowHead = document.createElement('div');
  rowHead.setAttribute('class', 'row text-center');
  rowHead.setAttribute = ('style', 'font: 2vh bold');
  rowHead.innerHTML = `<h2>Suggest A Song</h2>`;
  songsContainer.appendChild(rowHead);

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
    row.addEventListener('click',()=>{
      document.getElementById('songField').value = song['title'];
      const input1 = document.getElementById('songField');
      const input2 = document.getElementById('forField');
      console.log(input1 + ' ' + input2);
      sendToPlaylist(input1.value, input2.value);
      notifyUser(input1, input2);
      songsContainer.style.opacity = 0;
      setTimeout(()=>{
        songsContainer.innerHTML = '';
      },1100)
    })
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
