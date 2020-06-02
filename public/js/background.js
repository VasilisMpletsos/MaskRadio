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
    back10: '67sVPjK6Q7I',
    back11: 'npPNgsWDCrc',
    back12: 'ysA6qL8j-OI',
    back13: '5J1bHRX1fNw',
    back14: 'G9vRDGA46FY',
    back15: 'J_F_003jcEQ',
    back16: 'bJlcz7DONyk',
    back17: 't_huLiSJMX8',
    back18: 'usmhPmT5sj0',
    back19: '023T4jyCRqA',
    back20: 'NaGoAsPP0wc',
    back21: 'd5SZqLkpIrY',
    back22: 'wB9WormrY1o',
    back23: 'BLZqzDZ02lI',
    back24: 'CT8NvobyYuk',
    back25: 'z4X3yABcf5g',
    back26: 'OA75EP70hPQ',
    back27: 'fQIgeD6UfBw',
    back28: 'tNUbMtM71Lk',
    back29: 'wzWgRXoyhT0',
    back30: 'xrzHZfJ7lxQ',
    back31: '2tX5Wgh5XIA',
    back32: 'OJYwC5JC7Bs',
    back33: 'k9uEJ3eke50',
    back34: 'uYewNGsTXPA',
    back35: 'nk6vQ7Ma-Kw',
    back36: 'vXjhyR_v0J4'
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
