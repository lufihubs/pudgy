// Single Page Application Router for Static Hosting
class SPARouter {
  constructor() {
    this.routes = {
      '': 'index.html',
      'home': 'index.html',
      'index': 'index.html',
      'donation-tracker': 'donation-tracker.html',
      'tracker': 'donation-tracker.html',
      'donate': 'donation-tracker.html',
      'leaderboard': 'leaderboard.html',
      'leaders': 'leaderboard.html',
      'impact-reports': 'impact-reports.html',
      'impact': 'impact-reports.html',
      'reports': 'impact-reports.html'
    };
    
    this.init();
  }

  init() {
    // Handle initial page load
    this.handleRoute();
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });
    
    // Listen for popstate (back/forward buttons)
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });
  }

  handleRoute() {
    const hash = window.location.hash.slice(1); // Remove #
    const route = hash.toLowerCase();
    
    if (this.routes[route]) {
      this.loadPage(this.routes[route]);
    } else if (hash) {
      // If hash doesn't match, try direct navigation
      this.navigateToPage(hash + '.html');
    }
  }

  navigateToPage(page) {
    // Multiple fallback methods for navigation
    const methods = [
      () => window.location.href = page,
      () => window.location.replace(page),
      () => document.location = page,
      () => {
        // Force page reload method
        const link = document.createElement('a');
        link.href = page;
        link.click();
      },
      () => {
        // Meta refresh fallback
        const meta = document.createElement('meta');
        meta.httpEquiv = 'refresh';
        meta.content = `0;url=${page}`;
        document.head.appendChild(meta);
      }
    ];

    for (let i = 0; i < methods.length; i++) {
      try {
        methods[i]();
        break;
      } catch (e) {
        console.log(`Navigation method ${i + 1} failed:`, e);
        if (i === methods.length - 1) {
          console.error('All navigation methods failed');
        }
      }
    }
  }

  loadPage(page) {
    // If we're already on the target page, don't reload
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === page) {
      return;
    }
    
    this.navigateToPage(page);
  }

  // Public method to navigate with hash
  goTo(page) {
    const pageName = page.replace('.html', '');
    window.location.hash = pageName;
  }
}

// Global navigation function using hash routing
function navigateToPage(event, url) {
  event.preventDefault();
  
  // Try hash-based navigation first
  const pageName = url.replace('.html', '');
  
  try {
    // Method 1: Hash navigation
    window.location.hash = pageName;
    return false;
  } catch (e) {
    console.log('Hash navigation failed, trying direct methods');
  }
  
  // Fallback to direct navigation methods
  const methods = [
    () => window.location.href = url,
    () => window.location.replace(url),
    () => {
      // Force reload and navigate
      window.location.reload();
      setTimeout(() => {
        window.location.href = url;
      }, 100);
    },
    () => {
      // Create invisible form and submit
      const form = document.createElement('form');
      form.method = 'GET';
      form.action = url;
      form.style.display = 'none';
      document.body.appendChild(form);
      form.submit();
    }
  ];

  for (let i = 0; i < methods.length; i++) {
    try {
      methods[i]();
      break;
    } catch (e) {
      console.log(`Method ${i + 1} failed:`, e);
    }
  }
  
  return false;
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.spaRouter = new SPARouter();
});

// Alternative navigation function using window.open
function openPage(url) {
  try {
    window.open(url, '_self');
  } catch (e) {
    window.location.href = url;
  }
}

// Force navigation function
function forceNavigate(url) {
  // Create a temporary link element and click it
  const tempLink = document.createElement('a');
  tempLink.href = url;
  tempLink.target = '_self';
  tempLink.style.display = 'none';
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}
