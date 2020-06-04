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
    songlistCounter.innerText = `${count.count}`;
  })
}

displayCountSongs(songlistCounter);
setInterval(displayCountSongs, 10000,songlistCounter);
