(function () {
  "use strict";

  console.log("YT Shorts Blocker ACTIVE");

  let lastUrl = location.href;

  const forceRedirect = () => {
    if (location.pathname.startsWith("/shorts")) {
      console.log("SHORTS PAGE DETECTED — FORCE REDIRECT");
      location.replace("https://www.youtube.com/");
    }
  };

  // Run immediately
  forceRedirect();

  // 1️⃣ Aggressive URL polling (YouTube-proof)
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      forceRedirect();
    }
  }, 300); // 300ms is enough, don’t be stupid and set 10ms

  // 2️⃣ Kill Shorts UI everywhere
  const nukeShortsUI = () => {
    document.querySelectorAll(
      `
      a[href^="/shorts"],
      ytd-reel-shelf-renderer,
      ytd-rich-section-renderer,
      ytd-reel-video-renderer,
      ytd-shorts
      `
    ).forEach(el => el.style.display = "none");
  };

  nukeShortsUI();

  new MutationObserver(nukeShortsUI).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
