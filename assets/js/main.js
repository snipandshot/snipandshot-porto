const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Header: solid after scrolling past the top ---------- */
const header = $(".site-header");
const hero = $(".hero");
const updateHeader = () =>
  header.classList.toggle("is-solid", window.scrollY > hero.offsetHeight - 120);
addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* ---------- Mobile menu ---------- */
const menuBtn = $(".menu-btn");
const nav = $(".main-nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.textContent = open ? "Close" : "Menu";
  header.classList.add("is-solid");
});
$$("a", nav).forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuBtn.setAttribute("aria-expanded", false);
  menuBtn.textContent = "Menu";
}));

/* ---------- Highlight the menu item for the section on screen ---------- */
const links = $$(".main-nav a");
const sections = links.map(a => $(a.getAttribute("href")));
const sectionWatcher = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => s && sectionWatcher.observe(s));

/* ---------- Hero slideshow ---------- */
const slides = $$(".slide");
const dotsBox = $(".hero-dots");
let slideIndex = 0;
let timer;
slides.forEach((_, i) => {
  const b = document.createElement("button");
  b.setAttribute("aria-label", `Show photo ${i + 1}`);
  b.addEventListener("click", () => { goTo(i); restart(); });
  dotsBox.append(b);
});
const dots = $$("button", dotsBox);
function goTo(i) {
  slideIndex = (i + slides.length) % slides.length;
  slides.forEach((s, n) => s.classList.toggle("is-active", n === slideIndex));
  dots.forEach((d, n) => d.setAttribute("aria-current", n === slideIndex));
}
function restart() {
  clearInterval(timer);
  if (!reduceMotion) timer = setInterval(() => goTo(slideIndex + 1), 5500);
}
$(".hero-prev").addEventListener("click", () => { goTo(slideIndex - 1); restart(); });
$(".hero-next").addEventListener("click", () => { goTo(slideIndex + 1); restart(); });
addSwipe(hero, dir => { goTo(slideIndex + dir); restart(); });
goTo(0);
restart();

/* ---------- Portfolio tabs + grid ---------- */
const tabsBox = $(".tabs");
const grid = $(".grid");
CATEGORIES.forEach((c, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<button type="button" data-cat="${c.id}" aria-pressed="${i === 0}">${c.label}</button>`;
  tabsBox.append(li);
});
const tabButtons = $$("button", tabsBox);
tabButtons.forEach(b => b.addEventListener("click", () => showCategory(b.dataset.cat)));

function renderGrid(cat) {
  grid.innerHTML = "";
  ALBUMS.forEach((album, index) => {
    if (album.category !== cat) return;
    const card = document.createElement("button");
    card.type = "button";
    card.className = "album-card" + (album.tall ? " tall" : "");
    card.innerHTML = `<img src="${album.cover}" alt="${album.title}" loading="lazy">
                      <span class="caption">${album.title}</span>`;
    card.addEventListener("click", () => openAlbum(index));
    grid.append(card);
  });
}
function showCategory(cat) {
  tabButtons.forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === cat));
  if (reduceMotion) return renderGrid(cat);
  grid.classList.add("is-switching");
  setTimeout(() => { renderGrid(cat); grid.classList.remove("is-switching"); }, 250);
}
renderGrid(CATEGORIES[0].id);

/* ---------- Album viewer ---------- */
const albumViewer = $(".album-viewer");
const albumPhotos = $(".album-photos");
let currentAlbum = null;
let returnFocus = null;

function openAlbum(index) {
  currentAlbum = ALBUMS[index];
  returnFocus = document.activeElement;
  $("h2", albumViewer).textContent = currentAlbum.title;
  albumPhotos.innerHTML = "";
  currentAlbum.photos.forEach((src, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.innerHTML = `<img src="${src}" alt="${currentAlbum.title}, photo ${i + 1}" loading="lazy">`;
    b.addEventListener("click", () => openPhoto(i));
    albumPhotos.append(b);
  });
  albumViewer.scrollTop = 0;
  albumViewer.classList.add("is-open");
  document.body.style.overflow = "hidden";
  $(".close-btn", albumViewer).focus();
}
function closeAlbum() {
  albumViewer.classList.remove("is-open");
  document.body.style.overflow = "";
  if (returnFocus) returnFocus.focus();
}
$(".close-btn", albumViewer).addEventListener("click", closeAlbum);

/* ---------- Single photo viewer ---------- */
const photoViewer = $(".photo-viewer");
const bigImg = $("img", photoViewer);
let photoIndex = 0;
function showPhoto(i) {
  const list = currentAlbum.photos;
  photoIndex = (i + list.length) % list.length;
  bigImg.src = list[photoIndex];
  bigImg.alt = `${currentAlbum.title}, photo ${photoIndex + 1}`;
  $(".photo-count", photoViewer).textContent = `${photoIndex + 1} / ${list.length}`;
}
function openPhoto(i) {
  showPhoto(i);
  photoViewer.classList.add("is-open");
  $(".close-btn", photoViewer).focus();
}
function closePhoto() {
  photoViewer.classList.remove("is-open");
  const thumb = $$("button", albumPhotos)[photoIndex];
  if (thumb) thumb.focus();
}
$(".close-btn", photoViewer).addEventListener("click", closePhoto);
$(".photo-prev").addEventListener("click", () => showPhoto(photoIndex - 1));
$(".photo-next").addEventListener("click", () => showPhoto(photoIndex + 1));
photoViewer.addEventListener("click", e => { if (e.target === photoViewer) closePhoto(); });
addSwipe(photoViewer, dir => showPhoto(photoIndex + dir));

/* ---------- Keyboard ---------- */
addEventListener("keydown", e => {
  if (photoViewer.classList.contains("is-open")) {
    if (e.key === "Escape") closePhoto();
    if (e.key === "ArrowRight") showPhoto(photoIndex + 1);
    if (e.key === "ArrowLeft") showPhoto(photoIndex - 1);
  } else if (albumViewer.classList.contains("is-open")) {
    if (e.key === "Escape") closeAlbum();
  }
});

/* ---------- Footer year ---------- */
$("#year").textContent = new Date().getFullYear();

/* ---------- Helper: swipe left/right on touch screens ---------- */
function addSwipe(el, onSwipe) {
  let x = 0;
  el.addEventListener("touchstart", e => { x = e.touches[0].clientX; }, { passive: true });
  el.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - x;
    if (Math.abs(dx) > 50) onSwipe(dx < 0 ? 1 : -1);
  });
}
