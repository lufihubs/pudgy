// Enhanced Navigation for Static Hosting
// Add this to your main.js or include as separate script

function enhanceNavigation() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Check if the link is to an HTML page
      if (href && href.endsWith('.html')) {
        e.preventDefault();
        
        // Try multiple navigation methods
        navigateToPage(href);
      }
    });
  });
}

function navigateToPage(href) {
  // Method 1: Direct window.location
  try {
    window.location.href = href;
  } catch (error) {
    console.error('Navigation method 1 failed:', error);
    
    // Method 2: Using window.open and close
    try {
      window.open(href, '_self');
    } catch (error2) {
      console.error('Navigation method 2 failed:', error2);
      
      // Method 3: Form submission fallback
      navigateViaForm(href);
    }
  }
}

function navigateViaForm(href) {
  const form = document.createElement('form');
  form.method = 'GET';
  form.action = href;
  form.style.display = 'none';
  document.body.appendChild(form);
  form.submit();
}

// Initialize enhanced navigation
document.addEventListener('DOMContentLoaded', enhanceNavigation);
