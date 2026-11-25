
(function(){
  var d=document,de=d.documentElement;
  de.className=de.className.replace('no-js','js');
  /* mobile drawer */
  var btn=d.getElementById('menu-btn'),drawer=d.getElementById('mob-drawer'),ov=d.getElementById('mob-overlay'),cl=d.getElementById('mob-close');
  function setMenu(open){
    if(!drawer)return;
    drawer.classList.toggle('open',open);ov.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
    drawer.setAttribute('aria-hidden',open?'false':'true');
    de.style.overflow=open?'hidden':'';
    if(open){cl.focus()}else{btn.focus({preventScroll:true})}
  }
  if(btn){
    btn.addEventListener('click',function(){setMenu(!drawer.classList.contains('open'))});
    cl.addEventListener('click',function(){setMenu(false)});
    ov.addEventListener('click',function(){setMenu(false)});
    drawer.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&drawer.classList.contains('open'))setMenu(false)});
    window.addEventListener('resize',function(){if(window.innerWidth>768&&drawer.classList.contains('open'))setMenu(false)});
  }
  /* faq accordion (max-height toggle) */
  var items=d.querySelectorAll('.faq-item');
  Array.prototype.forEach.call(items,function(it){
    var q=it.querySelector('.faq-q'),a=it.querySelector('.faq-a');
    if(!q||!a)return;
    q.addEventListener('click',function(){
      var open=it.classList.toggle('open');
      q.setAttribute('aria-expanded',open?'true':'false');
      a.style.maxHeight=open?a.scrollHeight+'px':'0px';
    });
  });
  window.addEventListener('resize',function(){
    Array.prototype.forEach.call(d.querySelectorAll('.faq-item.open .faq-a'),function(a){a.style.maxHeight=a.scrollHeight+'px'});
  });
  /* tabs */
  var tabs=d.querySelectorAll('[data-tabs]');
  Array.prototype.forEach.call(tabs,function(box){
    var btns=box.querySelectorAll('.tabbtn'),panels=box.querySelectorAll('.tabpanel');
    function show(id){
      Array.prototype.forEach.call(btns,function(b){
        var on=b.getAttribute('aria-controls')===id;
        b.classList.toggle('active',on);b.setAttribute('aria-selected',on?'true':'false');b.tabIndex=on?0:-1;
      });
      Array.prototype.forEach.call(panels,function(p){p.hidden=p.id!==id});
    }
    Array.prototype.forEach.call(btns,function(b,i){
      b.addEventListener('click',function(e){e.preventDefault();show(b.getAttribute('aria-controls'))});
      b.addEventListener('keydown',function(e){
        var n=-1;if(e.key==='ArrowRight')n=(i+1)%btns.length;if(e.key==='ArrowLeft')n=(i-1+btns.length)%btns.length;
        if(n>-1){e.preventDefault();btns[n].focus();show(btns[n].getAttribute('aria-controls'))}
      });
    });
    show(btns[0].getAttribute('aria-controls'));
  });
})();
