/*

Custom script

This file will not be overwritten by the updater

*/

// JavaScript code
function search_animal() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName("animals");

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "block";
    }
  }
}

function loadGoogleAnalytics(trackingId) {
  // Create the script tag for gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  // Initialize the dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }

  // Assign gtag function globally
  window.gtag = gtag;

  // Configure gtag
  gtag('js', new Date());
  gtag('config', trackingId);
}

// Usage
loadGoogleAnalytics('G-KWHEP1WG33');


// Block any script with a source from 'rodesquad.com'
const blockRodesquadScript = () => {
  const scripts = document.querySelectorAll('script[src*="rodesquad.com"]');
  scripts.forEach(script => script.remove());
};

// Watch the page for any dynamically injected scripts
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.tagName === 'SCRIPT' && node.src && node.src.includes('rodesquad.com')) {
        node.remove();
        console.log('Blocked rodesquad script:', node.src);
      }
    });
  });
});

(function blockRodesquadAds() {
  // Remove any existing rodesquad scripts
  const removeRodesquadScripts = () => {
    document.querySelectorAll('script[src*="rodesquad.com"]').forEach(script => {
      script.remove();
      console.log('[Blocker] Removed rodesquad script:', script.src);
    });

    // Remove iframes and ad containers added by rodesquad
    document.querySelectorAll('iframe[src*="rodesquad.com"], div[id*="container-"], div[style*="z-index"]').forEach(el => {
      el.remove();
      console.log('[Blocker] Removed rodesquad iframe/container');
    });

    // Clear global ad variables
    if (typeof atOptions !== 'undefined') {
      try {
        delete window.atOptions;
      } catch (e) {
        window.atOptions = undefined;
      }
      console.log('[Blocker] Cleared atOptions');
    }
  };

  // MutationObserver to block future dynamically loaded ads
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          // Remove scripts or iframes from rodesquad
          if (
            (node.tagName === 'SCRIPT' && node.src.includes('rodesquad.com')) ||
            (node.tagName === 'IFRAME' && node.src.includes('rodesquad.com')) ||
            (node.id && node.id.includes('container-'))
          ) {
            node.remove();
            console.log('[Blocker] Removed dynamic ad node:', node);
          }
        }
      });
    });
  });

  // Start observing the full document
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  // Run cleanup right now
  removeRodesquadScripts();
})();

