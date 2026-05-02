/* R&M Automobile — Back-to-Top Button (universal) */
(function(){
  if(document.getElementById('rm-btt'))return;
  var css='#rm-btt{position:fixed;right:20px;bottom:20px;width:44px;height:44px;border-radius:50%;background:rgba(22,22,20,.78);border:1px solid rgba(232,227,216,.18);color:#e8e3d8;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;pointer-events:none;transform:translateY(8px);transition:opacity .35s cubic-bezier(.22,1,.36,1),transform .35s cubic-bezier(.22,1,.36,1),background .25s,border-color .25s;backdrop-filter:blur(12px);z-index:200;padding:0}#rm-btt.show{opacity:1;pointer-events:auto;transform:none}#rm-btt:hover{background:rgba(111,207,151,.14);border-color:rgba(111,207,151,.35);color:#6fcf97}#rm-btt:focus-visible{outline:2px solid #6fcf97;outline-offset:3px}@media(max-width:768px){#rm-btt{right:16px;bottom:84px;width:42px;height:42px}}@media(prefers-reduced-motion:reduce){#rm-btt{transition:opacity .01ms,transform .01ms}}';
  var s=document.createElement('style');s.textContent=css;document.head.appendChild(s);
  var b=document.createElement('button');b.id='rm-btt';b.type='button';b.setAttribute('aria-label','Nach oben scrollen');
  b.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
  b.addEventListener('click',function(){
    var smooth=!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({top:0,behavior:smooth?'smooth':'auto'});
  });
  document.body.appendChild(b);
  var ticking=false;
  function update(){
    var y=window.scrollY||document.documentElement.scrollTop||0;
    if(y>320)b.classList.add('show');else b.classList.remove('show');
    ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){window.requestAnimationFrame(update);ticking=true;}},{passive:true});
  update();
})();
