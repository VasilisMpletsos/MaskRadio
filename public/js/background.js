function randomImage(){
const background = {
    back1: 'RnCPiXixooY',
    back2: 'k0rVudBoB4c',
    back3: 'CuEvrPd3NYc',
    back4: 'Rz5o0osnN6Q',
    back5: 'kP1AxmCyEXM',
    back6: 'm_7p45JfXQo',
    back7: 'wKc-i5zwfok',
    back8: 'mPnxwQBtUZE',
    back9: 'mPnxwQBtUZE',
    back10: '67sVPjK6Q7I'
  }

  const length = Object.keys(background).length;
  const number = Math.floor((Math.random() * length + 1));
  const back = 'back' + number;
  return background[back];
}

//Choosing a random background
function getBackground(){
  const back = randomImage();
  document.body.style = `background-image: url("https://source.unsplash.com/${back}")`;
}

getBackground();
