var songlistCounter = document.getElementById('countSongs');

async function countSongs() {
  return await $.ajax({
    method: "POST",
    url: '/maskRadio/countSongs',
    success: (count) => {
      return count;
    }
  });
}

function displayCountSongs(songlistCounter){
  countSongs().then((count)=>{
    let countSong = count.count;
    if(countSong === 1){
      songlistCounter.innerText = `${countSong} Song Request`;
    }else if(countSong > 1){
      songlistCounter.innerText = `${countSong} Song Requests`;
    }
  })
}

displayCountSongs(songlistCounter);
setInterval(displayCountSongs, 10000,songlistCounter);
