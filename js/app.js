document.addEventListener('DOMContentLoaded', () => {

  // #1 — Skip-to-content link for keyboard navigation
  const skipLink = document.createElement('a');
  skipLink.className = 'skip-to-content';
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to content';
  document.body.insertBefore(skipLink, document.body.firstChild);
  const mainContent = document.querySelector('.page-content') || document.querySelector('.hero');
  if (mainContent && !mainContent.id) mainContent.id = 'main-content';

  // ── Sidebar collapse + icon injection ──
  (function () {
    const NAV_ICONS = {
      'index.html':       '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      'roadmap.html':     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
      'architecture.html':'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
      'advanced.html':    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      'security.html':    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      'usecases.html':    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
      'performance.html': '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      'comparison.html':  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
      'operations.html':  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
      'cheatsheet.html':  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
      'interview.html':   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    };

    // Inject icons + wrap text nodes in .nav-label for collapse support
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = (item.getAttribute('href') || '').split('/').pop() || 'index.html';
      const iconEl = item.querySelector('.nav-icon');
      if (iconEl && NAV_ICONS[href]) {
        iconEl.innerHTML = NAV_ICONS[href];
        iconEl.setAttribute('aria-hidden', 'true');
      }
      // Wrap plain text nodes in .nav-label spans
      Array.from(item.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          const label = document.createElement('span');
          label.className = 'nav-label';
          label.textContent = node.textContent.trim();
          item.replaceChild(label, node);
        }
      });
      // title attribute drives native tooltip in collapsed state
      const labelEl = item.querySelector('.nav-label');
      if (labelEl) item.setAttribute('title', labelEl.textContent.trim());
    });

    // Only wire up collapse toggle on desktop
    if (window.innerWidth <= 900) return;

    const siteWrapper = document.querySelector('.site-wrapper');
    const sidebar = document.querySelector('.sidebar');
    if (!siteWrapper || !sidebar) return;

    // Build the collapse button
    const collapseBtn = document.createElement('button');
    collapseBtn.className = 'sidebar-collapse-btn';
    collapseBtn.setAttribute('aria-label', 'Toggle sidebar');
    collapseBtn.innerHTML = `
      <svg class="icon-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      <span class="collapse-btn-label">Collapse</span>`;

    const sidebarNav = sidebar.querySelector('.sidebar-nav');
    if (sidebarNav) sidebar.insertBefore(collapseBtn, sidebarNav);
    else sidebar.appendChild(collapseBtn);

    const collapseBtnLabel = collapseBtn.querySelector('.collapse-btn-label');

    // Restore saved state before first paint
    if (localStorage.getItem('kguide-sidebar') === 'collapsed') {
      siteWrapper.classList.add('sidebar-collapsed');
      if (collapseBtnLabel) collapseBtnLabel.textContent = 'Expand';
    }

    collapseBtn.addEventListener('click', () => {
      const isNowCollapsed = siteWrapper.classList.toggle('sidebar-collapsed');
      localStorage.setItem('kguide-sidebar', isNowCollapsed ? 'collapsed' : 'expanded');
      if (collapseBtnLabel) collapseBtnLabel.textContent = isNowCollapsed ? 'Expand' : 'Collapse';
    });
  })();

  // ── Search modal (Cmd+K / Ctrl+K) — always rendered, falls back gracefully (#3) ──
  {
    const hasIndex = Array.isArray(window.SEARCH_INDEX) && window.SEARCH_INDEX.length > 0;

    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Search');
    overlay.innerHTML = `
      <div class="search-box">
        <div class="search-input-wrap">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="search-input" type="text" placeholder="Search topics, commands, concepts…" autocomplete="off" spellcheck="false" ${hasIndex ? '' : 'disabled'}>
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

    const openSearch = () => {
      overlay.classList.add('active');
      input.value = '';
      activeIdx = -1;
      if (!hasIndex) {
        results.innerHTML = '<li class="search-empty">Search index not available — try refreshing the page.</li>';
      } else {
        results.innerHTML = '';
      }
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
      if (!hasIndex) return;
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

    input.addEventListener('input', () => renderResults(input.value));
    input.addEventListener('keydown', (e) => {
      const items = results.querySelectorAll('.search-item');
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIdx + 1, items.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
      else if (e.key === 'Enter' && activeIdx >= 0 && hasIndex) {
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
    const icon = item.querySelector('.nav-icon');
    if (icon) icon.setAttribute('aria-hidden', 'true');
  });

  // #12 — Breadcrumb aria-current="page"
  const breadcrumbCurrent = document.querySelector('.header-breadcrumb .current');
  if (breadcrumbCurrent) breadcrumbCurrent.setAttribute('aria-current', 'page');

  // #18 — Header compresses on scroll
  const header = document.querySelector('.header');
  const scrollHost = document.querySelector('.main-content') || window;
  if (header) {
    scrollHost.addEventListener('scroll', () => {
      const scrollTop = scrollHost === window ? window.scrollY : scrollHost.scrollTop;
      header.classList.toggle('compact', scrollTop > 60);
    }, { passive: true });
  }

  const ICON_COPY = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  const ICON_CHECK = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

  // ── Copy code — #11 timeout 1400ms, #24 in-flight feedback ──
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.innerHTML = ICON_COPY + 'Copy';
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-wrap')?.querySelector('pre');
      if (!pre || btn.dataset.copying) return;
      btn.dataset.copying = '1';
      btn.innerHTML = ICON_COPY + 'Copying…';
      btn.style.opacity = '0.7';
      navigator.clipboard.writeText(pre.innerText).then(() => {
        btn.innerHTML = ICON_CHECK + 'Copied!';
        btn.classList.add('copied');
        btn.style.opacity = '';
        setTimeout(() => {
          btn.innerHTML = ICON_COPY + 'Copy';
          btn.classList.remove('copied');
          delete btn.dataset.copying;
        }, 1400);
      }).catch(() => {
        btn.innerHTML = ICON_COPY + 'Copy';
        btn.style.opacity = '';
        delete btn.dataset.copying;
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

  // ── Interview accordion — #5 chevron transition, #6 actual height animation ──
  function collapseAnswer(block) {
    const a = block.querySelector('.interview-a');
    if (a) a.style.maxHeight = '0';
    block.classList.remove('open');
    block.querySelector('.interview-q')?.setAttribute('aria-expanded', 'false');
  }
  function expandAnswer(block) {
    const a = block.querySelector('.interview-a');
    block.classList.add('open');
    block.querySelector('.interview-q')?.setAttribute('aria-expanded', 'true');
    if (a) {
      // Measure actual scrollHeight (includes padding from .open state in CSS)
      requestAnimationFrame(() => {
        a.style.maxHeight = a.scrollHeight + 'px';
      });
    }
  }

  document.querySelectorAll('.interview-q').forEach(q => {
    q.setAttribute('tabindex', '0');
    q.setAttribute('role', 'button');
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', () => {
      const block = q.closest('.interview-block');
      const isOpen = block.classList.contains('open');
      document.querySelectorAll('.interview-block.open').forEach(b => collapseAnswer(b));
      if (!isOpen) expandAnswer(block);
    });
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); q.click(); }
    });
  });

  // ── Mermaid — apply theme before rendering ──
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#e2e8f0',
        primaryBorderColor: 'rgba(59,130,246,0.5)',
        lineColor: 'rgba(59,130,246,0.45)',
        secondaryColor: '#131929',
        tertiaryColor: '#0d1220',
        background: '#080c14',
        fontFamily: 'Inter, sans-serif',
        fontSize: '13px',
      },
      flowchart: { curve: 'basis', padding: 20 },
    });
    mermaid.run();
  }

  // ── GitHub link ──
  document.querySelectorAll('.header-right').forEach(headerRight => {
    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/deannos/kafka-learning-guide';
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.className = 'github-btn';
    githubLink.setAttribute('aria-label', 'View source on GitHub');
    githubLink.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>GitHub`;
    headerRight.insertBefore(githubLink, headerRight.firstChild);
  });

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

  // ── Auto Table of Contents — two-column flex layout (no float+sticky overlap) ──
  const pageContent = document.querySelector('.page-content');
  const headings = pageContent ? Array.from(pageContent.querySelectorAll('h2')) : [];
  if (headings.length >= 2) {
    headings.forEach((h, i) => { if (!h.id) h.id = 'section-' + i; });

    const toc = document.createElement('nav');
    toc.className = 'toc';
    toc.setAttribute('aria-label', 'Page contents');
    toc.innerHTML = '<div class="toc-label">// ON THIS PAGE</div>' +
      '<ul class="toc-list">' +
      headings.map(h => `<li><a class="toc-link" href="#${h.id}">${h.textContent.trim()}</a></li>`).join('') +
      '</ul>';

    // Build a flex wrapper: [content column] [toc sidebar]
    const layout = document.createElement('div');
    layout.className = 'toc-layout';

    const mainCol = document.createElement('div');
    mainCol.className = 'toc-main-col';

    const tocSidebar = document.createElement('aside');
    tocSidebar.className = 'toc-sidebar';
    tocSidebar.setAttribute('aria-label', 'On this page');
    tocSidebar.appendChild(toc);

    // Move all page content that follows the title block into the main column
    const titleBlock = pageContent.querySelector('.page-title-block');
    const siblings = Array.from(pageContent.children).filter(el => el !== titleBlock);
    siblings.forEach(el => mainCol.appendChild(el)); // moves nodes out of pageContent

    layout.appendChild(mainCol);
    layout.appendChild(tocSidebar);

    if (titleBlock) {
      titleBlock.insertAdjacentElement('afterend', layout);
    } else {
      pageContent.appendChild(layout);
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
    }, { rootMargin: '-10% 0px -50% 0px' });
    headings.forEach(h => secObs.observe(h));
  }

  // ── Back to top ──
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>';
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
