$('#songForm').submit(function (e) {
  e.preventDefault();
  addNotify();
  postToSite();
});

$('#songFormXs').submit(function (e) {
  e.preventDefault();
  addNotify();
  postToSite();
});

function addNotify(){
  var w = window.innerWidth;
  if (w>728){
    var song = document.getElementById('songField');
    var forLove = document.getElementById('forField');
    console.log(`Bigger than XS = ${w}`);
  }else{
    var song = document.getElementById('songFieldXs');
    var forLove = document.getElementById('forFieldXs');
    console.log(`Smaller than XS = ${w}`);
  }
  const add = document.getElementById('notify');
  const success = document.createElement('div');
  if(forLove.value == ""){
    forLove.value = '-';
  }
  success.innerHTML = `<div class="alert alert-success">
  <center><b><span class="glyphicon glyphicon-ok"></span></b><strong> Success!</strong> The song <b>${song.value}</b> for <b>${forLove.value} </b> has been sent.
  </center></div>`;
  add.appendChild(success);
  setTimeout(function(){
        success.innerHTML = '';
      add.appendChild(success);
      song.value='';
      forLove.value='';
    }, 4000);
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function postToSite() {
  var w2 = window.innerWidth;
  if (w2>728){
    var song2 = document.getElementById('songField').value;
    var dedicate = document.getElementById('forField').value;
  }else{
    var song2 = document.getElementById('songFieldXs').value;
    var dedicate = document.getElementById('forFieldXs').value;
  }
  console.log('Dedicating Song');
  console.log(song2,dedicate);
  $.ajax({
    method: "POST",
    url: '/maskRadio',
    data: {song:song2, dedicate: dedicate, listener: getCookie("username")},
    success: function(){
      console.log('Success');
    }
  });
  return false;
}
