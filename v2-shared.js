// R&M Automobile — Shared V2 Site Behavior
// Lädt: Cookie-Banner, Lazy-Maps, Mobile-Menü-Toggle, Reveal-Observer, Lazy-Video,
// Nav-Scroll-Shadow, FAQ/Leistungen-Toggle, Email-Cloak.

(function(){
  'use strict';

  // Mobile Menu
  window.toggleMenu = function(){
    var m=document.getElementById('mob-menu'), b=document.getElementById('burger');
    if(!m||!b) return;
    if(m.classList.contains('open')){
      m.classList.remove('open');
      b.classList.remove('open');
      b.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    } else {
      m.classList.add('open');
      b.classList.add('open');
      b.setAttribute('aria-expanded','true');
      document.body.style.overflow='hidden';
    }
  };
  window.closeMenu = function(){
    var m=document.getElementById('mob-menu'), b=document.getElementById('burger');
    if(m) m.classList.remove('open');
    if(b){ b.classList.remove('open'); b.setAttribute('aria-expanded','false'); }
    document.body.style.overflow='';
  };

  // Cookie + Map Loading
  window.setCookie = function(v){
    localStorage.setItem('rm_cookies', v);
    var b=document.getElementById('cookie-banner');
    if(b) b.classList.remove('show');
    if(v==='accepted') window.loadMaps();
  };
  window.loadMaps = function(){
    document.querySelectorAll('[data-map-src]').forEach(function(el){
      var f=document.createElement('iframe');
      f.src=el.dataset.mapSrc;
      f.style.cssText='width:100%;height:100%;border:none;display:block;filter:grayscale(45%) contrast(1.05) brightness(.92)';
      f.allowFullscreen=true;
      f.loading='lazy';
      f.referrerPolicy='no-referrer-when-downgrade';
      el.replaceWith(f);
    });
  };

  // Generic Toggle (FAQ, Leistungen)
  window.toggleFaq = function(el){
    var open=el.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open');});
    if(!open) el.classList.add('open');
  };
  window.toggleLeist = function(el){
    var open=el.classList.contains('open');
    document.querySelectorAll('.leist-item').forEach(function(i){i.classList.remove('open');});
    if(!open) el.classList.add('open');
  };

  // Auf DOMContentLoaded: Init aller Komponenten
  document.addEventListener('DOMContentLoaded', function(){
    // Cookie-Banner anzeigen wenn keine Wahl getroffen
    var ck = localStorage.getItem('rm_cookies');
    if(!ck){
      setTimeout(function(){
        var b=document.getElementById('cookie-banner');
        if(b) b.classList.add('show');
      }, 900);
    } else if(ck==='accepted'){
      window.loadMaps();
    }

    // Email-Cloak (alle Elemente mit data-email-cloak="true")
    document.querySelectorAll('[data-email-cloak]').forEach(function(el){
      var u = el.dataset.emailUser || 'info';
      var d = el.dataset.emailDomain || 'rmauto-mobile.de';
      el.href = 'mai'+'lto:'+u+'@'+d;
    });

    // Reveal-Observer
    if('IntersectionObserver' in window){
      var ro = new IntersectionObserver(function(es){
        es.forEach(function(x){
          if(x.isIntersecting){
            x.target.classList.add('on');
            ro.unobserve(x.target);
          }
        });
      },{threshold:.06, rootMargin:'0px 0px -40px 0px'});
      document.querySelectorAll('.reveal').forEach(function(el){ ro.observe(el); });

      // Lazy-Video
      var vo = new IntersectionObserver(function(es){
        es.forEach(function(e){
          if(e.isIntersecting){
            var v = e.target;
            if(v.dataset.src && !v.src){
              v.src = v.dataset.src;
              v.load();
              var p = v.play();
              if(p && p.catch) p.catch(function(){});
            }
            vo.unobserve(v);
          }
        });
      },{threshold:.15, rootMargin:'200px 0px'});
      document.querySelectorAll('video.lazy-video').forEach(function(v){ vo.observe(v); });
    } else {
      // Fallback: alles direkt anzeigen
      document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('on'); });
      document.querySelectorAll('video.lazy-video').forEach(function(v){
        if(v.dataset.src) v.src = v.dataset.src;
      });
    }

    // Nav scroll-shadow
    var nav = document.getElementById('main-nav');
    if(nav){
      window.addEventListener('scroll', function(){
        nav.classList.toggle('scrolled', window.scrollY > 30);
      }, { passive: true });
    }
  });

  // Google Analytics nach window.load — niemals blocking
  window.addEventListener('load', function(){
    if(window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XDZRP2W3X9';
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XDZRP2W3X9', { 'send_page_view': true });
  });
})();
