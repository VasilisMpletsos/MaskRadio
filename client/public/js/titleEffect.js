var k = 0;
var title = 'Mask_Radio!'; /* The text */
var speedTtitle = 300; /* The speed/duration of the effect in milliseconds */

function typeTitle(_callback) {
  if (k < title.length) {
    document.getElementById("titleName").innerText += title.charAt(k);
    k++;
    setTimeout(typeTitle, speedTtitle);
  }
}

function waitTitle(){
  setTimeout(typeTitle,1500);
}

waitTitle();
