document.addEventListener('DOMContentLoaded',function(){
  // Looping typing effect for hero title (type, pause, delete, repeat)
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const text = "Hello, I'm Jayson.";
    const typeSpeed = 70; // ms per char typing
    const deleteSpeed = 40; // ms per char deleting
    const pauseAfterType = 900; // ms pause when typed
    const pauseAfterDelete = 400; // ms pause after deleted
    let index = 0;
    let isDeleting = false;

    function tick() {
      typedEl.textContent = text.substring(0, index);

      if (!isDeleting) {
        if (index < text.length) {
          index++;
          setTimeout(tick, typeSpeed);
        } else {
          isDeleting = true;
          setTimeout(tick, pauseAfterType);
        }
      } else {
        if (index > 0) {
          index--;
          setTimeout(tick, deleteSpeed);
        } else {
          isDeleting = false;
          setTimeout(tick, pauseAfterDelete);
        }
      }
    }

    tick();
  }
  // year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle for mobile
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  navToggle && navToggle.addEventListener('click',function(){
    nav.classList.toggle('open');
    const expanded = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', expanded);
    // prevent page scroll when menu is open
    if(expanded){
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  });

  // close nav when a link is clicked (mobile)
  nav && nav.addEventListener('click',function(e){
    if(e.target.tagName === 'A'){
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });

  // simple gallery lightbox
  const gallery = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, alt){
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.setAttribute('aria-hidden','false');
  }

  function closeLightbox(){
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
  }

  gallery && gallery.addEventListener('click',function(e){
    const img = e.target.closest('img');
    if(!img) return;
    openLightbox(img.src,img.alt);
  });

  // Also support certificate images (cert-grid) and any other image cards
  document.addEventListener('click', function(e){
    const img = e.target.closest('.cert img, .gallery-grid img');
    if(!img) return;
    openLightbox(img.src, img.alt);
  });

  // Setup infinite carousels for skills: duplicate track content for seamless scroll
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(car => {
    const track = car.querySelector('.carousel-track');
    if(!track) return;
    // set CSS speed from data-speed attribute if present
    const speed = car.getAttribute('data-speed');
    if(speed) track.style.setProperty('--speed', speed);
    // duplicate inner content so we can scroll seamlessly
    // if already duplicated, skip
    if(track.dataset.duplicated !== 'true'){
      const clone = track.innerHTML;
      // ensure we duplicate enough so the visible area is filled
      track.innerHTML = track.innerHTML + clone;
      track.dataset.duplicated = 'true';
    }
  });

  // Tour card toggle behavior: expand/collapse details
  const tour = document.querySelector('.tour-cards');
  if(tour){
    tour.addEventListener('click', function(e){
      const btn = e.target.closest('.tour-toggle');
      if(!btn) return;
      const card = btn.closest('.tour-card');
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      if(panel){
        panel.hidden = isOpen;
      }
      card.classList.toggle('open', !isOpen);
    });

    // keyboard accessibility: Enter or Space to toggle when focusing the button
    tour.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        const btn = e.target.closest('.tour-toggle');
        if(btn){
          e.preventDefault();
          btn.click();
        }
      }
    });
  }

  lightboxClose && lightboxClose.addEventListener('click',closeLightbox);
  lightbox && lightbox.addEventListener('click',function(e){
    if(e.target === lightbox) closeLightbox();
  });

  // close on escape (also close mobile nav if open)
  document.addEventListener('keyup',function(e){
    if(e.key === 'Escape'){
      closeLightbox();
      if(nav && nav.classList.contains('open')){
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        if(navToggle) navToggle.setAttribute('aria-expanded','false');
      }
    }
  });
});
