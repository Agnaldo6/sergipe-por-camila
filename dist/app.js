const root = document.documentElement;
const header = document.querySelector('.site-header');
const headerMenu = header.querySelector('nav');
const hero = document.querySelector('.hero');
const heroScroll = document.querySelector('.hero-scroll');
const statement = document.querySelector('.statement-stage');
const manifesto = document.querySelector('.manifesto');
const storyCards = [...manifesto.querySelectorAll('.story-card')];
const museumRoute = document.querySelector('.museum-route');
const cultureShortcuts = document.querySelector('.culture-shortcuts');
const footer = document.querySelector('.site-footer');
const guide = window.SERGIPE_GUIDE;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const soften = (progress) => progress * progress * (3 - 2 * progress);
root.classList.add('js-motion');

function updateManifestoCards(progress) {
  if (window.matchMedia('(max-width: 1100px), (prefers-reduced-motion: reduce)').matches) {
    storyCards.forEach((card) => { card.inert = false; });
    return;
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const leaveOne = clamp((progress - 0.12) / 0.35);
  const arriveTwo = clamp((progress - 0.12) / 0.38);
  const leaveTwo = clamp((progress - 0.51) / 0.3);
  const arriveThree = clamp((progress - 0.47) / 0.4);
  const positions = [
    { x: -0.57 * vw * leaveOne, y: -0.08 * vh * leaveOne, rotate: -4 - 12 * leaveOne, scale: 1 - 0.12 * leaveOne, opacity: 1 - clamp((progress - 0.43) / 0.2), inert: progress > 0.55 },
    { x: 0.56 * vw * (1 - arriveTwo) - 0.58 * vw * leaveTwo, y: 0.1 * vh * (1 - arriveTwo) - 0.07 * vh * leaveTwo, rotate: 13 * (1 - arriveTwo) - 14 * leaveTwo, scale: 0.9 + 0.1 * arriveTwo - 0.1 * leaveTwo, opacity: arriveTwo * (1 - clamp((progress - 0.78) / 0.15)), inert: progress < 0.28 || progress > 0.85 },
    { x: 0.63 * vw * (1 - arriveThree), y: 0.1 * vh * (1 - arriveThree), rotate: 17 * (1 - arriveThree), scale: 0.91 + 0.09 * arriveThree, opacity: arriveThree, inert: progress < 0.63 }
  ];

  storyCards.forEach((card, index) => {
    const pose = positions[index];
    card.style.setProperty('--card-x', `${pose.x.toFixed(1)}px`);
    card.style.setProperty('--card-y', `${pose.y.toFixed(1)}px`);
    card.style.setProperty('--card-rotate', `${pose.rotate.toFixed(1)}deg`);
    card.style.setProperty('--card-scale', pose.scale.toFixed(3));
    card.style.setProperty('--card-opacity', pose.opacity.toFixed(3));
    card.inert = pose.inert;
  });
}

let ticking = false;
function updateScrollMotion() {
  const y = window.scrollY;
  const heroScrollBox = heroScroll.getBoundingClientRect();
  const stickyTravel = Math.max(heroScrollBox.height - window.innerHeight, 1);
  const heroProgress = clamp(-heroScrollBox.top / stickyTravel);
  const heroMarkDrift = clamp(-heroScrollBox.top - stickyTravel, 0, window.innerHeight);
  const stepProgress = clamp((heroProgress - 0.02) / 0.98);
  const fluidStep = stepProgress * stepProgress * (3 - 2 * stepProgress);
  const heroBrandReveal = soften(clamp((heroProgress - 0.60) / 0.34));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && window.innerWidth > 700) {
    [0.66, 0.32, 0].forEach((lag, index) => {
      const remaining = (1 - fluidStep) * window.innerHeight * (1 + lag);
      root.style.setProperty(`--step-${['one', 'two', 'three'][index]}-y`, `${remaining.toFixed(1)}px`);
    });
  }
  const statementBox = statement.getBoundingClientRect();
  const statementProgress = clamp(-statementBox.top / Math.max(statement.offsetHeight - window.innerHeight, 1));
  const statementEntry = soften(clamp((window.innerHeight - statementBox.top) / window.innerHeight));
  const statementHeadExit = soften(clamp((statementProgress - 0.45) / 0.19));
  const statementYellowReveal = soften(clamp((statementProgress - 0.58) / 0.30));
  const statementCopyReveal = soften(clamp((statementProgress - 0.64) / 0.24));
  const crabArrive = statementEntry;
  const manifestoBox = manifesto.getBoundingClientRect();
  const storyProgress = clamp((window.innerHeight - manifestoBox.top) / (manifestoBox.height + window.innerHeight * 0.4));
  const manifestoProgress = clamp(-manifestoBox.top / Math.max(manifestoBox.height - window.innerHeight, 1));
  const menuBox = headerMenu.getBoundingClientRect();
  const menuProbeY = menuBox.top + menuBox.height / 2;
  const pillBox = header.querySelector('.header-pill').getBoundingClientRect();
  const shortcutBox = cultureShortcuts.getBoundingClientRect();
  const shortcutAtHeader = shortcutBox.top < pillBox.bottom && shortcutBox.bottom > pillBox.top && shortcutBox.left < pillBox.right && shortcutBox.right > pillBox.left;
  const yellowAtHeader = manifestoBox.top <= menuProbeY && manifestoBox.bottom > menuProbeY || shortcutAtHeader;
  const darkAtHeader = !yellowAtHeader && (stepProgress > 0.78 && heroScrollBox.top <= menuProbeY && heroScrollBox.bottom > menuProbeY || [statement, museumRoute, footer].some((section) => {
    const box = section.getBoundingClientRect();
    return box.top <= menuProbeY && box.bottom > menuProbeY;
  }));

  root.style.setProperty('--hero-shift', heroProgress.toFixed(3));
  root.style.setProperty('--hero-lift', `${(-24 * heroProgress).toFixed(1)}px`);
  root.style.setProperty('--hero-brand-opacity', heroBrandReveal.toFixed(3));
  root.style.setProperty('--hero-brand-y', `${((1 - heroBrandReveal) * 72).toFixed(1)}px`);
  root.style.setProperty('--hero-mark-drift', `${heroMarkDrift.toFixed(1)}px`);
  root.style.setProperty('--statement-progress', statementProgress.toFixed(3));
  root.style.setProperty('--statement-entry', statementEntry.toFixed(3));
  root.style.setProperty('--statement-head-opacity', (statementEntry * (1 - statementHeadExit)).toFixed(3));
  root.style.setProperty('--statement-yellow-reveal', statementYellowReveal.toFixed(3));
  root.style.setProperty('--statement-copy-reveal', statementCopyReveal.toFixed(3));
  root.style.setProperty('--crab-opacity', crabArrive.toFixed(3));
  root.style.setProperty('--crab-y', `${((1 - crabArrive) * 24).toFixed(1)}px`);
  root.style.setProperty('--story-progress', storyProgress.toFixed(3));
  updateManifestoCards(manifestoProgress);
  header.classList.toggle('scrolled', y > hero.offsetHeight * 0.7);
  header.classList.toggle('over-yellow', yellowAtHeader);
  header.classList.toggle('over-dark', darkAtHeader);
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollMotion);
    ticking = true;
  }
}, { passive: true });

