var i = 0;
var j = 0;
var txt = 'Enter a song you want to hear!'; /* The text */
var txt2 = 'Dedicate to someone?'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

function typeSong() {
  if (i < txt.length) {
    document.getElementById("songField").placeholder += txt.charAt(i);
    i++;
    setTimeout(typeSong, speed);
  }
}

function typeFor() {
  if (j < txt2.length) {
    document.getElementById("forField").placeholder += txt2.charAt(j);
    j++;
    setTimeout(typeFor, speed);
  }
}

typeSong();
typeFor();
