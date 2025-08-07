// Universal Navigation Script - Multiple Fallback Methods
(function() {
  'use strict';
  
  // Navigation methods ordered by reliability for static hosting
  const navigationMethods = [
    // Method 1: Standard location assignment
    function standardNav(url) {
      window.location.assign(url);
    },
    
    // Method 2: Direct href assignment
    function hrefNav(url) {
      window.location.href = url;
    },
    
    // Method 3: Location replace
    function replaceNav(url) {
      window.location.replace(url);
    },
    
    // Method 4: Document location
    function docNav(url) {
      document.location = url;
    },
    
    // Method 5: Window open to self
    function openNav(url) {
      window.open(url, '_self');
    },
    
    // Method 6: Create and click invisible link
    function linkNav(url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_self';
      link.style.position = 'absolute';
      link.style.left = '-9999px';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 100);
    },
    
    // Method 7: Form submission
    function formNav(url) {
      const form = document.createElement('form');
      form.method = 'GET';
      form.action = url;
      form.style.display = 'none';
      document.body.appendChild(form);
      form.submit();
    }
  ];
  
  // Global navigation function
  window.navigateToPage = function(event, url) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('Attempting navigation to:', url);
    
    // Try each method with a small delay
    navigationMethods.forEach((method, index) => {
      setTimeout(() => {
        try {
          console.log(`Trying navigation method ${index + 1}`);
          method(url);
        } catch (error) {
          console.log(`Navigation method ${index + 1} failed:`, error);
        }
      }, index * 100); // 100ms delay between attempts
    });
    
    return false;
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Enhanced navigation loaded');
    });
  }
  
})();
