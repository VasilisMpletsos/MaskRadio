import User from '/js/user.js';

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

function countUser(){
  $.ajax({
    method: "POST",
    url: '/count',
    data: {parasite: getCookie("username")},
    success: function(){
      console.log('Success');
    }
  });
  return true;
}

countUser();

/**
 * Gets the data from the login form and sends it to the server for validation
 */
function loginUser(usr, psw) {
  $.ajax({
    method: "POST",
    url: '/maskRadio/login',
    data: {username: usr, password: psw},
  }).then(user => {
    let loggedInUser = new User(usr);
  }).catch(err => {console.log(err)});
}
