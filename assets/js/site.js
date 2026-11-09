(function () {
  const rawPath = window.location.pathname;
  const pathParts = rawPath.split('/').filter(Boolean);
  const githubPagesBase = window.location.hostname.endsWith('github.io') && pathParts[0] === 'khaleel-portfolio'
    ? '/khaleel-portfolio'
    : '';
  const routePath = githubPagesBase ? rawPath.slice(githubPagesBase.length) || '/' : rawPath;
  const navItems = [
    ['Home', '/'],
    ['Projects', '/projects/'],
    ['Contact', '/#contact']
  ];

  document.querySelectorAll('[data-route]').forEach(function (link) {
    link.setAttribute('href', githubPagesBase + link.dataset.route);
  });

  document.querySelectorAll('[data-copy-email]').forEach(function (button) {
    button.addEventListener('click', function () {
      const email = button.dataset.copyEmail;
      navigator.clipboard.writeText(email).then(function () {
        const label = button.querySelector('span');
        if (label) label.textContent = 'Copied';
        const status = button.parentElement.querySelector('[data-copy-status]');
        if (status) status.textContent = 'Email address copied';
        window.setTimeout(function () {
          if (label) label.textContent = email;
          if (status) status.textContent = '';
        }, 1800);
      });
    });
  });

  const header = document.querySelector('[data-site-header]');
  if (header) {
    const navMarkup = navItems.map(function (item) {
      const isProjects = item[1] === '/projects/' && routePath.startsWith('/projects/');
      const isCurrent = item[1] === routePath || isProjects;
      return '<a data-route="' + item[1] + '" href="' + githubPagesBase + item[1] + '"' + (isCurrent ? ' aria-current="page"' : '') + '>' + item[0] + '</a>';
    }).join('');

    header.innerHTML = '<div class="nav-wrap">' +
      '<a class="brand" data-route="/" href="' + githubPagesBase + '/" aria-label="Khaleel home"><span class="brand-mark">Khaleel</span></a>' +
      '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>' +
      '<nav class="nav-links" id="primary-navigation" aria-label="Primary navigation">' + navMarkup + '</nav>' +
      '</div>';

    header.querySelectorAll('[data-route]').forEach(function (link) {
      link.setAttribute('href', githubPagesBase + link.dataset.route);
    });
    const toggle = header.querySelector('.menu-toggle');
    const nav = header.querySelector('.nav-links');
    toggle.addEventListener('click', function () {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      }
    });
  }

  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    footer.innerHTML = '<div class="footer-inner"><span>© <span data-year></span> Khaleelullah</span><nav class="footer-links" aria-label="Footer navigation"><a data-route="/projects/" href="' + githubPagesBase + '/projects/">Projects</a><a data-route="/#contact" href="' + githubPagesBase + '/#contact">Contact</a><a href="https://www.linkedin.com/in/mohammedkhaleelulah/" target="_blank" rel="noreferrer">LinkedIn ↗</a></nav></div>';
    footer.querySelectorAll('[data-route]').forEach(function (link) {
      link.setAttribute('href', githubPagesBase + link.dataset.route);
    });
    const year = footer.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
  }

  document.querySelectorAll('[data-pipeline]').forEach(function (flow) {
    const steps = Array.from(flow.querySelectorAll('[data-pipeline-step]'));
    const playButton = flow.querySelector('[data-pipeline-play]');
    const isUniversity = flow.dataset.pipeline === 'university';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let activeStage = 0;
    let hasUpdate = true;
    let timer = null;
    let playing = !prefersReducedMotion;

    function stop() {
      playing = false;
      window.clearInterval(timer);
      timer = null;
      if (playButton) playButton.textContent = 'Play flow';
    }

    function render() {
      flow.dataset.pipelineStage = String(activeStage);
      if (playButton) playButton.textContent = playing ? 'Pause flow' : 'Play flow';
      steps.forEach(function (button, index) {
        button.classList.toggle('udata-stage--active', isUniversity && index === activeStage);
        button.classList.toggle('entry-stage--active', !isUniversity && index === activeStage);
        button.setAttribute('aria-pressed', String(index === activeStage));
      });

      const label = flow.querySelector('[data-pipeline-label]');
      const note = flow.querySelector('[data-pipeline-note]');
      if (label) label.textContent = 'STEP ' + String(activeStage + 1).padStart(2, '0') + ' · ' + steps[activeStage].textContent.trim().replace(/^\d+\s*/, '');
      if (note) note.textContent = steps[activeStage].dataset.note || '';

      const progress = flow.querySelector('[data-pipeline-progress]');
      const dot = flow.querySelector('[data-pipeline-dot]');
      if (progress) {
        if (isUniversity) progress.style.transform = 'translateX(' + (activeStage * 100) + '%)';
        else progress.style.width = ((activeStage / (steps.length - 1)) * 100) + '%';
      }
      if (dot) dot.style.left = ((activeStage / (steps.length - 1)) * 100) + '%';

      if (isUniversity) {
        const source = flow.querySelector('[data-pipeline-source]');
        const file = flow.querySelector('[data-pipeline-file-status]');
        const record = flow.querySelector('.udata-record-card');
        const qc = flow.querySelector('.udata-qc-banner');
        const qcIcon = flow.querySelector('[data-pipeline-qc-icon]');
        const qcTitle = flow.querySelector('[data-pipeline-qc-title]');
        if (source) {
          source.classList.toggle('is-active', activeStage <= 1);
          source.classList.toggle('is-complete', activeStage > 1);
        }
        if (record) record.classList.toggle('is-active', activeStage >= 2);
        if (file) {
          file.textContent = activeStage >= 4 ? 'READY FOR CRM' : activeStage >= 3 ? 'QC COMPLETE' : 'PROCESSING';
          file.classList.toggle('udata-file-status--ready', activeStage >= 3);
          file.classList.toggle('udata-file-status--working', activeStage < 3);
        }
        flow.querySelectorAll('[data-pipeline-row]').forEach(function (row) {
          const ready = activeStage >= Number(row.dataset.readyAt);
          row.classList.toggle('udata-record-row--ready', ready);
          const check = row.querySelector('b');
          if (check) check.textContent = activeStage >= 3 ? '✓' : ready ? '•' : '—';
        });
        if (qc) qc.classList.toggle('udata-qc-banner--ready', activeStage >= 3);
        if (qcIcon) qcIcon.textContent = activeStage >= 3 ? '✓' : '○';
        if (qcTitle) qcTitle.textContent = activeStage >= 3 ? 'Quality check complete' : 'Quality review checkpoint';
      } else {
        const ticket = flow.querySelector('[data-entry-ticket]');
        const checkpoint = flow.querySelector('[data-entry-checkpoint]');
        const interpreted = flow.querySelector('[data-entry-interpreted]');
        const compare = flow.querySelector('.entry-compare');
        const compareStatus = flow.querySelector('[data-entry-compare-status]');
        const records = flow.querySelectorAll('[data-entry-record]');
        const emailCheck = flow.querySelector('[data-entry-email-check]');
        const recordCheck = flow.querySelector('[data-entry-record-check]');
        const result = flow.querySelector('.entry-branch-result');
        const resultIcon = flow.querySelector('[data-entry-result-icon]');
        const resultText = flow.querySelector('[data-entry-result]');
        if (ticket) {
          ticket.classList.toggle('is-active', activeStage <= 1);
          ticket.classList.toggle('is-complete', activeStage > 1);
        }
        if (checkpoint) checkpoint.textContent = activeStage === 0 ? 'SCHEDULED' : 'IN REVIEW';
        if (interpreted) interpreted.textContent = activeStage >= 1 ? '✓' : '…';
        if (compare) compare.classList.toggle('is-active', activeStage >= 2);
        if (compareStatus) compareStatus.textContent = activeStage >= 2 ? 'COMPARING' : 'READY';
        records.forEach(function (row) { row.classList.toggle('entry-record--scanned', activeStage >= 2); });
        if (emailCheck) emailCheck.textContent = activeStage >= 2 ? '✓' : '·';
        if (recordCheck) recordCheck.textContent = activeStage >= 2 ? '✓' : '·';
        if (result) result.classList.toggle('entry-branch-result--ready', activeStage >= 3);
        if (resultIcon) resultIcon.textContent = activeStage >= 3 ? (hasUpdate ? '↗' : '✓') : '○';
        if (resultText) resultText.textContent = activeStage >= 3 ? (hasUpdate ? 'Update file prepared' : 'Ticket completed') : 'Comparison routes the next step';
        flow.querySelectorAll('[data-entry-outcome]').forEach(function (button) {
          const selected = (button.dataset.entryOutcome === 'update') === hasUpdate;
          button.classList.toggle('is-selected', selected);
          button.setAttribute('aria-pressed', String(selected));
        });
      }
    }

    function start() {
      playing = true;
      if (playButton) playButton.textContent = 'Pause flow';
      window.clearInterval(timer);
      timer = window.setInterval(function () {
        activeStage = (activeStage + 1) % steps.length;
        render();
      }, isUniversity ? 3600 : 3900);
    }

    steps.forEach(function (button) {
      button.addEventListener('click', function () {
        activeStage = Number(button.dataset.pipelineStep);
        stop();
        render();
      });
    });
    if (playButton) playButton.addEventListener('click', function () { if (playing) stop(); else start(); });
    flow.querySelectorAll('[data-entry-outcome]').forEach(function (button) {
      button.addEventListener('click', function () {
        hasUpdate = button.dataset.entryOutcome === 'update';
        render();
      });
    });
    render();
    if (playing) start();
  });
})();
