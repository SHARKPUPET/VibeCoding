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

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click',e=>{
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      // close nav on mobile
      if(window.innerWidth <= 760 && navList) navList.style.display = 'none';
    });
  });
});
