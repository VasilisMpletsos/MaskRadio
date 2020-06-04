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

var countPrevious = 0;

function displayCountSongs(songlistCounter){
  countSongs().then((count)=>{
    let countSong = count.count;
    if(countPrevious !== countSong){
      songlistCounter.style.opacity = 0;
      setTimeout(()=>{
        countPrevious = countSong;
        if(countSong === 1){
          songlistCounter.innerText = `${countSong} Song Request`;
        }else if(countSong > 1){
          songlistCounter.innerText = `${countSong} Song Requests`;
        }
        songlistCounter.style.opacity = 1;
      },1000)
    }
  })
}

displayCountSongs(songlistCounter);
setInterval(displayCountSongs, 10000,songlistCounter);
