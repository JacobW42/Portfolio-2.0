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

// Track scroll direction
let lastScrollY = window.scrollY;
let wasOutOfView = true;

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
});

// Split each .line into .word spans
document.querySelectorAll('.line').forEach(line => {
  const childNodes = Array.from(line.childNodes);
  line.innerHTML = ''; // Clear existing

  childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.trim().split(/\s+/);
      words.forEach(word => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word + ' ';
        line.appendChild(span);
      });
    } else {
      // Keep highlights and wrap in word span
      const wrapper = document.createElement('span');
      wrapper.className = 'word';
      wrapper.appendChild(node);
      line.appendChild(wrapper);
    }
  });
});

// Animation logic
const hero = document.querySelector('.hero');
const words = hero.querySelectorAll('.word');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const fullyOut = entry.intersectionRatio === 0;
    const partiallyIn = entry.intersectionRatio > 0.1;

    if (fullyOut) {
      wasOutOfView = true;
      words.forEach(word => word.classList.remove('show-word'));
    }

    if (partiallyIn && wasOutOfView) {
      wasOutOfView = false;

      words.forEach((word, i) => {
        word.classList.remove('show-word');
        void word.offsetWidth;
        setTimeout(() => {
          word.classList.add('show-word');
        }, i * 75); // Spread timing between words
      });
    }
  });
}, {
  threshold: [0, 0.1]
});

observer.observe(hero);
