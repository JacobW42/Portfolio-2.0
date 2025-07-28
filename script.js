const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
  if (!navLinks.contains(event.target) && !toggleBtn.contains(event.target)) {
    navLinks.classList.remove('active');
  }
});