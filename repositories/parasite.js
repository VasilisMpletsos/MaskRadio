class ParasitesRepository{


  async parasiteRespond(parasite,count){
    return `<html>
        <head>
          <title>${parasite} Counts</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
          <link rel='icon' href='images/favicon.png' type='image/png'/>
          <link rel="stylesheet" type="text/css" href="css/style.css">
          <style>
          h1{
            background-color: #0043ff6b;
            padding: 50px;
            border-radius: 20px;
            font-size: 50px;
            color: yellow;
            backdrop-filter: blur(4px);
          }
          </style>
        </head>

        <body>
        <div class="center">
          <center>
            <h1><b>${parasite}</b> has sent </br><b>${count}</b> songs</b></h1>
          </center >
        </div>
        </body>
      </html>`
    }
}

module.exports = new ParasitesRepository();