window.addEventListener('resize', updateScrollMotion, { passive: true });
window.addEventListener('pageshow', () => {
  requestAnimationFrame(updateScrollMotion);
  setTimeout(updateScrollMotion, 200);
});
window.addEventListener('hashchange', () => requestAnimationFrame(updateScrollMotion));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function externalAttributes(url) {
  return url.startsWith('#') ? '' : ' target="_blank" rel="noreferrer"';
}

function motifFor(place) {
  const title = place.title.toLowerCase();
  if (title.includes('bike') || title.includes('pedal')) return 'motif-bike';
  if (title.includes('rio') || title.includes('barco') || title.includes('tototó')) return 'motif-boat';
  if (title.includes('praia') || title.includes('duna') || title.includes('lagoa') || title.includes('croa')) return 'motif-dune';
  if (title.includes('museu') || title.includes('galeria') || title.includes('biblioteca') || title.includes('xilogravura')) return 'motif-museum';
  if (place.categories.includes('cultura')) return 'motif-museum';
  if (place.categories.includes('aracaju')) return 'motif-map';
  return 'motif-waterfall';
}

function placeTemplate(place, position) {
  const motif = motifFor(place);
  const icon = `<span class="place-icon" aria-hidden="true"><span class="motif ${motif}"></span></span>`;
  const description = place.description.trim().split(/\n\s*\n/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.trim())}</p>`).join('');
  const credit = place.imageSource
    ? place.imageLicense
      ? `<div class="photo-credit photo-credit-license"><a href="${escapeHtml(place.imageSource)}"${externalAttributes(place.imageSource)}>Foto: ${escapeHtml(place.imageCredit || 'fonte')}</a><a href="${escapeHtml(place.imageLicense)}"${externalAttributes(place.imageLicense)}>CC BY-SA 4.0</a></div>`
      : `<a class="photo-credit" href="${escapeHtml(place.imageSource)}"${externalAttributes(place.imageSource)}>Foto: ${escapeHtml(place.imageCredit || 'fonte')}</a>`
    : '';
  const media = place.image
    ? `<img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.imageAlt)}" loading="lazy" />
       ${credit}${icon}`
    : `<div class="place-placeholder" aria-hidden="true">${icon}</div>`;
  const tip = place.tip ? `<p class="place-tip"><strong>Dica:</strong> ${escapeHtml(place.tip)}</p>` : '';
  const contacts = place.contacts?.length
    ? `<ul class="contact-list"><li><strong>Contatos do roteiro</strong></li>${place.contacts.map((contact) => `<li>${escapeHtml(contact)}</li>`).join('')}</ul>`
    : '';
  const links = place.links?.length
    ? `<div class="place-links">${place.links.map(([label, url]) => `<a href="${escapeHtml(url)}"${externalAttributes(url)}>${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`).join('')}</div>`
    : '';

  return `
    <article class="place-card" data-place-id="${place.id}" data-categories="${place.categories.join(' ')}">
      <div class="place-media">${media}</div>
      <details>
        <summary>
          <span class="place-meta"><span class="place-index">${String(position + 1).padStart(2, '0')}</span><span class="place-location">${escapeHtml(place.location)}</span><span class="place-open" aria-hidden="true">+</span></span>
          <h3>${escapeHtml(place.title)}</h3>
        </summary>
        <div class="place-detail">
          ${description}
          ${tip}${contacts}${links}
        </div>
      </details>
    </article>`;
}

function renderGuide() {
  const filters = document.querySelector('#filters');
  const grid = document.querySelector('#places-grid');
  const count = document.querySelector('#result-count');
  const alphabetic = new Intl.Collator('pt-BR', { sensitivity: 'base', numeric: true });
  const broadAreas = new Set(['Alagoas', 'Bahia', 'Sergipe']);
  const placesByCity = [...guide.places].sort((first, second) =>
    Number(second.id === 1) - Number(first.id === 1) ||
    Number(broadAreas.has(first.location)) - Number(broadAreas.has(second.location)) ||
    alphabetic.compare(first.location, second.location) ||
    alphabetic.compare(first.title, second.title) ||
    first.id - second.id
  );

  const filterMotifs = ['motif-sun', 'motif-map', 'motif-waterfall', 'motif-museum', 'motif-boat'];
  filters.innerHTML = guide.filters.map((filter, index) => `
    <button class="filter-button" type="button" data-filter="${filter.id}" aria-pressed="${index === 0}">
      <span class="motif ${filterMotifs[index]}" aria-hidden="true"></span>
      <span>${escapeHtml(filter.label)}</span>
    </button>`).join('');
  grid.innerHTML = placesByCity.map(placeTemplate).join('');

  filters.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-button');
    if (!button) return;
    const selected = button.dataset.filter;

    filters.querySelectorAll('.filter-button').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });

    let visible = 0;
    grid.querySelectorAll('.place-card').forEach((card) => {
      const show = selected === 'todos' || card.dataset.categories.split(' ').includes(selected);
      card.hidden = !show;
      if (show) {
        visible += 1;
        requestAnimationFrame(() => card.classList.add('visible'));
      }
    });
    count.textContent = visible;
  });

  document.querySelector('#museum-route').innerHTML = guide.museumRoute.map(([title, detail, url]) => `
    <li class="route-item reveal">
      <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">
        <span><strong>${escapeHtml(title)}</strong><span>${escapeHtml(detail)}</span></span>
      </a>
    </li>`).join('');

  document.querySelector('#culture-links').innerHTML = guide.culture.map(([label, url]) => `
    <a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`).join('');

  document.querySelectorAll('.reveal, .place-card').forEach((element) => observer.observe(element));
}

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
observer.observe(document.querySelector('.hero-scroll-mark'));
renderGuide();
updateScrollMotion();
