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
    back13: 'vC8wj_Kphak',
    back14: '5J1bHRX1fNw',
    back15: 'G9vRDGA46FY',
    back16: 'J_F_003jcEQ',
    back17: 'bJlcz7DONyk',
    back18: 't_huLiSJMX8',
    back19: 'usmhPmT5sj0',
    back20: '023T4jyCRqA',
    back21: 'NaGoAsPP0wc',
    back22: 'd5SZqLkpIrY',
    back23: 't05kfHeygbE',
    back24: 'wB9WormrY1o',
    back25: 'BLZqzDZ02lI',
    back26: 'CT8NvobyYuk',
    back27: 'z4X3yABcf5g',
    back28: 'OA75EP70hPQ',
    back29: 'fQIgeD6UfBw',
    back30: '00yDgACVeMA',
    back31: 'bkAFib_51cE',
    back32: 'tNUbMtM71Lk',
    back33: 'wzWgRXoyhT0',
    back34: 'xrzHZfJ7lxQ',
    back35: '2tX5Wgh5XIA',
    back36: 'OJYwC5JC7Bs',
    back37: 'k9uEJ3eke50',
    back38: 'uYewNGsTXPA',
    back39: 'nk6vQ7Ma-Kw',
    back40: 'vXjhyR_v0J4'
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
