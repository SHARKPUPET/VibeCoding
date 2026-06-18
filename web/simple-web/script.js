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
    console.log('%c📋 PAGE CONTENT OVERVIEW', 'color: #7c5cf0; font-size: 16px; font-weight: bold;');
    console.log('%c========================================', 'color: #38bdf8; font-size: 12px;');
    
    sections.forEach((section, idx) => {
      const title = section.querySelector('h2')?.textContent || 'Untitled';
      const items = section.querySelectorAll('.item, .chip, .link-card, .exp-item, .project-card, .achievement, .testimonial, .education-item');
      
      console.log(`\n%c${title.toUpperCase()}`, 'color: #38bdf8; font-weight: bold; font-size: 13px;');
      
      if(items.length > 0) {
        items.forEach((item, itemIdx) => {
          let content = '';
          if(item.classList.contains('item') || item.classList.contains('chip') || item.classList.contains('link-card')) {
            content = item.textContent.trim();
          } else if(item.classList.contains('exp-item')) {
            const h3 = item.querySelector('h3')?.textContent;
            const date = item.querySelector('.exp-date')?.textContent;
            content = `${h3} (${date})`;
          } else if(item.classList.contains('project-card')) {
            content = item.querySelector('h3')?.textContent;
          } else if(item.classList.contains('achievement')) {
            content = item.querySelector('h3')?.textContent;
          } else if(item.classList.contains('testimonial')) {
            content = item.querySelector('.author')?.textContent;
          } else if(item.classList.contains('education-item')) {
            content = item.querySelector('h3')?.textContent;
          }
          console.log(`  ✓ ${content}`);
        });
      } else {
        const text = section.textContent.substring(0, 80);
        console.log(`  ℹ ${text}...`);
      }
    });
    
    console.log(`\n%c========================================`, 'color: #38bdf8; font-size: 12px;');
    console.log('%c✨ Content fully loaded and animated!', 'color: #f97316; font-weight: bold;');
  };

  displayContent();

  // Set nav list indices for staggered animation
  document.querySelectorAll('.nav-list li').forEach((li, idx) => {
    li.style.setProperty('--index', idx);
  });
});
