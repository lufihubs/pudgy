// Dynamic Content Loader for Static Hosting
class ContentLoader {
  constructor() {
    this.baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');
    this.init();
  }

  init() {
    // Add event listeners to all navigation links
    this.addNavigationListeners();
  }

  addNavigationListeners() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href$=".html"]');
      if (link && !link.target) {
        e.preventDefault();
        this.loadContent(link.href);
      }
    });
  }

  async loadContent(url) {
    try {
      // Method 1: Fetch and replace content
      const response = await fetch(url);
      if (response.ok) {
        const html = await response.text();
        document.documentElement.innerHTML = html;
        history.pushState(null, '', url);
        return;
      }
    } catch (e) {
      console.log('Content loading failed, trying navigation');
    }

    // Method 2: Force navigation
    this.forceNavigation(url);
  }

  forceNavigation(url) {
    // Try multiple navigation methods with delays
    const methods = [
      () => window.location.assign(url),
      () => window.location.replace(url),
      () => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        iframe.onload = () => {
          window.location.href = url;
        };
        document.body.appendChild(iframe);
      },
      () => {
        // Meta refresh method
        const head = document.getElementsByTagName('head')[0];
        const meta = document.createElement('meta');
        meta.httpEquiv = 'refresh';
        meta.content = `0;url=${url}`;
        head.appendChild(meta);
      }
    ];

    methods.forEach((method, index) => {
      setTimeout(method, index * 200);
    });
  }
}

// Initialize content loader
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ContentLoader();
  });
} else {
  new ContentLoader();
}

// Alternative: Use postMessage for navigation
function postMessageNavigate(url) {
  if (window.parent !== window) {
    window.parent.postMessage({ type: 'navigate', url: url }, '*');
  } else {
    window.location.href = url;
  }
}

// Listen for postMessage navigation
window.addEventListener('message', (event) => {
  if (event.data.type === 'navigate') {
    window.location.href = event.data.url;
  }
});
