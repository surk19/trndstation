(function(){
var d=document,m=d.querySelector('.menu'),n=d.getElementById('nav');
if(m&&n){var set=function(o){m.setAttribute('aria-expanded',o);n.classList.toggle('open',o)};
 m.addEventListener('click',function(){set(m.getAttribute('aria-expanded')!=='true')});
 d.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});n.addEventListener('click',function(e){if(e.target.closest('a'))set(false)})}
var els=[].slice.call(d.querySelectorAll('.reveal'));
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.05});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add('in')});
var KEY='trnd-list',ZIP='trnd-zip',STORE='trnd-store';
function load(k){try{return localStorage.getItem(k)}catch(e){return null}}
function save(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var sel=[];try{sel=JSON.parse(load(KEY)||'[]')}catch(e){sel=[]}
var picks=[].slice.call(d.querySelectorAll('.pick')),chips=d.getElementById('chips'),empty=d.getElementById('empty'),send=d.getElementById('send'),clr=d.getElementById('clear'),store=d.getElementById('store'),zip=d.getElementById('zip'),dock=d.getElementById('dock'),dockn=d.getElementById('dockn'),dockgo=d.getElementById('dockgo'),picked=d.getElementById('picked');
if(store)store.value=load(STORE)||'';if(zip)zip.value=load(ZIP)||'';
function href(){var s=store?store.value:(load(STORE)||''),z=zip?zip.value:(load(ZIP)||'');
 var b='Hi TRND Station,\n\n'+(s?'Store: '+s+'\n':'')+(z?'Shipping ZIP: '+z+'\n':'')+(sel.length?'\nI am interested in:\n'+sel.map(function(x){return '- '+x}).join('\n')+'\n':'')+'\nPlease send availability and case details.\n\nThank you';
 return 'mailto:contact@trndstation.com?subject='+encodeURIComponent('TRND Station Wholesale Inquiry')+'&body='+encodeURIComponent(b)}
function render(){
 picks.forEach(function(p){var on=sel.indexOf(p.dataset.name)>-1;p.setAttribute('aria-pressed',on);p.querySelector('.sr').textContent=on?'Remove from list':'Add to list'});
 if(chips){chips.innerHTML='';sel.forEach(function(x){var li=d.createElement('li');li.textContent=x;chips.appendChild(li)})}
 if(empty)empty.hidden=sel.length>0;if(clr)clr.hidden=!sel.length;
 var h=href();if(send){send.href=h;send.textContent=sel.length?'Email this list ('+sel.length+')':(d.body.contains(chips)?'Email our team':send.textContent)}
 if(dock){dock.hidden=!sel.length;dockn.textContent=sel.length;dockgo.href=h}
 if(picked){picked.hidden=!sel.length;picked.textContent=sel.length?'Your list: '+sel.join(', ')+'. It will be included in the email.':''}
}
picks.forEach(function(p){p.addEventListener('click',function(){var i=sel.indexOf(p.dataset.name);if(i>-1)sel.splice(i,1);else sel.push(p.dataset.name);save(KEY,JSON.stringify(sel));render()})});
if(clr)clr.addEventListener('click',function(){sel=[];save(KEY,'[]');render()});
if(store)store.addEventListener('input',function(){save(STORE,store.value);render()});if(zip)zip.addEventListener('input',function(){save(ZIP,zip.value);render()});
render();
})();
