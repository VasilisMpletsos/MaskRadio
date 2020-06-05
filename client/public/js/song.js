/**
 * The submit function of the Search-song form.
 * Resets the UI of the song list, then searches on Youtube for the given query.
 * Displays the new song list. When the user clicks on a song,
 * it is added to the userPlaylist and the song list disappears.
 */
$('#songForm').submit(e => {
  e.preventDefault();

  // Get the data from the form.
  var song = document.getElementById('songField');
  var dedicate = document.getElementById('forField');

  if(dedicate.value == "") {
    dedicate.value = '-';
  }

  let songlistContainer = resetSonglistContainer(0);

  searchSong(song.value).then(songsData => {
    displaySonglist(songlistContainer, songsData);
  });
});


/**
 * Resets the user interface of the search song list. Firstly, starts the fading
 * and when the list has disappeared, it is emptied from content.
 * @param {int} deleteContentInMS - The seconds after which the contents of the
 * container will be deleted.
 * @returns {object} songlistContainer - The empty html element where the new
 * song list will be displayed.
 */
function resetSonglistContainer(deleteContentInMS) {
  var songlistContainer = document.getElementById('songlistContainer');

  songlistContainer.style.opacity = 0;
  setTimeout(() => {
    songlistContainer.innerHTML = '';
  }, deleteContentInMS)
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
  rowHead.setAttribute('class', 'row justify-content-center');
  rowHead.innerHTML = `<h2>Suggest A Song</h2>`;
  songlistContainer.appendChild(rowHead);

  songsData.forEach(song => {
    let row = document.createElement('div');
    row.setAttribute('id', `${song['id']}`);
    row.setAttribute('class', 'row');

    let songThumbnail = document.createElement('img');
    songThumbnail.setAttribute('class', 'col-xs-6 offset-sm-1 thumbnail');
    songThumbnail.setAttribute('src', song['thumbnail']);
    row.appendChild(songThumbnail);

    let songTitle = document.createElement('div');
    songTitle.setAttribute('class', 'col-xs-8 vertical-align');
    songTitle.innerText = song['title'].substring(0,45) + '...';
    row.appendChild(songTitle);
    songlistContainer.appendChild(row);

    row.addEventListener('click', () => {
      [songTyped, dedicate] = getFormAndReset();
      notifyUserDialog(song['title'], dedicate);
      addToPlaylist(song['id'], song['title'], song['thumbnail'], dedicate);
      resetSonglistContainer(1000);
    })
  });
}


/**
 * The function retrieves the form input values and then resets the form.
 * @returns {array} - Contains the typed song title and the dedication of the song.
 */
function getFormAndReset() {
  let songForm = document.getElementById('songField');
  let dedicateForm = document.getElementById('forField');
  songTyped = songForm.value;
  dedicate = dedicateForm.value;
  songForm.value='';
  dedicateForm.value='';
  return [songTyped, dedicate];
}


/**
 * Displays a short message, informing the user that the requested song has
 * been added to the userPlaylist. After 4 seconds, the message disappears.
 * @param {string} song - The form input field,the title of the song
 * @param {string} dedicate - The person to whom the song is dedicated to.
 */
function notifyUserDialog(song, dedicate) {
  let notifyDialog = document.getElementById('notify');
  let msgText = document.createElement('div');
  let fadeInMS = 5000;

  msgText.innerHTML = `<div class="alert alert-success text-center"><b>
                       <span class="glyphicon glyphicon-ok"></span></b>
                       <strong> Success!</strong> The song <b>${song}</b> for <b>${dedicate} </b> has been sent.
                       </div>`;
  notifyDialog.appendChild(msgText);

  setTimeout( () => {
      msgText.innerHTML = '';
    }, fadeInMS);
}

/**
 * Sends to the server the exact song that has to be added to the userPlaylist.
 * @param {string} songId - The unique identifier of the video.
 * @param {string} songTitle - The exact title of the song.
 * @param {string} dedicate - The person to whom the song is dedicated to.
 */
function addToPlaylist(songId, songTitle, thumbnail, dedicate) {
  $.ajax({
    method: "POST",
    url: '/maskRadio/addToPlaylist',
    data: {songId:songId, songTitle: songTitle, thumbnail: thumbnail, dedicate: dedicate},
    success: suc => {
      console.log(suc)
    }
  });
}
