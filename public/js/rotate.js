var facebook = document.querySelector('.fa-facebook');
var instagram = document.querySelector('.fa-instagram');

facebook.addEventListener('mouseover',()=>{
  facebook.style.transform = "rotate(360deg)";
  setTimeout(function(){
    facebook.style = "";
  },2000)
})

instagram.addEventListener('mouseover',()=>{
  instagram.style.transform = "rotate(360deg)";
  setTimeout(function(){
    instagram.style = "";
  },2000)
})
