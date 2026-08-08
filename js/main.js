/* ==========================================================================
   ACRE36 — main.js
   No frameworks, no build step. Progressive enhancement only.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Scroll reveal ---- */
  const revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-line]');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---- Reports filter (Reports & Insights page) ---- */
  const filterBar = document.querySelector('[data-filter-bar]');
  const reportCards = document.querySelectorAll('[data-report-card]');
  if (filterBar && reportCards.length) {
    filterBar.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const status = chip.dataset.status;
      reportCards.forEach(card => {
        const match = status === 'all' || card.dataset.status === status;
        card.style.display = match ? '' : 'none';
      });
    });
  }

  /* ---- Pill-style radio/checkbox groups (advisor form) ---- */
  document.querySelectorAll('.pill-group').forEach(group => {
    group.querySelectorAll('.pill').forEach(pill => {
      const input = pill.querySelector('input');
      if (!input) return;
      pill.addEventListener('click', () => {
        if (input.type === 'radio') {
          group.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        }
        input.checked = input.type === 'checkbox' ? !input.checked : true;
        pill.classList.toggle('active', input.checked);
      });
    });
  });

  /* ---- Advisor / consultation form ---- */
  const advisorForm = document.querySelector('#advisor-form');
  if (advisorForm) {
    advisorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // V1 note: point this at a serverless endpoint or form service
      // (e.g. Formspree, Netlify Forms, a Cloudflare Worker) that then
      // triggers a WhatsApp / CRM notification to the advisor team.
      const success = document.querySelector('#advisor-form-success');
      advisorForm.style.display = 'none';
      if (success) success.classList.add('show');
    });
  }

  /* ---- "Send to WhatsApp" helper ---- */
  document.querySelectorAll('[data-whatsapp]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const number = '910000000000'; // TODO: replace with Acre36 WhatsApp business number
      const text = btn.dataset.whatsapp || 'Hi Acre36, I would like to talk to an advisor.';
      const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener');
    });
  });

  /* ---- Current year in footer ---- */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

});
