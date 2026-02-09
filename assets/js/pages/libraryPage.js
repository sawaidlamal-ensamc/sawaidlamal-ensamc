import { fetchJson } from '../utils/fetchJson.js';
import { createBookCard } from '../components/cards.js';
import { createTestimonialCard } from '../components/cards.js';


let booksCache = [];
let featuredCache = [];
let testimonialsCache = [];
let currentPage = 1;
const pageSize = 8; 
let currentFiltered = [];


async function loadTestimonials() {
  try {
    const url = new URL('../../../data/testimonials.json', import.meta.url);
    testimonialsCache = await fetchJson(url);
  } catch (e) {
    console.error('Testimonials JSON error:', e);
    testimonialsCache = [];
  }
}

async function loadBooks() {
    try {
    const booksUrl = new URL('../../../data/books.json', import.meta.url);
    booksCache = await fetchJson(booksUrl);
  } catch (err) {
    console.error('Books JSON error:', err);
    booksCache = [];
  }
  
}

function renderTestimonials() {
  const wrapper = document.getElementById('testimonial-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = '';

  testimonialsCache.forEach((t) => {
    wrapper.appendChild(createTestimonialCard(t));
  });

  // update swiper 
  if (window.swiperTestimonials) {
  window.swiperTestimonials.loopDestroy();
  window.swiperTestimonials.loopCreate();
  window.swiperTestimonials.update();
  window.swiperTestimonials.slideToLoop(0);
  window.swiperTestimonials.autoplay?.start();
  }
}




function renderFeatured() {
  const wrapper = document.getElementById('featured-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = '';

  featuredCache.forEach((book) => {
    const card = createBookCard({
      title: book.title,
      price: book.price,
      image: book.image,
      category: book.category,
      asSlide: true,
      onGetNow: () => window.redirectToForm(book)
    });

    wrapper.appendChild(card);
  });

  // Update swiper after injecting slides
  if (window.swiperFeatured) {
    window.swiperFeatured.update();
    window.swiperFeatured.slideToLoop(0);
  }
}

function setupFeaturedCategoryFilter() {
  const buttons = document.querySelectorAll('.category_button');
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.dataset.category || 'all';
      const cards = document.querySelectorAll('#featured-wrapper .featured_card');

      cards.forEach((card) => {
        const cardCat = card.dataset.category;
        card.style.display = (category === 'all' || cardCat === category) ? 'block' : 'none';
      });

      if (window.swiperFeatured) {
        window.swiperFeatured.update();
        window.swiperFeatured.slideToLoop(0);
      }
    });
  });
}


function renderPagination(totalPages, page) {
  const paginationEl = document.getElementById('pagination');
  if (!paginationEl) return;

  // If 1 page hide 
  if (totalPages <= 1) {
    paginationEl.innerHTML = '';
    return;
  }

  paginationEl.innerHTML = '';

  const makeBtn = (label, targetPage, disabled = false, active = false) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.className = `page_btn${active ? ' active' : ''}`;
    btn.disabled = disabled;

    btn.addEventListener('click', () => {
      renderSearchResults(currentFiltered, targetPage);
      document.getElementById('featured-results')?.scrollIntoView({ behavior: 'smooth' });
    });

    return btn;
  };

  paginationEl.appendChild(makeBtn('Prev', page - 1, page === 1));

  for (let p = 1; p <= totalPages; p++) {
    paginationEl.appendChild(makeBtn(String(p), p, false, p === page));
  }

  paginationEl.appendChild(makeBtn('Next', page + 1, page === totalPages));
}


//  add a  pagination to this
function renderSearchResults(books, page = 1) {
  const resultsContainer = document.getElementById('results');
  const paginationEl = document.getElementById('pagination');
  if (!resultsContainer) return;

  currentFiltered = Array.isArray(books) ? books : [];
  currentPage = page;

  resultsContainer.innerHTML = '';

  if (currentFiltered.length === 0) {
    resultsContainer.innerHTML = '<p>No results found</p>';
    if (paginationEl) paginationEl.innerHTML = '';
    return;
  }

  const totalPages = Math.ceil(currentFiltered.length / pageSize);
  const safePage = Math.min(Math.max(1, page), totalPages);

  const start = (safePage - 1) * pageSize;
  const pageItems = currentFiltered.slice(start, start + pageSize);

  pageItems.forEach((book) => {
    const card = createBookCard({
      type: 'featured', // or whatever style you want for results
      title: book.title,
      price: book.price,
      image: book.image,
      category: book.category,
      onGetNow: () => window.redirectToForm(book)
    });
    resultsContainer.appendChild(card);
  });

  renderPagination(totalPages, safePage);
}


function filterBooks() {
  const titleInput = (document.getElementById('search-input')?.value || '').toLowerCase();
  const categoryInput = (document.getElementById('category-select')?.value || '').toLowerCase();

  const filtered = booksCache.filter((book) => {
    const matchesTitle = (book.title || '').toLowerCase().includes(titleInput);
    const matchesCategory = !categoryInput || (book.category || '').toLowerCase() === categoryInput;
    return matchesTitle && matchesCategory;
  });

  renderSearchResults(filtered , 1);
}

function getLatestBooks(allBooks, count) {
  return [...allBooks]
    .filter(b => b && Number.isFinite(Number(b.id)))
    .sort((a, b) => Number(b.id) - Number(a.id)) // biggest id first
    .slice(0, count);
}

function renderNewBooksLatest() {
  const wrap1 = document.getElementById('new-wrapper');
  const wrap2 = document.getElementById('new-wrapper-2');

  // choose how many 
  const count = 12;
  const latest = getLatestBooks(booksCache, count);

  if (wrap1) {
    wrap1.innerHTML = '';
    latest.slice(0, Math.floor(count / 2)).forEach(book => {
      wrap1.appendChild(createBookCard({
        type:'new',
        title: book.title,
        price: book.price,
        image: book.image,
        category: book.category,
        asSlide: true, 
        onGetNow: () => window.redirectToForm(book)
      }));
    });
  }

  if (wrap2) {
    wrap2.innerHTML = '';
    latest.slice(Math.floor(count / 2), count).forEach(book => {
      wrap2.appendChild(createBookCard({
        type: 'new',
        title: book.title,
        price: book.price,
        image: book.image,
        category: book.category,
        asSlide: true,
        onGetNow: () => window.redirectToForm(book)
      }));
    });
  }

if (window.swiperNew) {

  //wrap 1 

  window.swiperNew[0].loopDestroy();
  window.swiperNew[0].loopCreate();
  window.swiperNew[0].update();
  window.swiperNew[0].slideToLoop(0);
  window.swiperNew[0].autoplay?.start();

  // wrap 2 


  window.swiperNew[1].loopDestroy();
  window.swiperNew[1].loopCreate();
  window.swiperNew[1].update();
  window.swiperNew[1].slideToLoop(0);
  window.swiperNew[1].autoplay?.start();
}
}


async function main() {

  await loadBooks();
  await loadTestimonials();
  // featured list
  featuredCache = booksCache.filter(b => b.featured === true);

  // render featured 
  renderFeatured();

  // enable filter buttons
  setupFeaturedCategoryFilter();
  
  // Make the existing inline HTML handlers work
  window.searchBooks = filterBooks;

  // render  books 
  renderSearchResults(booksCache,1);

  //render testimonials
  renderTestimonials();

  //render the Latest Books 
  renderNewBooksLatest()
}

document.addEventListener('DOMContentLoaded', main);
