var k = 0;
var title = 'Mask_Radio!'; /* The text */
var speedTtitle = 100; /* The speed/duration of the effect in milliseconds */

function typeTitle(_callback) {
  if (k < title.length) {
    document.getElementById("titleName").innerText += title.charAt(k);
    k++;
    setTimeout(typeTitle, speedTtitle);
  }
}

async function waitTitle(){
  setTimeout(await typeTitle,1500);
}

waitTitle();
