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

// Split each .line in .hero into .word spans only
document.querySelectorAll('.hero .line').forEach(line => {
  const childNodes = Array.from(line.childNodes);
  line.innerHTML = ''; // Clear existing content

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


// Hero Fade-in effect
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

// Split non-hero .line elements into letter spans
document.querySelectorAll('.line:not(.hero .line)').forEach(line => {
  const childNodes = Array.from(line.childNodes);
  line.innerHTML = ''; // Clear content

  childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const letters = node.textContent.split('');
      letters.forEach(letter => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        line.appendChild(span);
      });
    } else {
      // Keep elements like <span class="highlight"> intact
      const wrapper = document.createElement('span');
      wrapper.className = 'letter';
      wrapper.appendChild(node);
      line.appendChild(wrapper);
    }
  });
});

// Animate letters in non-hero lines
const otherLines = document.querySelectorAll('.line:not(.hero .line)');

otherLines.forEach(line => {
  const letters = line.querySelectorAll('.letter');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate each letter with a slight delay
        letters.forEach((letter, i) => {
          setTimeout(() => {
            letter.classList.add('show-letter');
          }, i * 30);
        });

        // Stop observing so it doesn't run again
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
  });

  observer.observe(line);
});


// Grow-in effect for elements
observer.observe(hero);

const growElements = document.querySelectorAll('.grow-in');

const growObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.5, // start effect when 50% visible
});

growElements.forEach(el => growObserver.observe(el));