var w = window.innerWidth;
var h = window.innerHeight;

var section1 = document.getElementById('section1');
var section2 = document.getElementById('section2');
var section3 = document.getElementById('section3');

section1.style.height = `${h}px`;
section2.style.height = `${h}px`;
section3.style.height = `${h}px`;

var iframe = document.getElementById('frame');
iframe.style.height = `${h-(h/3)}px`;
iframe.style.width = `90%`;
