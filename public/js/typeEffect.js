var i = 0;
var j = 0;
var ended = 'false';
var txt = 'Enter a song you want to hear!'; /* The text */
var txt2 = 'Dedicate to someone?'; /* The text */
var speed = 65; /* The speed/duration of the effect in milliseconds */

function typeSong(_callback) {
  if (i < txt.length) {
    document.getElementById("songField").placeholder += txt.charAt(i);
    i++;
    setTimeout(typeSong, speed);
  }else{
    ended='true'
  }
}

function typeFor() {
  if (j < txt2.length) {
    document.getElementById("forField").placeholder += txt2.charAt(j);
    j++;
    setTimeout(typeFor, speed);
  }
}

function runTyping(){
  typeSong();
  function wait(){
      if(ended==='false'){
        setTimeout(wait, 100);
        console.log('Waiting')
      }else{
        typeFor();
      }
  }
  wait();
}

function waitPosition(){
  document.getElementById("section3").addEventListener("mouseover", runTyping);
}

waitPosition();
