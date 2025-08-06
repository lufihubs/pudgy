// Enhanced Smooth Scrolling and Advanced Animations
document.addEventListener('DOMContentLoaded', function() {
  // Advanced smooth scrolling with custom easing
  const smoothScroll = (target, duration = 1200) => {
    const targetSection = document.querySelector(target);
    if (!targetSection) return;

    const targetPosition = targetSection.offsetTop - 80; // Offset for better positioning
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Advanced easing function for smoother animation
    const easeInOutCubic = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  // Disabled scroll-triggered animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  // Create disabled observers (no animations)
  const fadeUpObserver = new IntersectionObserver((entries) => {
    // Animations disabled - do nothing
  }, observerOptions);

  const scaleInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      // Animations disabled - do nothing
    });
  }, observerOptions);

  const slideInObserver = new IntersectionObserver((entries) => {
    // Animations disabled - do nothing
  }, observerOptions);

  // Apply no animations to elements - they remain static
  const aboutCards = document.querySelectorAll('.about-card');
  // Remove animation classes and observers

  const steps = document.querySelectorAll('.step');
  // Remove animation classes and observers

  const detailItems = document.querySelectorAll('.detail-item');
  // Remove animation classes and observers

  // Enhanced button interactions
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });

    btn.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(-1px) scale(1.02)';
    });

    btn.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
  });

  // Disable advanced parallax scrolling
  let ticking = false;
  const parallaxElements = [
    // Parallax disabled
  ];

  const updateParallax = () => {
    // Parallax disabled - do nothing
    ticking = false;
  };

  const requestTick = () => {
    // Parallax disabled - do nothing
  };

  // Disable scroll parallax
  // window.addEventListener('scroll', requestTick);

  // Enhanced logo floating animation
  const logo = document.querySelector('.main-logo');
  if (logo) {
    let time = 0;
    const floatAnimation = () => {
      time += 0.01;
      const floatY = Math.sin(time) * 8;
      const rotateZ = Math.sin(time * 0.5) * 2;
      logo.style.transform = `translateY(${floatY}px) rotateZ(${rotateZ}deg)`;
      requestAnimationFrame(floatAnimation);
    };
    floatAnimation();
  }

  // Scroll progress indicator
  const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #fbf4e7, #60a5fa);
      z-index: 1000;
      transition: width 0.1s ease;
      box-shadow: 0 0 10px rgba(251, 244, 231, 0.5);
    `;
    document.body.appendChild(progressBar);

    const updateProgress = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = scrollPercentage + '%';
    };

    window.addEventListener('scroll', updateProgress);
  };

  createScrollProgress();

  // Enhanced page loading animation
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(20px)';
  document.body.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transform = 'translateY(0)';
    }, 100);
  });

  // Add smooth scroll to anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      if (target && target !== '#') {
        smoothScroll(target, 1000);
      }
    });
  });

  // Roadmap toggle functionality
  const roadmapToggle = () => {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const textView = document.getElementById('roadmap-text');
    const imageView = document.getElementById('roadmap-image');

    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        
        // Update active button
        toggleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show/hide content
        if (view === 'text') {
          textView.classList.remove('hidden');
          imageView.classList.add('hidden');
        } else {
          textView.classList.add('hidden');
          imageView.classList.remove('hidden');
        }
      });
    });
  };

  roadmapToggle();

  // Impact tracker animations
  const animateCounters = () => {
    const counters = document.querySelectorAll('.impact-stat .stat-number');
    
    counters.forEach(counter => {
      const updateCounter = () => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const current = parseInt(counter.innerText) || 0;
        const increment = target / 200;
        
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCounter, 10);
        } else {
          counter.innerText = target;
        }
      };
      
      // Start animation when element comes into view
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            counterObserver.unobserve(entry.target);
          }
        });
      });
      
      counterObserver.observe(counter.parentElement);
    });
  };

  animateCounters();

  // Well marker animations
  const animateWellMarkers = () => {
    const markers = document.querySelectorAll('.well-marker');
    
    markers.forEach((marker, index) => {
      setTimeout(() => {
        marker.style.opacity = '0';
        marker.style.transform = 'translate(-50%, -50%) scale(0)';
        marker.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
          marker.style.opacity = '1';
          marker.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
      }, index * 200);
    });
  };

  // Trigger well markers animation when section comes into view
  const impactSection = document.querySelector('.impact-tracker');
  if (impactSection) {
    const impactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateWellMarkers();
          impactObserver.unobserve(entry.target);
        }
      });
    });
    
    impactObserver.observe(impactSection);
  }

  // Enhanced button hover effects
  const enhanceButtons = () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px) scale(1.05)';
        btn.style.boxShadow = '4px 4px 12px rgba(0, 0, 0, 0.9)';
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
        btn.style.boxShadow = '2px 2px 8px rgba(0, 0, 0, 0.8)';
      });
    });
  };

  enhanceButtons();
});