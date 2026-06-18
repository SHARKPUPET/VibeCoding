document.addEventListener('DOMContentLoaded',()=>{
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  const themeToggle = document.getElementById('themeToggle');

  menuToggle && menuToggle.addEventListener('click',()=>{
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
  });

  // Persist theme in localStorage
  const current = localStorage.getItem('theme') || 'dark';
  if(current === 'light') document.body.setAttribute('data-theme','light');

  themeToggle && themeToggle.addEventListener('click',()=>{
    const isLight = document.body.getAttribute('data-theme') === 'light';
    if(isLight){
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme','dark');
    } else {
      document.body.setAttribute('data-theme','light');
      localStorage.setItem('theme','light');
    }
  });

  const smoothScrollTo = (element, duration = 800) => {
    const startY = window.scrollY;
    const targetY = element.getBoundingClientRect().top + startY - 24;
    const distance = targetY - startY;
    let startTime = null;
    const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = timestamp => {
      if (!startTime) startTime = timestamp;
      const time = Math.min(1, (timestamp - startTime) / duration);
      window.scrollTo(0, startY + distance * ease(time));
      if (time < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click',e=>{
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if(target) smoothScrollTo(target, 900);
      // close nav on mobile
      if(window.innerWidth <= 760 && navList) navList.style.display = 'none';
    });
  });

  // Parallax scroll effect on cards
  window.addEventListener('scroll',()=>{
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, idx)=>{
      const rect = card.getBoundingClientRect();
      const offset = scrolled * 0.3 + idx * 5;
      card.style.setProperty('--scroll-offset', offset + 'px');
    });
  });

  // List all content dynamically
  const displayContent = () => {
    const sections = document.querySelectorAll('section[id]');
    console.log('📋 Page Content Overview:');
    sections.forEach(section => {
      const title = section.querySelector('h2')?.textContent || 'Untitled';
      const items = section.querySelectorAll('.item, .chip, .link-card');
      console.log(`\n${title.toUpperCase()}:`);
      items.forEach(item => {
        const content = item.textContent.trim();
        console.log(`  ✓ ${content}`);
      });
    });
  };

  displayContent();

  // Set nav list indices for staggered animation
  document.querySelectorAll('.nav-list li').forEach((li, idx) => {
    li.style.setProperty('--index', idx);
  });
});
