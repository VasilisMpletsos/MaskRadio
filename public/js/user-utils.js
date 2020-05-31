import User from '/js/user.js';

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
