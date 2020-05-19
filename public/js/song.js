/**
 * The submit function of the Search-song form.
 * Resets the UI of the song list, then searches on Youtube for the given query.
 * Displays the new song list. When the user clicks on a song,
 * it is added to the userPlaylist.
 */
$('#songForm').submit(e => {
  e.preventDefault();

  // Get the data from the form.
  var song = document.getElementById('songField');
  var dedicate = document.getElementById('forField');

  if(dedicate.value == ""){
    dedicate.value = '-';
  }

  var songlistContainer = resetSonglistContainer();

  searchSong(song.value).then(songsData => {
      displaySonglist(songlistContainer, songsData);
  }); // .then(=> {sendToPlaylist})
});


/**
 * Resets the user interface of the search song list. Firstly, starts the fading
 * and when the list has disappeared, it is emptied from content.
 * @returns {object} songlistContainer - The empty html element where the new
 * song list will be displayed.
 */
function resetSonglistContainer() {
  var songlistContainer = document.getElementById('songlistContainer');

  songlistContainer.style.opacity = 0;
  setTimeout(() => {
    songlistContainer.innerHTML = '';
  }, 1100)
  return songlistContainer;
}


/**
 * Requests from the server to search on youtube for a song.
 * @param {string} song - The title of the song to search as typed by the user.
 * @returns {array} songsData - Contains the id, title and thumbnail of the songs
 * that were returned from the search.
 */
async function searchSong(song) {
  return await $.ajax({
    method: "POST",
    url: '/maskRadio/search',
    data: {song: song},
    success: songsData => {
      return songsData;
    }
  });
}


/**
 * Displays the new song list. Each row contains the thumbnail and the
 * title of each song. When a song is clicked, it's id is sent to the server.
 * @param {object} songlistContainer - The html element where the song list
 * is displayed.
 * @param {array} songsData - Contains the id, title and thumbnail of the songs
 * to be displayed.
 */
function displaySonglist(songlistContainer, songsData) {

  songlistContainer.style.opacity = 1; // render the UI visible.

  // Create the title 'Suggest A Song' on the first row of the grid.
  let rowHead = document.createElement('div');
  rowHead.setAttribute('class', 'row text-center');
  rowHead.setAttribute = ('style', 'font: 2vh bold');
  rowHead.innerHTML = `<h2>Suggest A Song</h2>`;
  songlistContainer.appendChild(rowHead);

  songsData.forEach(song => {
    let row = document.createElement('div');
    row.setAttribute('id', `${song['id']}`);
    row.setAttribute('class', 'row');

    let songThumbnail = document.createElement('img');
    songThumbnail.setAttribute('class', 'col-xs-6 col-md-offset-1 thumbnail');
    songThumbnail.setAttribute('src', song['thumbnail']);
    row.appendChild(songThumbnail);

    let songTitle = document.createElement('div');
    songTitle.setAttribute('class', 'col-xs-8 vertical-align');
    songTitle.innerHTML = song['title'];
    row.appendChild(songTitle);
    songlistContainer.appendChild(row);

    row.addEventListener('click', () => {
      document.getElementById('songField').value = song['title'];
      const input1 = document.getElementById('songField');
      const input2 = document.getElementById('forField');
      console.log(input1 + ' ' + input2);
      sendToPlaylist(input1.value, input2.value);
      notifyUserDialog(input1, input2);
      resetSonglistContainer();
    })
  });
}


/**
 * Displays a short message, informing the user that the requested song has
 * been added to the userPlaylist. After 4 seconds, the message disappears.
 * @param {object} song - The form input parameter,the title of the song
 * @param {object} dedicate - The person to whom the song is dedicated to.
 */
function notifyUserDialog(song, dedicate) {
  let notifyDialog = document.getElementById('notify');
  let msgText = document.createElement('div');
  let fadeInMS = 4000;

  msgText.innerHTML = `<div class="alert alert-success"><b>
                       <span class="glyphicon glyphicon-ok"></span></b>
                       <strong> Success!</strong> The song <b>${song.value}</b> for <b>${dedicate.value} </b> has been sent.
                       </div>`;
  notifyDialog.appendChild(msgText);

  song.value='';
  dedicate.value='';

  setTimeout( () => {
      msgText.innerHTML = '';
      notifyDialog.appendChild(msgText);
    }, fadeInMS);
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
