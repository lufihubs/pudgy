// Single Page Application Navigation
// This approach loads all content dynamically without page reloads

class SPANavigator {
  constructor() {
    this.pages = {
      'home': 'index.html',
      'donation-tracker': 'donation-tracker.html', 
      'leaderboard': 'leaderboard.html',
      'impact-reports': 'impact-reports.html'
    };
    this.init();
  }

  init() {
    // Handle hash changes
    window.addEventListener('hashchange', () => this.handleRouteChange());
    
    // Handle initial load
    this.handleRouteChange();
    
    // Update all navigation links
    this.updateNavLinks();
  }

  updateNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href.endsWith('.html')) {
        const pageName = href.replace('.html', '');
        link.setAttribute('href', `#${pageName}`);
        link.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.hash = pageName;
        });
      }
    });
  }

  async handleRouteChange() {
    const hash = window.location.hash.slice(1) || 'home';
    const pageName = hash === 'index' ? 'home' : hash;
    
    if (this.pages[pageName]) {
      await this.loadPage(pageName);
    }
  }

  async loadPage(pageName) {
    try {
      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageName}`) {
          link.classList.add('active');
        }
      });
      
      // You can load page content here if needed
      console.log(`Navigated to: ${pageName}`);
      
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }
}

// Initialize SPA navigation
document.addEventListener('DOMContentLoaded', () => {
  new SPANavigator();
});
