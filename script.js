// Menu drop down
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


// Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
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

// Skills section toggle between slider and list view
const toggleBtn = document.getElementById('view-toggle');
const carousel = document.querySelector('.skills-carousel');
const skillsList = document.getElementById('skills-list');
const listItems = skillsList.querySelectorAll('.skill-item');

// Show carousel by default
carousel.style.display = 'block';
skillsList.style.display = 'none';

toggleBtn.addEventListener('click', () => {
  const isCarouselVisible = carousel.style.display === 'block';

  if (isCarouselVisible) {
    // Hide carousel, show list
    carousel.style.display = 'none';
    skillsList.style.display = 'block';

    // Reset visibility of list items
    listItems.forEach(item => item.classList.remove('visible'));

    // Animate list items one by one
    listItems.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, i * 100); // Staggered animation
    });

    toggleBtn.textContent = 'Slider View';
  } else {
    // Hide list, show carousel
    skillsList.style.display = 'none';
    carousel.style.display = 'block';
    toggleBtn.textContent = 'List View';
  }
});

// Thank you message
const form = document.getElementById('contact-form');
const thankYou = document.getElementById('thank-you-message');
const formWrapper = document.getElementById('form-wrapper');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form action

  // Use AJAX to submit form to Formspree
  const data = new FormData(form);
  fetch(form.action, {
    method: 'POST',
    body: data,
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        formWrapper.style.display = 'none';
        thankYou.classList.remove('hidden');
      } else {
        alert("There was a problem submitting the form.");
      }
    })
    .catch(() => {
      alert("Something went wrong!");
    });
});

// PDF Modal functionality
// Handle clicks for both Resume and Certification buttons
document.querySelectorAll('.btn[href$=".png"]').forEach(button => {
  button.addEventListener('click', function(e) { 
    e.preventDefault();
    document.getElementById('resume-image').src = this.getAttribute('href');
    document.getElementById('pdf-modal').style.display = 'block';
  });
});
// Close modal
document.getElementById('close-modal').addEventListener('click', function() {
  document.getElementById('pdf-modal').style.display = 'none';
});
// Close if clicking outside content
window.addEventListener('click', function(e) {
  if (e.target === document.getElementById('pdf-modal')) {
    document.getElementById('pdf-modal').style.display = 'none';
  }
});
// Print image
document.getElementById('print-pdf').addEventListener('click', function() {
  const imgSrc = document.getElementById('resume-image').src;
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`<img src="${imgSrc}" style="width:100%">`);
  printWindow.document.close();
  printWindow.print();
});



