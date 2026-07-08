document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav
  const navBtn = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('sidebar-navigation');
  navBtn.addEventListener('click', function() {
    navLinks.classList.toggle('show');
    let expanded = navBtn.getAttribute('aria-expanded') === 'true';
    navBtn.setAttribute('aria-expanded', !expanded);
  });

  // Close mobile nav on click outside
  document.body.addEventListener('click', function(e){
    if(navLinks.classList.contains('show') && !navLinks.contains(e.target) && !navBtn.contains(e.target)) {
      navLinks.classList.remove('show');
      navBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetID = this.getAttribute('href').slice(1);
      if (targetID && document.getElementById(targetID)) {
        document.getElementById(targetID).scrollIntoView({ behavior: 'smooth' });
        e.preventDefault();
      }
    });
  });

  // FAQ Accordion
  document.querySelectorAll('.faq-list .faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
      const li = btn.parentElement;
      li.classList.toggle('open');
      const exp = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !exp);
      // Close others for accessibility
      document.querySelectorAll('.faq-list li').forEach(other => {
        if(other !== li) {
          other.classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  // Simple reviews carousel on wide screens
  let reviews = document.querySelectorAll('.reviews-carousel .review');
  if(reviews.length>1) {
    let active = 0;
    setInterval(()=>{
      reviews[active].classList.remove('active');
      active = (active+1)%reviews.length;
      reviews[active].classList.add('active');
    }, 6000);
  }

  // Scroll-to-top visibility
  const scrollBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', function() {
    if(window.scrollY > 200) scrollBtn.style.display = 'flex';
    else scrollBtn.style.display = 'none';
  });
  scrollBtn.style.display = 'none';
  // Simple form handler placeholder (does nothing for demo)
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Vielen Dank für deine Anfrage – Wir melden uns schnellstmöglich!');
    form.reset();
  });
});
