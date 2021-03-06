module.exports = async ({content})=>{
  return `
  <!DOCTYPE html>
  <html>
      <head>
          <title>Sign In Form - Mask Radio</title>
          <meta charset="utf-8">
          <link rel='icon' href='./images/favicon.png' type='image/png'/>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
          <link rel="stylesheet" type="text/css" href="css/styleSign.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      </head>

      <body>
        <div class = "main">
          <div class = "wrapper">
            <center>
              <form name="signin" action="/signin" method="POST" class="signup">
                <u><h1>Sign In</h1></u>
                <div class="username">
                  <h2>Username</h2>
                  <input name="username" type="text" autocomplete="off" placeholder="Username"/><br>
                </div>
                <div class="password">
                  <h2>Password</h2>
                  <input name="password" type="password" autocomplete="off" placeholder="Password"/><br>
                </div>
                <div class="send">
                  <div class="row">
                    <div class="col-sm-6"><button class="general" type="submit"> Sign In </button></div>
                    <div class="col-sm-6"><a href="/signup"><button class="general" type="button" name="signup" style="background-color: orange;"> Sign Up </button></a></div>
                  </div>
                </div>
                <div class="center">
                  ${content}
                </div>
              </form>
              <br>
              <form>
                <div class="note">
                  <strong>Info!</strong> If you don't have an account press Sign Up.
                </div>
              </form>
            </center>
          </div>
        </div>
      </body>
  </html>
  `
}
