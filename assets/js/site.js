(function () {
  const rawPath = window.location.pathname;
  const pathParts = rawPath.split('/').filter(Boolean);
  const githubPagesBase = window.location.hostname.endsWith('github.io') && pathParts[0] === 'khaleel-portfolio'
    ? '/khaleel-portfolio'
    : '';
  const routePath = githubPagesBase ? rawPath.slice(githubPagesBase.length) || '/' : rawPath;
  const navItems = [
    ['Home', '/'],
    ['About', '/about/'],
    ['Experience', '/experience/'],
    ['Projects', '/projects/'],
    ['Contact', '/contact/']
  ];

  document.querySelectorAll('[data-route]').forEach(function (link) {
    link.setAttribute('href', githubPagesBase + link.dataset.route);
  });

  const header = document.querySelector('[data-site-header]');
  if (header) {
    const navMarkup = navItems.map(function (item) {
      const isProjects = item[1] === '/projects/' && routePath.startsWith('/projects/');
      const isCurrent = item[1] === routePath || isProjects;
      return '<a data-route="' + item[1] + '" href="' + githubPagesBase + item[1] + '"' + (isCurrent ? ' aria-current="page"' : '') + '>' + item[0] + '</a>';
    }).join('');

    header.innerHTML = '<div class="nav-wrap">' +
      '<a class="brand" data-route="/" href="' + githubPagesBase + '/" aria-label="Khaleel home"><span class="brand-mark" aria-hidden="true">KH</span><span>Khaleel</span></a>' +
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
    footer.innerHTML = '<div class="footer-inner"><span>© <span data-year></span> Khaleelullah</span><nav class="footer-links" aria-label="Footer navigation"><a data-route="/projects/" href="' + githubPagesBase + '/projects/">Projects</a><a data-route="/experience/" href="' + githubPagesBase + '/experience/">Experience</a><a data-route="/contact/" href="' + githubPagesBase + '/contact/">Contact</a><a href="https://www.linkedin.com/in/mohammedkhaleelulah/" target="_blank" rel="noreferrer">LinkedIn ↗</a></nav></div>';
    footer.querySelectorAll('[data-route]').forEach(function (link) {
      link.setAttribute('href', githubPagesBase + link.dataset.route);
    });
    const year = footer.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
  }
})();
