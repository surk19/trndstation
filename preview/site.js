(function(){
var m=document.querySelector('.menu'),n=document.getElementById('nav');
if(m&&n){
 var set=function(o){m.setAttribute('aria-expanded',o);n.classList.toggle('open',o)};
 m.addEventListener('click',function(){set(m.getAttribute('aria-expanded')!=='true')});
 document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
 n.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
}
var els=[].slice.call(document.querySelectorAll('.reveal'));
if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.05});
els.forEach(function(e){io.observe(e)});
})();
