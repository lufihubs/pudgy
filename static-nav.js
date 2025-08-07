// Enhanced Navigation for Static Hosting
// Global navigation function that can be called from onclick handlers
function navigateToPage(event, url) {
  event.preventDefault();
  
  // Try to use StaticNavigation if available
  if (window.staticNav) {
    window.staticNav.navigateTo(url);
  } else {
    // Fallback methods
    try {
      // Method 1: Try window.location.href
      window.location.href = url;
    } catch (e) {
      try {
        // Method 2: Try window.location.replace
        window.location.replace(url);
      } catch (e2) {
        try {
          // Method 3: Try document.location
          document.location = url;
        } catch (e3) {
          // Method 4: Force page reload
          window.location.reload();
          setTimeout(() => {
            window.location.href = url;
          }, 100);
        }
      }
    }
  }
  
  return false; // Prevent default link behavior
}

class StaticNavigation {
  constructor() {
    this.baseUrl = window.location.origin;
    this.currentPage = this.getCurrentPage();
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupNavigation());
    } else {
      this.setupNavigation();
    }
  }
  
  setupNavigation() {
    // Method 1: Direct file navigation with error handling
    this.setupDirectNavigation();
    
    // Method 2: Hash-based navigation fallback
    this.setupHashNavigation();
    
    // Method 3: Force reload navigation
    this.setupForceReloadNavigation();
    
    // Update active navigation states
    this.updateActiveNavigation();
  }
  
  setupDirectNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const originalHref = link.getAttribute('href');
      
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Try multiple navigation methods
        this.tryNavigationMethods(originalHref);
      });
    });
  }
  
  tryNavigationMethods(href) {
    const methods = [
      () => this.directNavigation(href),
      () => this.forceReloadNavigation(href),
      () => this.fallbackNavigation(href)
    ];
    
    // Try each method in sequence
    methods[0]();
  }
  
  directNavigation(href) {
    try {
      // Clean the href
      const cleanHref = href.startsWith('./') ? href.substring(2) : href;
      const fullUrl = `${this.baseUrl}/${cleanHref}`;
      
      // Direct navigation
      window.location.href = fullUrl;
    } catch (error) {
      console.log('Direct navigation failed, trying force reload...');
      this.forceReloadNavigation(href);
    }
  }
  
  forceReloadNavigation(href) {
    try {
      const cleanHref = href.startsWith('./') ? href.substring(2) : href;
      window.location.replace(`${this.baseUrl}/${cleanHref}`);
    } catch (error) {
      console.log('Force reload failed, trying fallback...');
      this.fallbackNavigation(href);
    }
  }
  
  fallbackNavigation(href) {
    // Ultimate fallback - direct assignment
    try {
      const cleanHref = href.startsWith('./') ? href.substring(2) : href;
      window.location = `${this.baseUrl}/${cleanHref}`;
    } catch (error) {
      console.error('All navigation methods failed:', error);
      // Last resort - force a hard refresh
      window.open(href, '_self');
    }
  }
  
  setupHashNavigation() {
    // Fallback hash-based navigation
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        this.navigateToPage(hash + '.html');
      }
    });
  }
  
  setupForceReloadNavigation() {
    // Add data attributes for force reload
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.setAttribute('data-force-reload', 'true');
    });
  }
  
  getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
  }
  
  updateActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = this.getCurrentPage();
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const linkPage = href.split('/').pop();
      
      link.classList.remove('active');
      
      if (linkPage === currentPage || 
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === 'index.html' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  
  // Utility method for programmatic navigation
  navigateToPage(page) {
    const cleanPage = page.startsWith('./') ? page.substring(2) : page;
    this.tryNavigationMethods(cleanPage);
  }
}

// Initialize enhanced navigation
new StaticNavigation();
