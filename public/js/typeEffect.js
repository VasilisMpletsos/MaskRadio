var i = 0;
var j = 0;
var ended = 'false';
var txt = 'Enter a song!'; /* The text */
var txt2 = 'Dedicate to someone?'; /* The text */
var speed = 65; /* The speed/duration of the effect in milliseconds */
var w = window.innerWidth;

async function typeSong(_callback) {
  if (i < txt.length) {
    document.getElementById("songField").placeholder += txt.charAt(i);
    i++;
    setTimeout(await typeSong, speed);
  }else{
    ended='true'
  }
}

async function typeFor() {
  if (j < txt2.length) {
    document.getElementById("forField").placeholder += txt2.charAt(j);
    j++;
    setTimeout(await typeFor, speed);
  }
}

async function runTyping(){
  await typeSong();
  async function wait(){
      if(ended==='false'){
        setTimeout(await wait, 100);
      }else{
        await typeFor();
      }
  }
  await wait();
}

async function waitPosition(){
  document.getElementById("section3").addEventListener("mouseover", await runTyping);
}

waitPosition();
