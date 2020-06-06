module.exports = async ({content})=>{
  return `
  <!DOCTYPE html>
  <html>
      <head>
          <title>Sign Up Form - Mask Radio</title>
          <meta charset="utf-8">
          <link rel='icon' href='./images/favicon.png' type='image/png'/>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
          <link rel="stylesheet" type="text/css" href="css/styleSign.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
      </head>

      <body>
        <div class = "main">
          <div class = "wrapper">
            <center>
              <form name="signup" action="/signup" method="POST" class="signup">
                <u><h1>Sign up</h1></u>
                <div class="username">
                  <h2>Username</h2>
                  <input name="username" type="text" autocomplete="off" placeholder="Username"/><br>
                </div>
                <div class="password">
                  <h2>Password</h2>
                  <input name="password" type="password" autocomplete="off" placeholder="Password"/><br>
                </div>
                <div class="password">
                  <h2>Password Confirmation</h2>
                  <input name="pswdConfirm" type="password" autocomplete="off" placeholder="Type Password Again"/><br>
                </div>
                <div class="send">
                  <div class="row">
                    <div class="col-sm-6"><button class="general" type="submit"> Sign Up </button></div>
                    <div class="col-sm-6"><a href="/signin"><button type="button" name="signin" style="background-color: orange;"> Sign In </button></a></div>
                  </div>
                </div>
                <div class="center">
                  ${content}
                </div>
              </form>
              <br>
              <form>
                <div class="note">
                  <strong>Info!</strong> If you already have an account press Sign In.
                </div>
              </form>
            </center>
          </div>
        </div>
      </body>
  </html>
  `
}
