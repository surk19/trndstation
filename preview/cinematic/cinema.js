(function(){
var d=document,top=d.querySelector('.top'),m=d.querySelector('.menu'),n=d.getElementById('nav');
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(m&&n){var set=function(o){m.setAttribute('aria-expanded',o);n.classList.toggle('open',o)};
 m.addEventListener('click',function(){set(m.getAttribute('aria-expanded')!=='true')});
 d.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
 n.addEventListener('click',function(e){if(e.target.closest('a'))set(false)})}
var els=[].slice.call(d.querySelectorAll('.reveal'));
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.05});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});
var reel=d.getElementById('reel'),slides=reel?[].slice.call(reel.querySelectorAll('.slide')):[],cnt=reel&&reel.querySelector('.count b'),bar=reel&&reel.querySelector('.progress i');
var hero=d.getElementById('hero'),fls=hero?[].slice.call(hero.querySelectorAll('.fl')):[];
var mx=0,my=0,tick=false;
function frame(){tick=false;var y=scrollY;
 top&&top.classList.toggle('solid',y>40);
 if(hero&&y<innerHeight*1.2){fls.forEach(function(f,i){var k=(i+1)*.12;f.style.setProperty('--py',(-y*k+my*(i+1)*6)+'px');f.style.setProperty('--px',(mx*(i+1)*8)+'px')})}
 if(reel&&!reduce){var r=reel.getBoundingClientRect(),span=reel.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.top/span)),N=slides.length,f=p*N,idx=Math.min(N-1,Math.floor(f)),loc=f-idx;
  slides.forEach(function(s,i){s.classList.toggle('on',i===idx);s.classList.toggle('past',i<idx);if(i===idx){var im=s.querySelector('img');im&&im.style.setProperty('--s',(1+.1*loc).toFixed(3))}});
  if(cnt)cnt.textContent='0'+(idx+1);if(bar)bar.style.setProperty('--p',p.toFixed(3))}}
function req(){if(!tick){tick=true;requestAnimationFrame(frame)}}
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);
if(!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches)addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;req()},{passive:true});
frame();
})();
