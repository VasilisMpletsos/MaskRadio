$('#songForm').submit(function (e) {
  e.preventDefault();
  notifyUser();
  searchSong();
});

function notifyUser(){
  const song = document.getElementById('songField');
  const forLove = document.getElementById('forField');
  const add = document.getElementById('notify');
  const success = document.createElement('div');
  if(forLove.value == ""){
    forLove.value = '-';
  }
  success.innerHTML = `<div class="alert alert-success">
  <b><span class="glyphicon glyphicon-ok"></span></b><strong> Success!</strong> The song <b>${song.value}</b> for <b>${forLove.value} </b> has been sent.
  </div>`;
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

function searchSong() {
  const song = $('#songField').val();
  const dedicate = $('#forField').val();

  $.ajax({
    method: "POST",
    url: '/maskRadio/search',
    data: {song:song, dedicate: dedicate, listener: getCookie("username")},
    success: data => {
      console.log(`Success, data : ${data}`);
    }
  });
  return false;
}
