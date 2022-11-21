var el = document.querySelector('header'),
    sH = 300,
    sY = el.getBoundingClientRect().top+sH;
    
window.addEventListener('scroll', function(){
  if(this.scrollY >= sY && this.scrollY <= sY+sH) {
    el.style.transform = 'translateY(-'+(this.scrollY-sY)/sH*100+'%)';
  } else if(this.scrollY < sY) {
    el.style.transform = 'translateY(0%)';
  } else if(this.scrollY < this.scrollY <= sY+sH) {
    el.style.transform = 'translateY(-200%)';
  }
});