(function(){
var d=document,top=d.querySelector('.top'),m=d.querySelector('.menu'),n=d.getElementById('nav');
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(m&&n){var set=function(o){m.setAttribute('aria-expanded',o);n.classList.toggle('open',o)};
 m.addEventListener('click',function(){set(m.getAttribute('aria-expanded')!=='true')});
 d.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
 n.addEventListener('click',function(e){if(e.target.closest('a'))set(false)})}
var els=[].slice.call(d.querySelectorAll('.reveal'));
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.05});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});
var hero=d.getElementById('hero'),fls=[];
var mx=0,my=0,tick=false;
function frame(){tick=false;var y=scrollY;
 top&&top.classList.toggle('solid',y>40);
 if(hero&&y<innerHeight*1.2){fls.forEach(function(f,i){var k=(i+1)*.12;f.style.setProperty('--py',(-y*k+my*(i+1)*6)+'px');f.style.setProperty('--px',(mx*(i+1)*8)+'px')})}
}
function req(){if(!tick){tick=true;requestAnimationFrame(frame)}}
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);
if(!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches)addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;req()},{passive:true});
frame();
var rail=d.getElementById('rail');
if(rail){
 var all=[].slice.call(rail.children),N=all.length/5,cnt=d.querySelector('.count b'),timer;
 var step=function(){return all[1].offsetLeft-all[0].offsetLeft};
 var cur=function(){return Math.round((rail.scrollLeft+rail.clientWidth/2-all[0].offsetLeft-all[0].offsetWidth/2)/step())};
 var set=function(){return step()*N};
 var jump=function(dx){rail.style.scrollSnapType='none';rail.scrollLeft+=dx;requestAnimationFrame(function(){rail.style.scrollSnapType=''})};
 var center=function(i){rail.scrollLeft=all[i].offsetLeft-(rail.clientWidth-all[i].offsetWidth)/2};
 var norm=function(){var i=cur();if(i<N)jump(2*set());else if(i>=4*N)jump(-2*set())};
 center(2*N);
 rail.addEventListener('scroll',function(){var i=((cur()%N)+N)%N;if(cnt)cnt.textContent='0'+(i+1);clearTimeout(timer);timer=setTimeout(norm,140)},{passive:true});
 addEventListener('resize',function(){center(2*N+((cur()%N)+N)%N)});
 d.querySelector('.arrow.prev').addEventListener('click',function(){rail.scrollBy({left:-step(),behavior:reduce?'auto':'smooth'})});
 d.querySelector('.arrow.next').addEventListener('click',function(){rail.scrollBy({left:step(),behavior:reduce?'auto':'smooth'})});
 rail.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();rail.scrollBy({left:step(),behavior:'smooth'})}if(e.key==='ArrowLeft'){e.preventDefault();rail.scrollBy({left:-step(),behavior:'smooth'})}});
 var sx=0,sl=0,down=false,moved=false;
 rail.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=rail.scrollLeft;rail.setPointerCapture(e.pointerId)});
 rail.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4&&!moved){moved=true;rail.classList.add('drag')}if(moved)rail.scrollLeft=sl-dx});
 var up=function(){if(!down)return;down=false;if(moved){rail.classList.remove('drag');var i=cur();rail.scrollTo({left:all[i].offsetLeft-(rail.clientWidth-all[i].offsetWidth)/2,behavior:'smooth'})}};
 rail.addEventListener('pointerup',up);rail.addEventListener('pointercancel',up);
}
})();
