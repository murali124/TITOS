import { menuItems, galleryImages } from './data.js';

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
});

// Text always enters the DOM via textContent, so future database values are not HTML.
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function icon(name, className = '') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', `icon ${className}`.trim());
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#icon-${name}`);
  svg.append(use);
  return svg;
}

// Resolve local paths against the page, while supporting future hosted images.
// Local files must not receive image-CDN resize parameters or invented variants.
function imageUrl(value) {
  try {
    const url = new URL(value, document.baseURI);
    if (!['https:', 'http:'].includes(url.protocol)) return '';
    return url.href;
  } catch {
    return '';
  }
}

const menuGrid = document.querySelector('#menu-grid');
const menuStatus = document.querySelector('#menu-status');
const filters = [...document.querySelectorAll('.filter-button')];

function renderMenu(items) {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const card = element('article', `menu-card${item.is_featured ? ' is-featured' : ''}`);
    const category = element('div', 'menu-card-category');
    if (typeof item.is_veg === 'boolean') {
      const dot = element('span', `dietary-dot ${item.is_veg ? 'veg' : 'non-veg'}`);
      dot.setAttribute('role', 'img');
      dot.setAttribute('aria-label', item.is_veg ? 'Vegetarian' : 'Non-vegetarian');
      category.append(dot);
    } else {
      category.append(icon('cocktail', 'drink-icon'));
    }
    category.append(element('span', '', item.category));
    if (item.is_featured) category.append(icon('star', 'featured-star'));
    const titleRow = element('div', 'menu-card-title-row');
    titleRow.append(element('h3', '', item.name), element('span', 'menu-price', currency.format(item.price)));
    card.append(category, titleRow, element('p', 'menu-description', item.description));
    if (item.is_featured && item.label) card.append(element('span', 'menu-label', item.label));
    fragment.append(card);
  });
  if (!items.length) fragment.append(element('p', 'empty-state', 'Something delicious is on its way. Please ask our team for today’s selection.'));
  menuGrid.replaceChildren(fragment);
}

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle('is-active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    const filtered = category === 'All' ? menuItems : menuItems.filter((item) => item.category === category);
    renderMenu(filtered);
    menuStatus.textContent = `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'} shown${category === 'All' ? ' across all categories' : ` in ${category}`}.`;
  });
});

const dialog = document.querySelector('#gallery-dialog');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let currentPhoto = 0;
let previousBodyOverflow = '';
let galleryOpener = null;

function showPhoto(index) {
  currentPhoto = (index + galleryImages.length) % galleryImages.length;
  const photo = galleryImages[currentPhoto];
  lightboxImage.src = imageUrl(photo.image_url);
  lightboxImage.alt = photo.alt_text;
  lightboxCaption.textContent = photo.caption;
  document.querySelector('#lightbox-counter').textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${String(galleryImages.length).padStart(2, '0')}`;
}

function openLightbox(index, opener) {
  galleryOpener = opener;
  showPhoto(index);
  previousBodyOverflow = document.body.style.overflow;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}

function renderGallery(images) {
  const fragment = document.createDocumentFragment();
  images.forEach((photo, index) => {
    const button = element('button', 'gallery-item');
    button.type = 'button';
    button.setAttribute('aria-label', `View photo: ${photo.caption}`);
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'gallery-dialog');
    const image = element('img');
    image.src = imageUrl(photo.image_url);
    image.alt = photo.alt_text;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 850;
    image.height = 650;
    const overlay = element('span', 'gallery-overlay');
    overlay.append(element('span', '', photo.category), icon('expand'));
    button.append(image, overlay);
    button.addEventListener('click', () => openLightbox(index, button));
    fragment.append(button);
  });
  document.querySelector('#gallery-grid').replaceChildren(fragment);
}

document.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
document.querySelector('#previous-photo').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.querySelector('#next-photo').addEventListener('click', () => showPhoto(currentPhoto + 1));

// Only a click outside the dialog rectangle dismisses it, not clicks on its padding.
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = previousBodyOverflow;
  galleryOpener?.focus({ preventScroll: true });
});

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const mobileBreakpoint = window.matchMedia('(max-width: 900px)');

function setNavigation(open, restoreFocus = false) {
  mobileNav.hidden = !open;
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  if (restoreFocus) navToggle.focus();
}

navToggle.addEventListener('click', () => setNavigation(navToggle.getAttribute('aria-expanded') !== 'true'));
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setNavigation(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileNav.hidden) setNavigation(false, true);
});
document.addEventListener('click', (event) => {
  if (!mobileNav.hidden && !event.target.closest('.site-header')) setNavigation(false);
});
document.addEventListener('focusin', (event) => {
  if (!mobileNav.hidden && !event.target.closest('.site-header')) setNavigation(false);
});
mobileBreakpoint.addEventListener('change', () => setNavigation(false));

// The short footer cannot always reach an observer's activation band.
// Select the final section at the page bottom as well as by scroll position.
const navigationLinks = [...document.querySelectorAll('.desktop-nav a, .mobile-nav a')];
const navigationSections = [...document.querySelectorAll('#home, #menu, #gallery, #contact')];
let navigationFrame = null;

function updateActiveNavigation() {
  navigationFrame = null;
  const activationLine = document.querySelector('.site-header').getBoundingClientRect().height + 40;
  let activeSection = navigationSections[0];
  for (const section of navigationSections) {
    if (section.getBoundingClientRect().top <= activationLine) activeSection = section;
  }
  if (window.scrollY > 0 && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2) {
    activeSection = navigationSections.at(-1);
  }
  navigationLinks.forEach((link) => {
    if (link.hash === `#${activeSection.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function scheduleNavigationUpdate() {
  if (navigationFrame === null) navigationFrame = window.requestAnimationFrame(updateActiveNavigation);
}

window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
window.addEventListener('load', scheduleNavigationUpdate);

renderMenu(menuItems);
renderGallery(galleryImages);
document.querySelector('#current-year').textContent = String(new Date().getFullYear());
scheduleNavigationUpdate();