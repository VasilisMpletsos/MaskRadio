var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var hoursLabel = document.getElementById("hours");
var totalSeconds = 0;
setInterval(setTime, 1000);

async function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = await pad(totalSeconds % 60);
  minutesLabel.innerHTML = await pad(parseInt(totalSeconds / 60)%60);
  hoursLabel.innerHTML = await pad(parseInt(totalSeconds / 3600));
}

async function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return await ("0" + valString);
  } else {
    return await valString;
  }
}
