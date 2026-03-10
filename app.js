document.addEventListener('DOMContentLoaded', () => {

  // ── Sidebar toggle ──
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar-toggle');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggle)
        sidebar.classList.remove('open');
    });
  }

  // ── Active nav ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html'))
      item.classList.add('active');
  });

  // ── Copy code ──
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-wrap')?.querySelector('pre');
      if (!pre) return;
      navigator.clipboard.writeText(pre.innerText).then(() => {
        btn.textContent = '✓ COPIED';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('copied'); }, 2000);
      });
    });
  });

  // ── Fade-in on scroll ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ── Performance bars ──
  const perfObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = (entry.target.dataset.width || 0) + '%';
        perfObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.perf-fill').forEach(el => perfObs.observe(el));

  // ── Card glow ──
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  // ── Quiz system ──
  document.querySelectorAll('.quiz-block').forEach(block => {
    const opts = block.querySelectorAll('.quiz-opt');
    const result = block.querySelector('.quiz-result');
    opts.forEach(opt => {
      opt.addEventListener('click', () => {
        if (opt.disabled) return;
        opts.forEach(o => o.disabled = true);
        const correct = opt.dataset.correct === 'true';
        opt.classList.add(correct ? 'correct' : 'wrong');
        if (!correct) {
          opts.forEach(o => { if (o.dataset.correct === 'true') o.classList.add('correct'); });
        }
        if (result) {
          result.textContent = correct ? '✓ Correct!' : '✗ Not quite — see highlighted answer.';
          result.className = 'quiz-result ' + (correct ? 'ok' : 'fail');
        }
        // Update score
        const scoreEl = block.closest('.quiz-section-wrap')?.querySelector('.quiz-score-val');
        if (scoreEl && correct) {
          scoreEl.textContent = parseInt(scoreEl.textContent || 0) + 1;
        }
      });
    });
  });

  // ── Interview accordion ──
  document.querySelectorAll('.interview-q').forEach(q => {
    q.addEventListener('click', () => {
      const block = q.closest('.interview-block');
      const isOpen = block.classList.contains('open');
      document.querySelectorAll('.interview-block.open').forEach(b => b.classList.remove('open'));
      if (!isOpen) block.classList.add('open');
    });
  });

  // ── Mermaid ──
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#00d4ff',
        primaryTextColor: '#f0f0f8',
        primaryBorderColor: 'rgba(0,212,255,0.4)',
        lineColor: 'rgba(0,212,255,0.4)',
        secondaryColor: '#0f0f18',
        tertiaryColor: '#0a0a10',
        background: '#050508',
        fontFamily: 'DM Mono, monospace',
        fontSize: '13px',
      },
      flowchart: { curve: 'basis', padding: 20 },
    });
  }

  // ── Page fade in ──
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});