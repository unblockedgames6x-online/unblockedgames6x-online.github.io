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
loadGoogleAnalytics('G-27J22138W0');


(function() {
    // Remove all Rodesquad ad scripts, iframes, and containers regularly
    function removeRodesquadAds() {
        // Remove scripts from rodesquad
        document.querySelectorAll('script[src*="rodesquad.com"]').forEach(s => s.remove());
        // Remove iframes from rodesquad
        document.querySelectorAll('iframe[src*="rodesquad.com"]').forEach(f => f.remove());
        // Remove div containers used by these ads
        document.querySelectorAll('[id^="container-"]').forEach(d => d.remove());
        // Remove any remaining iframes/divs that slipped through
        document.querySelectorAll('div,iframe').forEach(el => {
            if (el.src && el.src.includes('rodesquad.com')) el.remove();
        });
    }

    // Run on page load and every 300ms after
    removeRodesquadAds();
    setInterval(removeRodesquadAds, 300);

    // Use MutationObserver to catch anything loaded dynamically
    if (window.MutationObserver) {
        new MutationObserver(removeRodesquadAds)
          .observe(document.documentElement, {childList:true, subtree:true});
    }

    // Block window.open (popunders)
    const realOpen = window.open;
    window.open = function() { return null; };

    // Block direct location changes to ad URLs
    const realAssign = window.location.assign;
    window.location.assign = function(url) {
        if (typeof url === "string" && url.includes("rodesquad.com")) return;
        return realAssign.apply(this, arguments);
    };

    // Bonus: Block "onbeforeunload" popups
    window.onbeforeunload = null;
})();
