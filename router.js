// Simple Client-Side Router for Static Hosting
class StaticRouter {
  constructor() {
    this.routes = {
      '/': 'index.html',
      '/index': 'index.html',
      '/index.html': 'index.html',
      '/donation-tracker': 'donation-tracker.html',
      '/donation-tracker.html': 'donation-tracker.html',
      '/leaderboard': 'leaderboard.html', 
      '/leaderboard.html': 'leaderboard.html',
      '/impact-reports': 'impact-reports.html',
      '/impact-reports.html': 'impact-reports.html'
    };
    
    this.init();
  }
  
  init() {
    // Handle initial page load
    this.handleRoute();
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => this.handleRoute());
    
    // Intercept all navigation clicks
    document.addEventListener('click', (e) => this.handleClick(e));
  }
  
  handleClick(e) {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    
    e.preventDefault();
    this.navigateTo(href);
  }
  
  navigateTo(path) {
    // Normalize path
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    
    // Remove .html extension for cleaner URLs
    const cleanPath = path.replace('.html', '');
    
    // Update browser URL without page reload
    history.pushState({}, '', cleanPath);
    
    // Load the actual content
    this.loadPage(path);
  }
  
  async loadPage(path) {
    try {
      // Show loading indicator
      this.showLoading();
      
      // Determine which file to load
      let targetFile = this.routes[path] || this.routes[path + '.html'] || this.routes[path + '/'];
      
      if (!targetFile) {
        // Fallback: try with .html extension
        targetFile = path.endsWith('.html') ? path : path + '.html';
      }
      
      // For static hosting, we need to redirect to the actual file
      window.location.href = targetFile;
      
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to direct navigation
      window.location.href = path;
    }
  }
  
  handleRoute() {
    const path = window.location.pathname;
    
    // If we're on a clean URL, redirect to the .html file
    if (this.routes[path] && !window.location.pathname.endsWith('.html')) {
      window.location.replace(this.routes[path]);
    }
  }
  
  showLoading() {
    // Optional: Add loading indicator
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = '<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; color: #fbf4e7;">Loading...</div>';
    document.body.appendChild(loader);
    
    setTimeout(() => {
      const loaderEl = document.getElementById('page-loader');
      if (loaderEl) loaderEl.remove();
    }, 500);
  }
}

// Initialize router when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new StaticRouter());
} else {
  new StaticRouter();
}
