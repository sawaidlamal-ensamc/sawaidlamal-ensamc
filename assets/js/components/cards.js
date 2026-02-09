function el(tag, { className, attrs } = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  }
  return node;
}

export function createTeamMemberCard({ name, position, image }) {
  const wrapper = el('div', { className: 'team-member' });

  const profilePic = el('div', { className: 'profile-pic' });
  const img = el('img', {
    attrs: {
      src: image || './assets/img/logo/person.jpg',
      alt: 'club sawaid al amal ensam casablanca'
    }
  });
  profilePic.appendChild(img);

  const info = el('div', { className: 'member-info' });
  const h3 = el('h3', { className: 'name' });
  h3.textContent = name || '';
  const p = el('p', { className: 'position' });
  p.textContent = position || '';

  info.appendChild(h3);
  info.appendChild(p);

  wrapper.appendChild(profilePic);
  wrapper.appendChild(info);

  return wrapper;
}

//  =============== category for search section , asSlide for featured section , type for new section ====================
export function createBookCard({
  type = 'featured',     // 'featured' | 'new'
  title,
  price,
  image,
  category,
  onGetNow,
  asSlide = false
}) {
  // basic verification
  if (!['featured', 'new'].includes(type)) {
    const wrong = el('div', { className: 'wrong_type' });
    wrong.textContent = 'wrong type';
    return wrong;
  }

  const isFeatured = type === 'featured';

  const cardTag = isFeatured ? 'article' : 'a';

  const cardAttrs = isFeatured
    ? {}
    : { href: '#' };

  const card = el(cardTag, {
    className: [
      `${type}_card`,
      asSlide ? 'swiper-slide' : ''
    ].filter(Boolean).join(' '),
    attrs: cardAttrs
  });

  if (!isFeatured) {
    card.addEventListener('click', (e) => e.preventDefault());
  }

  // category is mainly useful for featured filtering,
  if (category) card.dataset.category = category;

  // Image class 
  const imgEl = el('img', {
    className: `${type}_img`,
    attrs: { src: image || '', alt: isFeatured ? 'book' : 'image' }
  });

  //  Title class
  const titleEl = el('h2', { className: `${type}_title` });
  titleEl.textContent = title || '';

  //  Price wrapper
  const pricesWrap = el('div', { className: `${type}_prices` });
  const discount = el('span', { className: `${type}_discount` });
  discount.textContent = price || '';
  pricesWrap.appendChild(discount);

  
  let btnWrap = null;
  if (isFeatured) {
    const btn = el('button', { className: 'button' });
    btn.type = 'button';
    btn.textContent = 'Get Now';
    if (typeof onGetNow === 'function') btn.addEventListener('click', onGetNow);

    btnWrap = el('a', { attrs: { href: '#' } });
    btnWrap.addEventListener('click', (e) => e.preventDefault());
    btnWrap.appendChild(btn);
  } else {

    if (typeof onGetNow === 'function') {
      card.addEventListener('click', onGetNow);
    }
  }

  card.appendChild(imgEl);

  if (isFeatured) {
    card.appendChild(titleEl);
    card.appendChild(pricesWrap);
    if (btnWrap) card.appendChild(btnWrap);
  } else {

  
    const inner = el('div');
    inner.appendChild(titleEl);
    inner.appendChild(pricesWrap);
    card.appendChild(inner);
  }

  return card;
}



export function createTestimonialCard({ name, image, text, stars = 5 }) {
  const card = el('article', { className: 'testimonial_card swiper-slide' });

  const imgEl = el('img', {
    className: 'testimonial_img',
    attrs: { src: image || '', alt: `testimonial ${name || ''}` }
  });

  const title = el('h2', { className: 'testimonial_title' });
  title.textContent = name || 'Anonymous';

  const desc = el('p', { className: 'testimonial_description' });
  desc.textContent = text || '';

  const starsWrap = el('div', { className: 'testimonial_stars' });
  const count = Math.max(0, Math.min(5, Number(stars) || 0));
  for (let i = 0; i < count; i++) {
    const starIcon = el('i', { className: 'ri-star-fill' });
    starsWrap.appendChild(starIcon);
  }

  card.appendChild(imgEl);
  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(starsWrap);

  return card;
}


