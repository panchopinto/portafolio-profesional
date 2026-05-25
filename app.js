const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const root = document.documentElement;
const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('fp-theme');
if (savedTheme) root.dataset.theme = savedTheme;
const savedFs = Number(localStorage.getItem('fp-font-size') || 16);
root.style.setProperty('--fs', `${savedFs}px`);
let fs = savedFs;

const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('on');
  });
}, { threshold: 0.14 }) : null;
$$('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('on'));

$('#themeBtn')?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('fp-theme', root.dataset.theme);
});
$('#fontUp')?.addEventListener('click', () => {
  fs = Math.min(fs + 1, 22);
  root.style.setProperty('--fs', `${fs}px`);
  localStorage.setItem('fp-font-size', String(fs));
});
$('#fontDown')?.addEventListener('click', () => {
  fs = Math.max(fs - 1, 14);
  root.style.setProperty('--fs', `${fs}px`);
  localStorage.setItem('fp-font-size', String(fs));
});
$('#contrastBtn')?.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
  localStorage.setItem('fp-contrast', document.body.classList.contains('high-contrast') ? '1' : '0');
});
if (localStorage.getItem('fp-contrast') === '1') document.body.classList.add('high-contrast');

let speaking = false;
$('#speakBtn')?.addEventListener('click', () => {
  if (!('speechSynthesis' in window)) return alert('Tu navegador no tiene lector de voz disponible.');
  if (speaking) {
    speechSynthesis.cancel();
    speaking = false;
    return;
  }
  speechSynthesis.cancel();
  const text = document.body.innerText.replace(/\s+/g, ' ').slice(0, 3200);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = document.documentElement.lang === 'en' ? 'en-US' : 'es-CL';
  utterance.rate = 0.95;
  utterance.onend = () => { speaking = false; };
  speaking = true;
  speechSynthesis.speak(utterance);
});

const menuBtn = $('#menuBtn');
const mainNav = $('#mainNav');
menuBtn?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
mainNav?.addEventListener('click', e => {
  if (e.target.matches('a')) {
    mainNav.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }
});

const navLinks = $$('#mainNav a[href^="#"]');
const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
const activeObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-42% 0px -52% 0px' }) : null;
sections.forEach(section => activeObserver?.observe(section));

const translations = {
  es: {
    navPerfil: 'Perfil', navGtp: 'GTP 2026', navProyectos: 'Proyectos', navImpacto: 'Impacto', navContacto: 'Contacto',
    eyebrow: 'Educación pública · STEM · XR · Inclusión',
    heroTitle: 'Tecnología educativa para que estudiantes creen soluciones reales.',
    heroLead: 'Soy Francisco Pinto, Ingeniero en Informática y docente. Integro IoT, realidad virtual, impresión 3D, automatización y plataformas educativas para transformar el aprendizaje en experiencias activas, inclusivas y conectadas con el territorio.',
    btnGtp: '🏆 Ver enfoque GTP 2026', btnProjects: '🚀 Explorar proyectos', btnBio: '📄 Bio imprimible'
  },
  en: {
    navPerfil: 'Profile', navGtp: 'GTP 2026', navProyectos: 'Projects', navImpacto: 'Impact', navContacto: 'Contact',
    eyebrow: 'Public education · STEM · XR · Inclusion',
    heroTitle: 'Educational technology for students to build real solutions.',
    heroLead: 'I am Francisco Pinto, computer engineer and teacher. I integrate IoT, virtual reality, 3D printing, automation and educational platforms to transform learning into active, inclusive experiences connected to local challenges.',
    btnGtp: '🏆 See GTP 2026 focus', btnProjects: '🚀 Explore projects', btnBio: '📄 Printable bio'
  }
};
let lang = localStorage.getItem('fp-lang') || 'es';
function applyLang(nextLang) {
  lang = nextLang;
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  localStorage.setItem('fp-lang', lang);
}
$('#langBtn')?.addEventListener('click', () => applyLang(lang === 'es' ? 'en' : 'es'));
applyLang(lang);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js').catch(() => {}));
}
