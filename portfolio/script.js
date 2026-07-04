// ---------- scroll reveal ----------
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    els.forEach(el=>el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },{ threshold:0.16 });
  els.forEach(el=>io.observe(el));
})();

// ---------- hero typewriter ----------
(function(){
  const target = document.getElementById('typeTarget');
  if(!target) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    { html: '<span class="c1">// witaj, świecie</span>' },
    { html: '<span class="kw">const</span> <span class="pl">developer</span> = {' },
    { html: '&nbsp;&nbsp;<span class="pl">name:</span> <span class="st">"Patryk (Nex)"</span>,' },
    { html: '&nbsp;&nbsp;<span class="pl">role:</span> <span class="st">"Web Developer & Designer"</span>,' },
    { html: '&nbsp;&nbsp;<span class="pl">based_in:</span> <span class="st">"Polska"</span>,' },
    { html: '&nbsp;&nbsp;<span class="pl">focus:</span> <span class="fn">learn</span>(<span class="st">"HTML"</span>, <span class="st">"CSS"</span>, <span class="st">"JS"</span>)' },
    { html: '};' },
  ];

  if(prefersReduced){
    target.innerHTML = lines.map(l=>l.html).join('<br>');
    return;
  }

  let li = 0, ci = 0;
  const speed = 16;

  function typeLine(){
    if(li >= lines.length){
      target.insertAdjacentHTML('beforeend', '<span class="caret"></span>');
      return;
    }
    // build plain-text-with-tag-aware typing: reveal char by char but need to keep tags intact
    const full = lines[li].html;
    if(ci === 0 && li > 0){ target.insertAdjacentHTML('beforeend','<br>'); }

    // Type by revealing progressively larger substrings, but tags must stay whole.
    // Simplify: split into tokens where tags are atomic.
    if(!lines[li]._tokens){
      lines[li]._tokens = tokenize(full);
    }
    const tokens = lines[li]._tokens;
    if(ci < tokens.length){
      target.insertAdjacentHTML('beforeend', tokens[ci]);
      ci++;
      setTimeout(typeLine, speed + Math.random()*22);
    } else {
      li++; ci = 0;
      setTimeout(typeLine, 90);
    }
  }

  function tokenize(html){
    // split into: tags <...>, entities &...;, or single chars
    return html.match(/(<[^>]+>|&[a-z]+;|.)/gs) || [];
  }

  typeLine();
})();

// ---------- active tab underline on scroll spy (home page sections) not required, keep simple ----------
