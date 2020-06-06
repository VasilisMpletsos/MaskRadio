var songList = document.getElementById('songsList');
songList.innerHTML='';
let rowHead = document.createElement('div');
rowHead.setAttribute('class', 'row justify-content-center');
rowHead.innerHTML = `<h2>Requested Songs</h2>`;
songList.appendChild(rowHead);

async function getSongs() {
  return await $.ajax({
    method: "GET",
    url: '/admin/songs',
    success: (data) => {
      return data;
    }
  });
}

var previousSongs = [];

function displaySongs(songlist){
  getSongs().then((data)=>{
    if(previousSongs.length!==data.data.length){
      start = previousSongs.length;
      end = data.data.length;
      previousSongs = data.data;
      for(var i=start;i<end;i++){
        let row = document.createElement('div');
        row.setAttribute('class', 'row');
        row.setAttribute('id', 'parent');

        let songThumbnail = document.createElement('img');
        songThumbnail.setAttribute('class', 'col-xs-6 thumbnail');
        songThumbnail.setAttribute('src', data.data[i].thumbnail);
        row.appendChild(songThumbnail);

        let link = document.createElement('a');
        link.setAttribute('class', 'col-xs-8 vertical');
        link.setAttribute('href', `https://www.youtube.com/watch?v=${data.data[i].id}`);
        link.setAttribute('target', '_blank');
        row.appendChild(link);

        let songTitle = document.createElement('div');
        songTitle.setAttribute('class', 'songTitle');
        songTitle.innerText = data.data[i].title.substring(0,30) + ' | ' + data.data[i].dedicate;
        link.appendChild(songTitle);

        link.addEventListener('click', () => {
          songTitle.style.textDecoration = "line-through";
        })

        songlist.appendChild(row);
      };
    }
  }
  )
}

displaySongs(songList);
setInterval(displaySongs, 5000,songList);
