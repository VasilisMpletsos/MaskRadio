var songList = document.getElementById('songsList');

async function getSongs() {
  return await $.ajax({
    method: "GET",
    url: '/admin/songs',
    success: (data) => {
      return data;
    }
  });
}


function displaySongs(songlist){
  getSongs().then((data)=>{
    songlist.innerHTML='';
    let rowHead = document.createElement('div');
    rowHead.setAttribute('class', 'row justify-content-center');
    rowHead.innerHTML = `<h2>Requested Songs</h2>`;
    songlist.appendChild(rowHead);

    data.data.forEach((song) => {
      let row = document.createElement('div');
      row.setAttribute('class', 'row');
      row.setAttribute('id', 'parent');

      let songThumbnail = document.createElement('img');
      songThumbnail.setAttribute('class', 'col-xs-6 thumbnail');
      songThumbnail.setAttribute('src', song['thumbnail']);
      row.appendChild(songThumbnail);

      let link = document.createElement('a');
      link.setAttribute('class', 'col-xs-8 vertical');
      link.setAttribute('href', `https://www.youtube.com/watch?v=${song['id']}`);
      link.setAttribute('target', '_blank');
      row.appendChild(link);

      let songTitle = document.createElement('div');
      songTitle.setAttribute('class', 'songTitle');
      songTitle.innerText = song['title'].substring(0,30) + ' | ' + song['dedicate'];
      link.appendChild(songTitle);

      songlist.appendChild(row);
    });

  })
}

displaySongs(songList);
setInterval(displaySongs, 10000,songList);
