import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';

// ── AOS ──────────────────────────────────────
AOS.init({
  offset: 120,
  delay: 0,
  duration: 600,
  easing: 'ease',
  once: true,
  mirror: false,
  anchorPlacement: 'top-bottom',
});

// ── LANGUAGE ─────────────────────────────────
const TITLES = {
  en: 'Franco Ibañez | Python Developer · AI Researcher',
  es: 'Franco Ibañez | Desarrollador Python · Investigador de IA',
};

let currentLang = localStorage.getItem('lang')
  || (navigator.language?.startsWith('es') ? 'es' : 'en');

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // On post pages, navigate to the translated version only if the language changed
  const article = document.querySelector('article[data-translated-url]');
  if (article) {
    const pageLang = window.location.pathname.match(/^\/(en|es)\//)?.[1];
    if (pageLang && lang !== pageLang) {
      window.location.href = article.dataset.translatedUrl;
      return;
    }
  }

  document.documentElement.lang = lang;
  document.title = TITLES[lang];

  // Show/hide pre-rendered language sections
  document.querySelectorAll('[data-lang-section]').forEach(el => {
    el.hidden = el.dataset.langSection !== lang;
  });

  // Update text nodes using data-en / data-es attributes
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[lang] ?? el.dataset.en;
  });

  formatDates(lang);
}

// ── DATE FORMATTING ───────────────────────────
const DATE_STRINGS = {
  en: { today: 'Today', day: ' day', days: ' days', week: ' week', weeks: ' weeks', month: ' month', months: ' months', year: ' year', years: ' years', ago: ' ago', order: 'after' },
  es: { today: 'Hoy', day: ' día', days: ' días', week: ' semana', weeks: ' semanas', month: ' mes', months: ' meses', year: ' año', years: ' años', ago: 'Hace ', order: 'before' },
};

function relativeDate(isoDate, lang) {
  const s = DATE_STRINGS[lang];
  const days = Math.ceil((Date.now() - new Date(isoDate)) / 86_400_000);
  if (days < 1) return s.today;

  let amount, unit;
  if      (days < 7)   { amount = days;                  unit = amount === 1 ? s.day   : s.days;   }
  else if (days < 30)  { amount = Math.floor(days / 7);  unit = amount === 1 ? s.week  : s.weeks;  }
  else if (days < 365) { amount = Math.floor(days / 30); unit = amount === 1 ? s.month : s.months; }
  else                 { amount = Math.floor(days / 365);unit = amount === 1 ? s.year  : s.years;  }

  return s.order === 'after' ? `${amount}${unit}${s.ago}` : `${s.ago}${amount}${unit}`;
}

function formatDates(lang) {
  document.querySelectorAll('.post-date[data-date]').forEach(el => {
    el.textContent = relativeDate(el.dataset.date, lang);
  });
}

// ── SCROLL ────────────────────────────────────
let prevScrollY = window.scrollY;
const myBtn = document.getElementById('myBtn');

window.addEventListener('scroll', () => {
  if (myBtn) myBtn.style.display = window.scrollY > 20 ? 'block' : 'none';

  if (window.innerWidth <= 991) {
    document.querySelector('.navbar').classList.toggle('hidden', window.scrollY > prevScrollY);
  }
  prevScrollY = window.scrollY;
});

function topFunction() {
  window.scrollTo({ top: 0 });
}

function collapseNavbar() {
  const nav = document.getElementById('navbarNav');
  if (nav?.classList.contains('show')) {
    nav.classList.remove('show');
    document.querySelector('.navbar-toggler')?.setAttribute('aria-expanded', 'false');
  }
}

// ── CV MODAL ─────────────────────────────────
function openCVModal(e) {
  e?.preventDefault();
  fetch(`/assets/html/cv-content-${currentLang.toUpperCase()}.html`)
    .then(r => r.text())
    .then(html => {
      document.getElementById('cvModalBody').innerHTML = html;
      document.getElementById('cvModal').classList.add('show');
      document.body.style.overflow = 'hidden';
    })
    .catch(() => {
      document.getElementById('cvModalBody').innerHTML = '<p>Error loading CV.</p>';
    });
}

function closeCVModal() {
  document.getElementById('cvModal').classList.remove('show');
  document.body.style.overflow = '';
  document.getElementById('cvModalBody').innerHTML = '';
}

document.getElementById('cvModal')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeCVModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('cvModal')?.classList.contains('show')) {
    closeCVModal();
  }
});

// ── THEME ─────────────────────────────────────
let currentTheme = localStorage.getItem('theme') || 'dark';

function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('theme', theme);
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = theme === 'light' ? 'las la-moon' : 'las la-sun';
  }
}

// ── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  document.querySelectorAll('[data-lang-code]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      setLanguage(btn.dataset.langCode);
    });
  });

  document.getElementById('cv')?.addEventListener('click', openCVModal);

  setTheme(currentTheme);
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
});

// Expose for HTML onclick attributes
window.topFunction = topFunction;
window.collapseNavbar = collapseNavbar;
window.closeCVModal = closeCVModal;
