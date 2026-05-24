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
        const anchor = uxSlugify(item.section);
        li.dataset.href = item.page + (anchor ? '#' + anchor : '');
        li.innerHTML = `<span class="search-item-page">${item.pageTitle}</span><span class="search-item-section">${item.section}</span><span class="search-item-excerpt">${item.excerpt}</span>`;
        li.addEventListener('click', () => { window.location.href = li.dataset.href; });
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
        const activeItem = results.querySelectorAll('.search-item')[activeIdx];
        if (activeItem?.dataset.href) window.location.href = activeItem.dataset.href;
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
    headings.forEach((h, i) => { if (!h.id) h.id = uxSlugify(h.textContent.trim()) || ('section-' + i); });

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
  backToTop.setAttribute('data-tip', 'Back to top');
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

  // ══════════════════════════════════════════════════════════════
  //  UX ENHANCEMENTS — 28-point audit implementation
  // ══════════════════════════════════════════════════════════════

  // Shared helper: convert text to a URL-safe slug
  function uxSlugify(text) {
    return text.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  // Shared page order (mirrors sidebar)
  const PAGE_ORDER = [
    { href: 'index.html',        label: 'Home',               section: 'Getting Started' },
    { href: 'roadmap.html',      label: 'Learning Roadmap',   section: 'Getting Started' },
    { href: 'architecture.html', label: 'Architecture',       section: 'Core Knowledge' },
    { href: 'advanced.html',     label: 'Advanced Concepts',  section: 'Core Knowledge' },
    { href: 'security.html',     label: 'Security',           section: 'Core Knowledge' },
    { href: 'usecases.html',     label: 'Use Cases',          section: 'Applied Kafka' },
    { href: 'performance.html',  label: 'Performance Tuning', section: 'Applied Kafka' },
    { href: 'comparison.html',   label: 'Kafka vs Others',    section: 'Applied Kafka' },
    { href: 'operations.html',   label: 'Operations',         section: 'Applied Kafka' },
    { href: 'cheatsheet.html',   label: 'Cheatsheet',         section: 'Reference' },
    { href: 'interview.html',    label: 'Interview Prep',     section: 'Reference' },
  ];
  const curPage = window.location.pathname.split('/').pop() || 'index.html';
  const curIdx  = PAGE_ORDER.findIndex(p => p.href === curPage);

  // UX28 — Scroll restoration
  if ('scrollRestoration' in history) history.scrollRestoration = 'auto';

  // UX1 — Reading progress bar
  (function () {
    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    document.body.appendChild(bar);
    const host = document.querySelector('.main-content') || window;
    const el   = host === window ? document.documentElement : host;
    host.addEventListener('scroll', () => {
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  })();

  // UX16 — Page exit transition (intercept internal links)
  document.querySelectorAll('a[href$=".html"]:not([target])').forEach(a => {
    a.addEventListener('click', e => {
      const url = a.href;
      if (!url || url.startsWith('#')) return;
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(() => { window.location.href = url; }, 140);
    });
  });

  // UX15 — Theme transition: force the transition AFTER first paint so it doesn't flash on load
  requestAnimationFrame(() => document.documentElement.style.transition = '');

  // UX7 — Estimated reading time
  (function () {
    const content = document.querySelector('.page-content') || document.querySelector('.hero');
    const titleBlock = document.querySelector('.page-title-block');
    if (!content || !titleBlock) return;
    const words = content.innerText.trim().split(/\s+/).length;
    const mins  = Math.max(1, Math.round(words / 220));
    const rt = document.createElement('div');
    rt.className = 'reading-time';
    rt.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${mins} min read`;
    const sub = titleBlock.querySelector('.page-subtitle');
    if (sub) sub.insertAdjacentElement('afterend', rt);
    else titleBlock.appendChild(rt);
  })();

  // UX10 — Replace native title tooltips with data-tip on collapsed nav items
  document.querySelectorAll('.nav-item[title]').forEach(item => {
    item.setAttribute('data-tip', item.getAttribute('title'));
    item.removeAttribute('title');
  });

  // UX13 — Inject group dividers between nav sections (visible only when collapsed)
  (function () {
    const nav = document.querySelector('.sidebar-nav');
    if (!nav) return;
    const labels = nav.querySelectorAll('.nav-section-label');
    labels.forEach((label, i) => {
      if (i === 0) return; // skip first
      const div = document.createElement('div');
      div.className = 'nav-group-divider';
      label.insertAdjacentElement('beforebegin', div);
    });
  })();

  // UX5 — Visited page tracking
  (function () {
    const VISITED_KEY = 'kguide-visited';
    const visited = new Set(JSON.parse(localStorage.getItem(VISITED_KEY) || '[]'));
    if (curPage && !visited.has(curPage)) {
      visited.add(curPage);
      localStorage.setItem(VISITED_KEY, JSON.stringify([...visited]));
    }
    document.querySelectorAll('.nav-item').forEach(item => {
      const page = (item.getAttribute('href') || '').split('/').pop() || 'index.html';
      if (visited.has(page) && page !== curPage) {
        const dot = document.createElement('span');
        dot.className = 'visited-dot';
        dot.setAttribute('aria-hidden', 'true');
        item.appendChild(dot);
      }
    });
  })();

  // UX10 (breadcrumb hierarchy) — enrich breadcrumb with section
  (function () {
    const bc = document.querySelector('.header-breadcrumb');
    if (!bc || curIdx < 0) return;
    const page = PAGE_ORDER[curIdx];
    const sep = document.createElement('span');
    sep.style.color = 'var(--text-muted)';
    sep.textContent = '/';
    const sectionSpan = document.createElement('span');
    sectionSpan.textContent = page.section;
    // Insert section between "kafka-guide" and the current page span
    const currentSpan = bc.querySelector('.current');
    if (currentSpan) {
      bc.insertBefore(sep, currentSpan);
      bc.insertBefore(sectionSpan, currentSpan);
      const sep2 = document.createElement('span');
      sep2.style.color = 'var(--text-muted)';
      sep2.textContent = '/';
      bc.insertBefore(sep2, currentSpan);
    }
  })();

  // UX22 — Onboarding welcome banner (first visit only, on home page)
  (function () {
    if (curPage !== 'index.html' && curPage !== '') return;
    if (localStorage.getItem('kguide-welcomed')) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const banner = document.createElement('div');
    banner.className = 'welcome-banner fade-in';
    banner.innerHTML = `
      <div class="welcome-banner-body">
        <div class="welcome-banner-text"><strong>Welcome to KafkaGuide!</strong> — A structured path from zero to production Kafka. Start with the <a href="roadmap.html" class="welcome-banner-cta">Learning Roadmap →</a></div>
      </div>
      <button class="welcome-banner-dismiss" aria-label="Dismiss welcome banner">×</button>`;
    hero.insertAdjacentElement('beforebegin', banner);
    banner.querySelector('.welcome-banner-dismiss').addEventListener('click', () => {
      banner.style.opacity = '0';
      banner.style.transition = 'opacity 0.2s ease';
      setTimeout(() => banner.remove(), 200);
      localStorage.setItem('kguide-welcomed', '1');
    });
  })();

  // UX2 — Prev/Next page navigation
  (function () {
    const content = document.querySelector('.toc-main-col') || document.querySelector('.page-content');
    if (!content || curIdx < 0) return;
    const prev = PAGE_ORDER[curIdx - 1];
    const next = PAGE_ORDER[curIdx + 1];
    if (!prev && !next) return;
    const nav = document.createElement('nav');
    nav.className = 'page-nav';
    nav.setAttribute('aria-label', 'Page navigation');
    if (prev) {
      nav.innerHTML += `<a href="${prev.href}" class="page-nav-btn prev"><span class="page-nav-dir">← Previous</span><span class="page-nav-label">${prev.label}</span><span class="page-nav-section">${prev.section}</span></a>`;
    }
    if (next) {
      nav.innerHTML += `<a href="${next.href}" class="page-nav-btn next"><span class="page-nav-dir">Next →</span><span class="page-nav-label">${next.label}</span><span class="page-nav-section">${next.section}</span></a>`;
    }
    content.appendChild(nav);
  })();

  // UX4 — "Share this section" anchor links on all h2/h3
  (function () {
    const pc = document.querySelector('.page-content');
    if (!pc) return;
    pc.querySelectorAll('h2, h3').forEach(h => {
      if (!h.id) h.id = uxSlugify(h.textContent.trim());
      if (!h.id) return;
      const a = document.createElement('a');
      a.className = 'heading-anchor';
      a.href = '#' + h.id;
      a.setAttribute('aria-label', 'Link to section');
      a.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
      h.appendChild(a);
      a.addEventListener('click', e => {
        e.preventDefault();
        const url = location.origin + location.pathname + '#' + h.id;
        navigator.clipboard?.writeText(url).then(() => {
          a.classList.add('flash');
          setTimeout(() => a.classList.remove('flash'), 1200);
        });
        history.pushState(null, '', '#' + h.id);
      });
    });
  })();

  // UX3 — Keyboard shortcuts modal
  (function () {
    const overlay = document.createElement('div');
    overlay.className = 'shortcuts-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Keyboard shortcuts');
    overlay.innerHTML = `
      <div class="shortcuts-box">
        <div class="shortcuts-title">Keyboard Shortcuts <button class="shortcuts-close">ESC</button></div>
        <div class="shortcuts-group">
          <div class="shortcuts-group-label">Navigation</div>
          <div class="shortcut-row"><span class="shortcut-desc">Open search</span><span class="shortcut-keys"><kbd>⌘</kbd><kbd>K</kbd></span></div>
          <div class="shortcut-row"><span class="shortcut-desc">Close modal / sidebar</span><span class="shortcut-keys"><kbd>Esc</kbd></span></div>
          <div class="shortcut-row"><span class="shortcut-desc">Navigate search results</span><span class="shortcut-keys"><kbd>↑</kbd><kbd>↓</kbd></span></div>
          <div class="shortcut-row"><span class="shortcut-desc">Open search result</span><span class="shortcut-keys"><kbd>↵</kbd></span></div>
        </div>
        <div class="shortcuts-group">
          <div class="shortcuts-group-label">Page</div>
          <div class="shortcut-row"><span class="shortcut-desc">Show keyboard shortcuts</span><span class="shortcut-keys"><kbd>?</kbd></span></div>
          <div class="shortcut-row"><span class="shortcut-desc">Copy section link</span><span class="shortcut-keys"><kbd>Click #</kbd></span></div>
          <div class="shortcut-row"><span class="shortcut-desc">Toggle theme</span><span class="shortcut-keys"><kbd>Click ☀</kbd></span></div>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const openShortcuts  = () => overlay.classList.add('active');
    const closeShortcuts = () => overlay.classList.remove('active');
    overlay.addEventListener('click', e => { if (e.target === overlay) closeShortcuts(); });
    overlay.querySelector('.shortcuts-close').addEventListener('click', closeShortcuts);
    document.addEventListener('keydown', e => {
      if (e.key === '?' && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        overlay.classList.contains('active') ? closeShortcuts() : openShortcuts();
      }
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeShortcuts();
    });
    // Inject ? trigger button in header
    const headerRight = document.querySelector('.header-right');
    if (headerRight) {
      const btn = document.createElement('button');
      btn.className = 'shortcuts-trigger';
      btn.setAttribute('aria-label', 'Show keyboard shortcuts');
      btn.setAttribute('data-tip', 'Keyboard shortcuts (?)');
      btn.textContent = '?';
      headerRight.appendChild(btn);
      btn.addEventListener('click', openShortcuts);
    }
  })();

  // UX17 — Search popular + recent searches panel
  (function () {
    const overlay = document.querySelector('.search-overlay');
    if (!overlay) return;
    const searchBox    = overlay.querySelector('.search-box');
    const searchInput  = overlay.querySelector('.search-input');
    const searchResults = overlay.querySelector('.search-results');
    if (!searchBox || !searchInput || !searchResults) return;

    const RECENT_KEY  = 'kguide-recent-searches';
    const POPULAR     = ['partitions', 'replication', 'consumer groups', 'exactly-once', 'KRaft', 'SASL', 'linger.ms', 'compaction'];

    const panel = document.createElement('div');
    panel.className = 'search-popular';

    const renderPanel = () => {
      const recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]').slice(0, 5);
      let html = '';
      if (recent.length) {
        html += `<div class="search-popular-label">Recent <button class="search-recent-clear" aria-label="Clear recent searches">Clear</button></div>`;
        html += `<div class="search-chips">` + recent.map(r => `<button class="search-chip" data-query="${r}">${r}</button>`).join('') + `</div>`;
      }
      html += `<div class="search-popular-label">Popular</div>`;
      html += `<div class="search-chips">` + POPULAR.map(p => `<button class="search-chip" data-query="${p}">${p}</button>`).join('') + `</div>`;
      panel.innerHTML = html;
      panel.querySelectorAll('.search-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          searchInput.value = chip.dataset.query;
          searchInput.dispatchEvent(new Event('input'));
          panel.style.display = 'none';
        });
      });
      const clearBtn = panel.querySelector('.search-recent-clear');
      if (clearBtn) clearBtn.addEventListener('click', () => {
        localStorage.removeItem(RECENT_KEY);
        renderPanel();
      });
    };

    renderPanel();
    searchBox.insertBefore(panel, searchResults);

    // Show/hide panel based on input
    searchInput.addEventListener('input', () => {
      panel.style.display = searchInput.value ? 'none' : '';
    });

    // Save query to recent on navigation
    searchResults.addEventListener('click', e => {
      const item = e.target.closest('.search-item');
      if (!item) return;
      const section = item.querySelector('.search-item-section')?.textContent;
      if (!section) return;
      const recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
      const updated = [section, ...recent.filter(r => r !== section)].slice(0, 8);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    });

    // Show panel when modal opens (watch class change)
    new MutationObserver(() => {
      if (overlay.classList.contains('active')) {
        panel.style.display = '';
        renderPanel();
      }
    }).observe(overlay, { attributes: true, attributeFilter: ['class'] });
  })();

  // UX8 — Code language badges
  (function () {
    const LANG_MAP = {
      'docker-compose': ['docker', 'Docker Compose'], 'docker': ['docker', 'Docker'],
      'bash': ['bash', 'Bash'], 'shell': ['bash', 'Shell'],
      'properties': ['props', 'Properties'], 'config': ['props', 'Config'],
      'yaml': ['yaml', 'YAML'], 'json': ['json', 'JSON'],
      'java': ['java', 'Java'], 'sql': ['sql', 'SQL'], 'xml': ['xml', 'XML'],
    };
    document.querySelectorAll('.code-wrap').forEach(wrap => {
      const title = wrap.querySelector('.code-title');
      if (!title) return;
      const text = title.textContent.toLowerCase();
      for (const [key, [cls, label]] of Object.entries(LANG_MAP)) {
        if (text.includes(key)) {
          const badge = document.createElement('span');
          badge.className = `code-lang lang-${cls}`;
          badge.textContent = label;
          title.insertAdjacentElement('afterend', badge);
          break;
        }
      }
    });
  })();

  // UX9 — Table Copy-All for config tables
  (function () {
    document.querySelectorAll('.config-table-wrap').forEach(wrap => {
      const rows = wrap.querySelectorAll('tbody tr');
      if (!rows.length) return;
      const wrapDiv = document.createElement('div');
      wrapDiv.className = 'table-copy-wrap';
      const lbl = document.createElement('span');
      lbl.className = 'table-copy-label';
      lbl.textContent = wrap.previousElementSibling?.textContent?.trim() || '';
      const btn = document.createElement('button');
      btn.className = 'table-copy-all';
      btn.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy All';
      btn.addEventListener('click', () => {
        const lines = Array.from(rows).map(r => {
          const cells = r.querySelectorAll('td');
          return cells[0]?.textContent.trim() + '=' + (cells[1]?.textContent.trim() || '');
        }).join('\n');
        navigator.clipboard?.writeText(lines).then(() => {
          btn.textContent = '✓ Copied!';
          btn.classList.add('copied');
          setTimeout(() => { btn.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy All'; btn.classList.remove('copied'); }, 1400);
        });
      });
      wrapDiv.appendChild(lbl);
      wrapDiv.appendChild(btn);
      wrap.insertAdjacentElement('beforebegin', wrapDiv);
    });
  })();

  // UX18 — Performance bar Re-run button
  (function () {
    const perfGrid = document.querySelector('.perf-grid');
    if (!perfGrid) return;
    const fills = perfGrid.querySelectorAll('.perf-fill');
    if (!fills.length) return;
    const btn = document.createElement('button');
    btn.className = 'perf-rerun';
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.14"/></svg> Re-run benchmarks`;
    btn.addEventListener('click', () => {
      btn.classList.add('running');
      fills.forEach(f => { f.style.width = '0%'; });
      setTimeout(() => {
        fills.forEach(f => { f.style.width = (f.dataset.width || 0) + '%'; });
        btn.classList.remove('running');
      }, 200);
    });
    perfGrid.insertAdjacentElement('afterend', btn);
  })();

  // UX19 — Mermaid diagram accessibility
  document.querySelectorAll('.diagram-block').forEach(block => {
    const label = block.querySelector('.diagram-label');
    if (label) {
      block.setAttribute('role', 'img');
      block.setAttribute('aria-label', label.textContent.trim());
    }
  });

  // UX6 — Interview "Mark as Reviewed"
  (function () {
    const REVIEWED_KEY = 'kguide-reviewed';
    const reviewed = new Set(JSON.parse(localStorage.getItem(REVIEWED_KEY) || '[]'));
    let reviewedCount = 0;

    document.querySelectorAll('.interview-block').forEach((block, i) => {
      const qEl = block.querySelector('.interview-q-text');
      const id  = 'iq-' + i;
      block.dataset.iqId = id;

      const actions = document.createElement('div');
      actions.className = 'interview-actions';

      const btn = document.createElement('button');
      btn.className = 'mark-reviewed-btn' + (reviewed.has(id) ? ' reviewed' : '');
      const ICON_CHECK_SM = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
      btn.innerHTML = reviewed.has(id) ? ICON_CHECK_SM + ' Reviewed' : ICON_CHECK_SM + ' Mark reviewed';

      if (reviewed.has(id)) { block.classList.add('reviewed-block'); reviewedCount++; }

      btn.addEventListener('click', () => {
        const isReviewed = reviewed.has(id);
        if (isReviewed) {
          reviewed.delete(id);
          block.classList.remove('reviewed-block');
          btn.innerHTML = ICON_CHECK_SM + ' Mark reviewed';
          btn.classList.remove('reviewed');
          reviewedCount--;
        } else {
          reviewed.add(id);
          block.classList.add('reviewed-block');
          btn.innerHTML = ICON_CHECK_SM + ' Reviewed';
          btn.classList.add('reviewed');
          reviewedCount++;
        }
        localStorage.setItem(REVIEWED_KEY, JSON.stringify([...reviewed]));
        updateReviewedCount();
      });

      const countSpan = document.createElement('span');
      countSpan.className = 'reviewed-count';
      actions.appendChild(btn);
      actions.appendChild(countSpan);
      block.appendChild(actions);
    });

    function updateReviewedCount() {
      const total = document.querySelectorAll('.interview-block').length;
      document.querySelectorAll('.reviewed-count').forEach(el => {
        el.textContent = `${reviewedCount} / ${total} reviewed`;
      });
    }
    updateReviewedCount();
  })();

  // UX9 (quiz) — Quiz answer persistence via sessionStorage
  (function () {
    const QUIZ_KEY = 'kguide-quiz-' + curPage;
    let saved = {};
    try { saved = JSON.parse(sessionStorage.getItem(QUIZ_KEY) || '{}'); } catch (e) {}

    document.querySelectorAll('.quiz-block').forEach((block, bi) => {
      const opts = block.querySelectorAll('.quiz-opt');
      const result = block.querySelector('.quiz-result');
      const savedAnswer = saved[bi];

      if (savedAnswer !== undefined) {
        opts.forEach((opt, oi) => {
          opt.disabled = true;
          if (oi === savedAnswer) opt.classList.add(opt.dataset.correct === 'true' ? 'persisted-correct' : 'persisted-wrong');
          else if (opt.dataset.correct === 'true') opt.classList.add('persisted-correct');
        });
        if (result) {
          const wasCorrect = opts[savedAnswer]?.dataset.correct === 'true';
          result.textContent = wasCorrect ? '✓ Correct!' : '✗ Not quite — see highlighted answer.';
          result.className = 'quiz-result ' + (wasCorrect ? 'ok' : 'fail');
        }
      }

      opts.forEach((opt, oi) => {
        opt.addEventListener('click', () => {
          saved[bi] = oi;
          try { sessionStorage.setItem(QUIZ_KEY, JSON.stringify(saved)); } catch (e) {}
        });
      });
    });
  })();

  // UX11 — Hero stats as links
  (function () {
    const STAT_LINKS = [
      { keyword: 'page', href: 'index.html' },
      { keyword: 'interview', href: 'interview.html' },
      { keyword: 'section', href: 'architecture.html' },
      { keyword: 'week', href: 'roadmap.html' },
    ];
    document.querySelectorAll('.stat-item').forEach(item => {
      const label = item.querySelector('.stat-label')?.textContent?.toLowerCase() || '';
      const match = STAT_LINKS.find(s => label.includes(s.keyword));
      if (!match) return;
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => { window.location.href = match.href; });
    });
  })();

  // UX24 — NEW badge expiry (remove if past date)
  (function () {
    const EXPIRY = { 'operations.html': '2026-08-17', 'interview.html': '2026-08-17' };
    const now = new Date();
    document.querySelectorAll('.nav-badge').forEach(badge => {
      const page = badge.closest('.nav-item')?.getAttribute('href') || '';
      const expiry = EXPIRY[page];
      if (expiry && now > new Date(expiry)) badge.remove();
    });
  })();

});

