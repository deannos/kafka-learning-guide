document.addEventListener('DOMContentLoaded', () => {

  // ── Search modal (Cmd+K / Ctrl+K) ──
  if (window.SEARCH_INDEX) {
    // Build modal DOM first so helpers can reference overlay/input/results
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Search');
    overlay.innerHTML = `
      <div class="search-box">
        <div class="search-input-wrap">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="search-input" type="text" placeholder="Search topics, commands, concepts…" autocomplete="off" spellcheck="false">
          <kbd class="search-esc-hint">ESC</kbd>
        </div>
        <ul class="search-results" role="listbox"></ul>
        <div class="search-footer">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>ESC</kbd> close</span>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('.search-input');
    const results = overlay.querySelector('.search-results');
    let activeIdx = -1;

    // Define helpers before any event listeners reference them
    const openSearch = () => {
      overlay.classList.add('active');
      input.value = '';
      results.innerHTML = '';
      activeIdx = -1;
      setTimeout(() => input.focus(), 50);
    };
    const closeSearch = () => overlay.classList.remove('active');
    const setActive = (idx) => {
      const items = results.querySelectorAll('.search-item');
      items.forEach(el => el.classList.remove('active'));
      if (idx >= 0 && idx < items.length) {
        activeIdx = idx;
        items[idx].classList.add('active');
        items[idx].scrollIntoView({ block: 'nearest' });
      }
    };
    const renderResults = (query) => {
      const q = query.trim().toLowerCase();
      results.innerHTML = '';
      activeIdx = -1;
      if (!q) return;

      const matches = window.SEARCH_INDEX.filter(item =>
        (item.section + ' ' + item.excerpt + ' ' + item.pageTitle).toLowerCase().includes(q)
      ).slice(0, 8);

      if (!matches.length) {
        results.innerHTML = '<li class="search-empty">No results for "' + query + '"</li>';
        return;
      }
      matches.forEach((item, i) => {
        const li = document.createElement('li');
        li.className = 'search-item';
        li.setAttribute('role', 'option');
        li.innerHTML = `<span class="search-item-page">${item.pageTitle}</span><span class="search-item-section">${item.section}</span><span class="search-item-excerpt">${item.excerpt}</span>`;
        li.addEventListener('click', () => { window.location.href = item.page; });
        li.addEventListener('mouseenter', () => setActive(i));
        results.appendChild(li);
      });
    };

    // Now safe to attach listeners — all helpers are defined above
    input.addEventListener('input', () => renderResults(input.value));
    input.addEventListener('keydown', (e) => {
      const items = results.querySelectorAll('.search-item');
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIdx + 1, items.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
      else if (e.key === 'Enter' && activeIdx >= 0) {
        const href = window.SEARCH_INDEX.filter(item =>
          (item.section + ' ' + item.excerpt + ' ' + item.pageTitle).toLowerCase().includes(input.value.trim().toLowerCase())
        )[activeIdx]?.page;
        if (href) window.location.href = href;
      }
      else if (e.key === 'Escape') closeSearch();
    });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); overlay.classList.contains('active') ? closeSearch() : openSearch(); }
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeSearch();
    });

    // Inject search trigger into header — after helpers are defined
    const headerRight = document.querySelector('.header-right');
    if (headerRight) {
      const hint = document.createElement('button');
      hint.className = 'search-trigger';
      hint.setAttribute('aria-label', 'Open search');
      hint.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> <span class="search-trigger-text">Search</span> <kbd>⌘K</kbd>';
      headerRight.prepend(hint);
      hint.addEventListener('click', openSearch);
    }
  }

  // ── Sidebar toggle + backdrop ──
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar-toggle');

  const backdrop = document.createElement('div');
  backdrop.className = 'sidebar-backdrop';
  document.body.appendChild(backdrop);

  function openSidebar() {
    sidebar.classList.add('open');
    backdrop.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && sidebar) {
    toggle.setAttribute('aria-label', 'Toggle navigation');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'sidebar');
    sidebar.id = 'sidebar';

    toggle.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    backdrop.addEventListener('click', closeSidebar);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
    });
  }

  // ── Active nav ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
    }
    // Hide emoji from screen readers
    const icon = item.querySelector('.nav-icon');
    if (icon) icon.setAttribute('aria-hidden', 'true');
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

  // ── Card glow spotlight ──
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
        // Update score counter
        const scoreEl = block.closest('.quiz-section-wrap')?.querySelector('.quiz-score-val');
        if (scoreEl && correct) {
          scoreEl.textContent = parseInt(scoreEl.textContent || 0) + 1;
        }
      });
    });
  });

  // ── Interview accordion — keyboard accessible ──
  document.querySelectorAll('.interview-q').forEach(q => {
    q.setAttribute('tabindex', '0');
    q.setAttribute('role', 'button');
    q.addEventListener('click', () => {
      const block = q.closest('.interview-block');
      const isOpen = block.classList.contains('open');
      document.querySelectorAll('.interview-block.open').forEach(b => {
        b.classList.remove('open');
        b.querySelector('.interview-q')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        block.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      } else {
        q.setAttribute('aria-expanded', 'false');
      }
    });
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); q.click(); }
    });
    q.setAttribute('aria-expanded', 'false');
  });

  // ── Mermaid — apply theme before rendering ──
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: false,
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
    mermaid.run();
  }

  // ── Theme toggle ──
  const root = document.documentElement;
  const toggleBtns = document.querySelectorAll('.theme-toggle');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('kguide-theme', next);
    });
  });

  // ── Auto Table of Contents ──
  // Inject a TOC for any inner page with 3+ h2 headings
  const pageContent = document.querySelector('.page-content');
  const headings = pageContent ? Array.from(pageContent.querySelectorAll('h2')) : [];
  if (headings.length >= 2) {
    // Assign IDs to headings that lack them
    headings.forEach((h, i) => {
      if (!h.id) h.id = 'section-' + i;
    });

    const toc = document.createElement('nav');
    toc.className = 'toc';
    toc.setAttribute('aria-label', 'Page contents');
    toc.innerHTML = '<div class="toc-label">// ON THIS PAGE</div>' +
      '<ul class="toc-list">' +
      headings.map(h => `<li><a class="toc-link" href="#${h.id}">${h.textContent.trim()}</a></li>`).join('') +
      '</ul>';

    // Insert TOC after the page-title-block (or at start of page-content)
    const titleBlock = pageContent.querySelector('.page-title-block');
    if (titleBlock) {
      titleBlock.insertAdjacentElement('afterend', toc);
    } else {
      pageContent.prepend(toc);
    }

    // Highlight active section on scroll
    const tocLinks = toc.querySelectorAll('.toc-link');
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(l => l.classList.remove('active'));
          const active = toc.querySelector(`.toc-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' });
    headings.forEach(h => secObs.observe(h));
  }

  // ── Back to top ──
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '↑';
  document.body.appendChild(backToTop);

  const mainScroll = document.querySelector('.main-content') || window;
  const scrollEl = mainScroll === window ? document.documentElement : mainScroll;

  function onScroll() {
    backToTop.classList.toggle('visible', scrollEl.scrollTop > 400);
  }
  mainScroll.addEventListener('scroll', onScroll, { passive: true });
  backToTop.addEventListener('click', () => {
    mainScroll.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
