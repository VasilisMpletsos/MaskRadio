function checkNavbar(){
  var w = window.innerWidth;
  if(w>720){
    var navbar = `
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Mask Radio</a>
        </div>
        <ul class="nav navbar-nav">
          <li><img width="50px" height="50px" src="images/signal.png"/></li>
          <li><a href="#section1"><span class="glyphicon glyphicon-home"></span> Home</a></li>
          <li><a href="#section2"><span class="glyphicon glyphicon-comment"></span> Chat</a></li>
          <li><a href="#section3"><span class="glyphicon glyphicon-share"></span> Send Song</a></li>
          <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-user"></span> Contributors<span class="caret"></span></a>
            <ul class="dropdown-menu contributors">
                <li><b><a href='https://github.com/VasilisMpletsos' target="_blank"><span class="glyphicon glyphicon-flash"></span> Vmpletsos</a></b></li>
                <li><b><a href='https://github.com/ZiposC' target="_blank"><span class="glyphicon glyphicon-flash"></span> ZiposC</a></b></li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a><span class="glyphicon glyphicon-time"></span> Timer</a></li>
          <li><a><b><span style="color: #d6b3d6;" id="hours">00</span>:<span id="minutes" style="color: #d6b3d6;">00</span>:<span id="seconds" style="color: #d6b3d6;">00</span></b></a></li>
        </ul>
      </div>`;

    var head = {
      type: 'nav',
      class: 'navbar-inverse navbar-fixed-top hidden-xs'
    }
  }else{
    var navbar = `
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">MaskRadio</a>
          <img width="50px" height="50px" src="images/signal.png"/></li>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav">
          <li><a href="#section1"><span class="glyphicon glyphicon-home"></span> Home</a></li>
          <li><a href="#section2"><span class="glyphicon glyphicon-comment"></span> Chat</a></li>
          <li><a href="#section3"><span class="glyphicon glyphicon-share"></span> Send Song</a></li>
          <li><a><span class="glyphicon glyphicon-time"></span> Timer:  <b><span style="color: #d6b3d6;" id="hours">00</span>:<span id="minutes" style="color: #d6b3d6;">00</span>:<span id="seconds" style="color: #d6b3d6;">00</span></b></a></li>
          <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-user"></span> Contributors<span class="caret"></span></a>
            <ul class="dropdown-menu">
                <li><b><a href='https://github.com/VasilisMpletsos' target="_blank"><span class="glyphicon glyphicon-flash"></span> Vmpletsos</a></b></li>
                <li><b><a href='https://github.com/ZiposC' target="_blank"><span class="glyphicon glyphicon-flash"></span> ZiposC</a></b></li>
            </ul>
          </li>
          </ul>
        </div>
      </div>
      `;

      var head = {
        type: 'nav',
        class: 'navbar navbar-inverse navbar-fixed-top'
      }
  }

  return {navbar,head};

}

function addNavbar(){
  const navbarContainer = document.getElementById('navbar');
  const {navbar,head} = checkNavbar();
  let add = document.getElementById('navbar');
  let row = document.createElement(head.type);
  row.setAttribute('class', head.class);
  row.innerHTML = navbar;
  navbarContainer.appendChild(row);
}

addNavbar();
