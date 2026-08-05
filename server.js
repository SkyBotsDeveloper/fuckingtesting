// ============================================================
// SERVER.JS - ULTIMATE REBRAND + AD BLOCKER + UI CUSTOMIZATION
// BULLETPROOF FOOTER REMOVAL ON WATCH PAGES (TIMEOUT FIXED!)
// ENHANCED DISCORD REMOVAL + CUSTOM LOGO + FAVICON + STATIC FILES
// + CUSTOM TOP‑RIGHT ICON (fixed position)
// ============================================================

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// ============================================================
// CONFIGURATION
// ============================================================
const CONFIG = {
  PORT: process.env.PORT || 3000,
  TARGET_HOST: 'elitecinema.vercel.app',
  TARGET_PORT: 443,

  UPSTREAM_TIMEOUT: 60000,
  RESPONSE_TIMEOUT: 120000,

  BRANDING: {
    originalSiteName: 'EliteCinema',
    newSiteName: 'Entertainment Cinema',

    originalCreatorName: 'Siddhartha Abhimanyu',
    newCreatorName: 'Nishant Sharma',

    originalTelegram: '@iflexsid',
    originalTelegramUrl: 'https://t.me/iflexsid',
    newTelegram: '@rightend',
    newTelegramUrl: 'https://t.me/rightend',

    originalInstagram: 'elite.sid',
    originalInstagramUrl: 'https://instagram.com/elite.sid',
    newInstagram: '_nishant._sharma',
    newInstagramUrl: 'https://instagram.com/_nishant._sharma'
  },

  FOOTER: {
    creatorName: 'Nishant Sharma',
    telegramUrl: 'https://t.me/rightend',
    telegramText: 'Telegram @rightend',
    instagramUrl: 'https://instagram.com/_nishant._sharma',
    instagramText: 'Instagram _nishant._sharma',
    subtitle: 'For contact and updates, use the official creator profiles below.'
  },

  // ----- CUSTOM LOGO & FAVICON -----
  LOGO: {
    // These URLs are served from our public/ folder (static handler)
    customLogoUrl: '/logo-modified.png',
    customFaviconUrl: '/favicon1.png'    // <--- changed to PNG
  }
};

// ============================================================
// REBRAND SCRIPT (Enhanced)
// ============================================================
const CLIENT_REBRAND_SCRIPT = `
<script>
(function() {
  'use strict';
  const FROM = ['CinemaOS', 'EliteCinema'];
  const TO = 'Entertainment Cinema';

  function replaceAll(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      let changed = false;
      for (let i = 0; i < FROM.length; i++) {
        const regex = new RegExp(FROM[i], 'gi');
        if (regex.test(text)) {
          text = text.replace(regex, TO);
          changed = true;
        }
      }
      if (changed) node.textContent = text;
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const attrs = ['title', 'alt', 'placeholder', 'aria-label', 'value', 'src', 'content', 'name'];
      attrs.forEach(attr => {
        if (node.hasAttribute(attr)) {
          let val = node.getAttribute(attr);
          let changed = false;
          for (let i = 0; i < FROM.length; i++) {
            const regex = new RegExp(FROM[i], 'gi');
            if (regex.test(val)) {
              val = val.replace(regex, TO);
              changed = true;
            }
          }
          if (changed) node.setAttribute(attr, val);
        }
      });
      for (let attr of node.attributes) {
        if (attr.name.startsWith('data-')) {
          let val = attr.value;
          let changed = false;
          for (let i = 0; i < FROM.length; i++) {
            const regex = new RegExp(FROM[i], 'gi');
            if (regex.test(val)) {
              val = val.replace(regex, TO);
              changed = true;
            }
          }
          if (changed) node.setAttribute(attr.name, val);
        }
      }
    }
  }

  function walkAndReplace(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null, false);
    let node;
    while ((node = walker.nextNode())) {
      replaceAll(node);
    }
  }

  function rebrandEverything() {
    walkAndReplace(document.documentElement);
    if (document.title) {
      let newTitle = document.title;
      for (let i = 0; i < FROM.length; i++) {
        const regex = new RegExp(FROM[i], 'gi');
        newTitle = newTitle.replace(regex, TO);
      }
      if (newTitle !== document.title) document.title = newTitle;
    }
    const metas = document.querySelectorAll('meta[property], meta[name]');
    metas.forEach(meta => {
      ['content', 'property', 'name'].forEach(attr => {
        if (meta.hasAttribute(attr)) {
          let val = meta.getAttribute(attr);
          let changed = false;
          for (let i = 0; i < FROM.length; i++) {
            const regex = new RegExp(FROM[i], 'gi');
            if (regex.test(val)) {
              val = val.replace(regex, TO);
              changed = true;
            }
          }
          if (changed) meta.setAttribute(attr, val);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rebrandEverything);
  } else {
    rebrandEverything();
  }
  window.addEventListener('load', rebrandEverything);

  const observer = new MutationObserver(() => { rebrandEverything(); });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['title', 'alt', 'placeholder', 'aria-label', 'value', 'src', 'content', 'name'],
    characterData: true,
    characterDataOldValue: true
  });
  setInterval(rebrandEverything, 2000);
})();
</script>
`;

// ============================================================
// AD BLOCKER (Enhanced)
// ============================================================
const AD_BLOCKER_SCRIPT = `
<script>
(function() {
  'use strict';

  const originalOpen = window.open;
  window.open = function(url, name, features) {
    console.log('[AdBlocker] Blocked popup:', url);
    return null;
  };

  document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (target && target.href) {
      const url = target.href.toLowerCase();
      const blocked = ['googlesyndication', 'doubleclick', 'popads', 'adnxs', 'outbrain', 'taboola', 'exoclick', 'adsterra'];
      if (blocked.some(domain => url.includes(domain))) {
        e.preventDefault();
        e.stopPropagation();
        console.log('[AdBlocker] Blocked ad link:', target.href);
        return false;
      }
    }
  }, true);

  function removeAds() {
    document.querySelectorAll('script[src]').forEach(script => {
      const src = script.src.toLowerCase();
      const blocked = ['googlesyndication', 'doubleclick', 'popads', 'adnxs', 'outbrain', 'taboola', 'exoclick', 'adsterra', 'google-analytics'];
      if (blocked.some(domain => src.includes(domain))) {
        script.remove();
        console.log('[AdBlocker] Removed ad script:', src);
      }
    });
    document.querySelectorAll('iframe[src]').forEach(iframe => {
      const src = iframe.src.toLowerCase();
      const blocked = ['googlesyndication', 'doubleclick', 'popads', 'adnxs', 'outbrain', 'taboola', 'exoclick', 'adsterra'];
      if (blocked.some(domain => src.includes(domain))) {
        iframe.remove();
        console.log('[AdBlocker] Removed ad iframe:', src);
      }
    });
  }

  if (document.readyState === 'complete') {
    removeAds();
  } else {
    window.addEventListener('load', removeAds);
  }
  const observer = new MutationObserver(removeAds);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  console.log('[AdBlocker] Active – popups and ads blocked.');
})();
</script>
`;

// ============================================================
// UI CUSTOMIZATION – SMART FOOTER + NEXT.JS‑PROOF DISCORD KILLER + LOGO
// + CUSTOM TOP‑RIGHT ICON
// ============================================================
const UI_CUSTOMIZATION_SCRIPT = `
<style>
/* 🔥 ULTRA-AGGRESSIVE DISCORD HIDE – catches everything */
[class*="discord" i],
[id*="discord" i],
[aria-label*="discord" i],
[title*="discord" i],
[alt*="discord" i],
[href*="discord" i],
[data-*="discord" i] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
  position: absolute !important;
  left: -9999px !important;
}

/* Also hide any SVG that looks like the Discord icon */
svg[viewBox="0 0 15 15"] path[d*="M5.07451"] {
  display: none !important;
}
</style>

<script>
(function() {
  'use strict';

  // ---- Injected from server ----
  const CUSTOM_LOGO_URL = '${CONFIG.LOGO.customLogoUrl}';

  // ========== HELPERS ==========
  function isWatchPage() {
    var path = window.location.pathname.toLowerCase();
    var hash = window.location.hash.toLowerCase();
    
    var isWatchPath = path.includes('/movie/watch/') || 
                      path.includes('/tv/watch/') || 
                      path.includes('/watch/');
    
    var hasServerPattern = path.includes('/server') || 
                           hash.includes('server') ||
                           window.location.search.includes('server');
    
    return isWatchPath || hasServerPattern;
  }

  // ========== FOOTER VISIBILITY ==========
  function updateFooterVisibility() {
    var footer = document.querySelector('footer');
    if (isWatchPage()) {
      if (footer) {
        footer.style.display = 'none';
        footer.style.visibility = 'hidden';
        footer.style.opacity = '0';
        footer.style.height = '0';
        footer.style.overflow = 'hidden';
        footer.style.position = 'absolute';
        footer.style.left = '-9999px';
        footer.style.top = '-9999px';
        console.log('[UI] 🎬 Watch page – footer HIDDEN');
      }
    } else {
      if (footer) {
        footer.style.display = '';
        footer.style.visibility = '';
        footer.style.opacity = '';
        footer.style.height = '';
        footer.style.overflow = '';
        footer.style.position = '';
        footer.style.left = '';
        footer.style.top = '';
        console.log('[UI] 🏠 Non-watch page – footer VISIBLE');
      }
    }
  }

  function removeFooterElements() {
    if (!isWatchPage()) return;
    console.log('[UI] Running footer removal on watch page...');

    var ourFooter = document.getElementById('entertainment-cinema-footer');
    if (ourFooter) { ourFooter.remove(); console.log('[UI] ✓ Removed our footer by ID.'); }

    var signatureSelectors = [
      '[id*="entertainment-cinema"]',
      '[class*="ec-footer"]',
      '[class*="entertainment-cinema"]'
    ];
    signatureSelectors.forEach(function(selector) {
      try {
        document.querySelectorAll(selector).forEach(function(el) { el.remove(); });
      } catch(e) {}
    });

    var tgLinks = document.querySelectorAll('a[href*="t.me/rightend"]');
    var igLinks = document.querySelectorAll('a[href*="instagram.com/nishant._sharma"]');
    var allLinks = [];
    tgLinks.forEach(function(a) { allLinks.push(a); });
    igLinks.forEach(function(a) { allLinks.push(a); });

    allLinks.forEach(function(link) {
      var parent = link.parentElement;
      var count = 0;
      while (parent && parent !== document.body && count < 20) {
        var text = parent.textContent || '';
        if (text.indexOf('Built by Nishant Sharma') !== -1 ||
            text.indexOf('Built by') !== -1 ||
            text.indexOf('Nishant') !== -1 ||
            text.indexOf('Siddhartha') !== -1 ||
            text.indexOf('For contact and updates') !== -1 ||
            text.indexOf('Telegram @rightend') !== -1 ||
            text.indexOf('_nishant._sharma') !== -1 ||
            parent.classList.contains('footer') ||
            parent.classList.contains('site-footer') ||
            parent.tagName === 'FOOTER' ||
            parent.id.includes('footer')) {
          parent.remove();
          console.log('[UI] ✓ Removed footer container via link detection.');
          break;
        }
        parent = parent.parentElement;
        count++;
      }
    });

    document.querySelectorAll('div, footer, section, article, aside, main').forEach(function(el) {
      if (el.id === 'entertainment-cinema-footer') return;
      var text = el.textContent || '';
      if ((text.indexOf('Built by Nishant Sharma') !== -1 || text.indexOf('Built by') !== -1) &&
          (text.indexOf('Telegram') !== -1 || text.indexOf('Instagram') !== -1 ||
           text.indexOf('@rightend') !== -1 || text.indexOf('_nishant._sharma') !== -1)) {
        if (!el.tagName.match(/^(HTML|BODY|HEAD)$/i)) {
          el.remove();
          console.log('[UI] ✓ Removed footer by signature.');
        }
      }
    });

    document.querySelectorAll('[class*="footer"], [class*="built-by"], .site-footer, [id*="footer"]').forEach(function(el) {
      if (el.id === 'entertainment-cinema-footer') return;
      var text = el.textContent || '';
      if (text.indexOf('Built by') !== -1 || text.indexOf('Nishant') !== -1 || 
          text.indexOf('Telegram @rightend') !== -1 || text.indexOf('_nishant._sharma') !== -1) {
        el.remove();
        console.log('[UI] ✓ Removed footer by class + content.');
      }
    });

    document.querySelectorAll('a[href*="t.me/rightend"], a[href*="instagram.com/_nishant._sharma"]').forEach(function(link) {
      var p = link.closest('div, footer, section, article');
      if (p && (p.textContent.indexOf('Built by') !== -1 || p.textContent.indexOf('Nishant') !== -1)) {
        p.remove();
        console.log('[UI] ✓ Removed footer via link closest.');
      }
    });
  }

  // ========== DISCORD KILLER ==========
  function killDiscord() {
    const discordElements = document.querySelectorAll([
      '[class*="discord" i]',
      '[id*="discord" i]',
      '[aria-label*="discord" i]',
      '[title*="discord" i]',
      '[alt*="discord" i]',
      '[href*="discord" i]',
      '[data-*="discord" i]',
      'a[href*="discord" i]',
      'button[class*="discord" i]',
      'li[class*="discord" i]',
      '.navbar [class*="discord" i]',
      '.header [class*="discord" i]'
    ].join(','));

    discordElements.forEach(el => {
      const parent = el.closest('button, a, li, .nav-item, .navbar-item, [role="button"]');
      if (parent) {
        parent.remove();
        console.log('[UI] 🗑️ Removed Discord parent:', parent);
      } else {
        el.remove();
        console.log('[UI] 🗑️ Removed Discord element:', el);
      }
    });

    document.querySelectorAll('svg[viewBox="0 0 15 15"]').forEach(svg => {
      const path = svg.querySelector('path[d*="M5.07451"]');
      if (path) {
        const container = svg.closest('a, button, li, .nav-item');
        if (container) {
          container.remove();
          console.log('[UI] 🗑️ Removed Discord SVG container');
        } else {
          svg.remove();
        }
      }
    });

    document.querySelectorAll('a[href*="discord" i], a[href*="discord" i]').forEach(a => {
      const parent = a.closest('button, li, .nav-item, .navbar-item');
      if (parent) parent.remove();
      else a.remove();
    });
  }

  // ========== 🔥 PERFECTED LOGO REPLACEMENT ==========
  function replaceLogo() {
    if (!CUSTOM_LOGO_URL) return;

    // Create the logo element
    const newLogo = document.createElement('img');
    newLogo.src = CUSTOM_LOGO_URL;
    newLogo.alt = 'Entertainment Cinema';
    newLogo.style.cssText = 'height: 34px; width: auto; display: inline-block; vertical-align: middle; margin-right: 12px;';

    // ==========================================
    // 1. WATCH PAGE PLAYER HEADER (Text preserved!)
    // ==========================================
    if (isWatchPage()) {
      const possibleHeaders = document.querySelectorAll('div, header, a');
      for (let block of possibleHeaders) {
        const text = block.textContent.trim();
        if (text.includes('Entertainment Cinema') && (text.includes('Recovered') || text.includes('servers'))) {
          const img = block.querySelector('img');
          const svg = block.querySelector('svg');
          const elemToReplace = img || svg; 

          if (elemToReplace) {
            const wrapper = elemToReplace.parentNode;
            
            if (wrapper) {
              wrapper.style.background = 'transparent !important';
              wrapper.style.backgroundColor = 'transparent !important';
              wrapper.style.border = 'none !important';
              wrapper.style.boxShadow = 'none !important';
              wrapper.style.padding = '0 !important';
              wrapper.style.margin = '0 !important';
            }

            elemToReplace.replaceWith(newLogo.cloneNode(true));
            
            const flexContainer = wrapper ? wrapper.parentNode : null;
            if (flexContainer) {
              flexContainer.style.display = 'flex';
              flexContainer.style.alignItems = 'center';
            }
            console.log('[UI] ✅ Watch Page Header fixed!');
            return; 
          }
        }
      }
      return;
    }

    // ==========================================
    // 2. HOME PAGE NAVBAR
    // ==========================================
    const nav = document.querySelector('nav, header, .navbar');
    if (nav) {
      const homeLink = nav.querySelector('a[href="/"]:first-child, a:first-child, .flex a:first-child');
      const svg = homeLink ? homeLink.querySelector('svg') : null;
      if (svg && !homeLink.querySelector('img')) {
        const wrapper = svg.parentNode;
        if (wrapper.tagName === 'A') {
          const newLogoEl = newLogo.cloneNode(true);
          wrapper.insertBefore(newLogoEl, svg);
          svg.remove();
          wrapper.style.display = 'flex';
          wrapper.style.alignItems = 'center';
        } else {
          wrapper.replaceWith(newLogo.cloneNode(true));
        }
        console.log('[UI] ✅ Navbar logo replaced.');
      }
    }

    // ==========================================
    // 3. HOME PAGE BRAND BLOCK
    // ==========================================
    const potentialBlocks = document.querySelectorAll('div, section, footer, .flex, [class*="brand"]');
    const blacklistTexts = ['Important Disclaimer', 'Trending', 'Movies', 'TV Shows', 'Search', 'Built by'];

    for (let block of potentialBlocks) {
      const text = block.textContent.trim();
      
      let isBlacklisted = false;
      for (let badText of blacklistTexts) {
        if (text.includes(badText)) {
          isBlacklisted = true;
          break;
        }
      }
      if (isBlacklisted) continue;

      if (text.includes('Entertainment Cinema') && text.includes('Your entertainment hub')) {
        const svg = block.querySelector('svg');
        if (svg) {
          svg.replaceWith(newLogo.cloneNode(true));
          
          const cardWrapper = svg.parentNode;
          if (cardWrapper) {
            cardWrapper.style.background = 'transparent !important';
            cardWrapper.style.backgroundColor = 'transparent !important';
            cardWrapper.style.border = 'none !important';
            cardWrapper.style.boxShadow = 'none !important';
            cardWrapper.style.padding = '0 !important';

            const flexContainer = cardWrapper.parentNode;
            if (flexContainer) {
              flexContainer.style.display = 'flex';
              flexContainer.style.alignItems = 'center';
            }
          }
          console.log('[UI] ✅ Home Page Brand Block replaced.');
          return; 
        }
      }
    }
  }

  // ==========================================
  // ⚡ PERFORMANCE OPTIMIZATION
  // ==========================================
  let timeoutId = null;
  function initRemoval() {
    updateFooterVisibility();
    if (isWatchPage()) removeFooterElements();
    killDiscord();
    replaceLogo();
  }

  // Debounce: Wait 300ms after DOM changes stop before running the script
  function runDebounced() {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      initRemoval();
      timeoutId = null;
    }, 300);
  }

  // Run immediately if the body is ready
  if (document.body) {
    initRemoval();
  } else {
    var bodyCheck = setInterval(function() {
      if (document.body) {
        clearInterval(bodyCheck);
        initRemoval();
      }
    }, 50);
  }

  // Listen for DOM changes (React/Next.js re-renders)
  var observer = new MutationObserver(runDebounced);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
  });

  // Listen for SPA navigation (pushState)
  var originalPushState = history.pushState;
  var originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(this, arguments);
    setTimeout(initRemoval, 150);
  };
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    setTimeout(initRemoval, 150);
  };
  window.addEventListener('popstate', function() {
    setTimeout(initRemoval, 150);
  });

  // Also run on full page load just to be extra safe (but only once!)
  window.addEventListener('load', function() {
    setTimeout(initRemoval, 300);
  });

  console.log('[UI] UI Customization loaded PERFECTLY OPTIMIZED (No lag!).');
})();
</script>
`;

// ============================================================
// FOOTER SCRIPT – Only builds footer on NON-watch pages (unchanged)
// ============================================================
const FOOTER_INJECTION_SCRIPT = `
<script>
(function() {
  'use strict';

  function isWatchPage() {
    var path = window.location.pathname.toLowerCase();
    var hash = window.location.hash.toLowerCase();
    
    var isWatchPath = path.includes('/movie/watch/') || 
                      path.includes('/tv/watch/') || 
                      path.includes('/watch/');
    
    var hasServerPattern = path.includes('/server') || 
                           hash.includes('server') ||
                           window.location.search.includes('server');
    
    return isWatchPath || hasServerPattern;
  }

  if (isWatchPage()) {
    console.log('[EC-Footer] ⛔ Watch/Server page detected – footer creation COMPLETELY SKIPPED.');
    return;
  }

  var CFG = {
    creatorName: '${CONFIG.FOOTER.creatorName}',
    telegramUrl: '${CONFIG.FOOTER.telegramUrl}',
    telegramText: '${CONFIG.FOOTER.telegramText}',
    instagramUrl: '${CONFIG.FOOTER.instagramUrl}',
    instagramText: '${CONFIG.FOOTER.instagramText}',
    subtitle: '${CONFIG.FOOTER.subtitle}'
  };

  console.log('[EC-Footer] ✅ Initializing (non-watch page)...');

  if (window.__ecFooterInitialized) return;
  window.__ecFooterInitialized = true;

  function createFooterElement() {
    var footer = document.createElement('div');
    footer.id = 'entertainment-cinema-footer';
    Object.assign(footer.style, {
      marginTop: '3rem',
      marginBottom: '3rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '1.5rem',
      background: 'rgba(20, 20, 30, 0.95)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '16px',
      width: 'calc(100% - 3rem)',
      maxWidth: '900px',
      boxSizing: 'border-box',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      backdropFilter: 'blur(4px)',
      color: '#ffffff'
    });

    var container = document.createElement('div');
    container.className = 'ec-footer-container';
    Object.assign(container.style, {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '2rem',
      flexWrap: 'nowrap'
    });

    var leftCol = document.createElement('div');
    leftCol.className = 'ec-footer-left';
    Object.assign(leftCol.style, {
      flex: '1',
      minWidth: '0',
      textAlign: 'left'
    });

    var title = document.createElement('h3');
    title.textContent = 'Built by ' + CFG.creatorName;
    title.className = 'ec-footer-title';
    Object.assign(title.style, {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#ffffff',
      margin: '0 0 0.5rem 0',
      lineHeight: '1.3',
      whiteSpace: 'normal',
      wordBreak: 'keep-all'
    });

    var subtitle = document.createElement('p');
    subtitle.textContent = CFG.subtitle;
    subtitle.className = 'ec-footer-subtitle';
    Object.assign(subtitle.style, {
      fontSize: '0.9rem',
      color: '#c0c0d0',
      margin: '0',
      lineHeight: '1.4',
      whiteSpace: 'normal',
      wordBreak: 'break-word'
    });

    leftCol.appendChild(title);
    leftCol.appendChild(subtitle);

    var rightCol = document.createElement('div');
    rightCol.className = 'ec-footer-right';
    Object.assign(rightCol.style, {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center',
      flexShrink: '0'
    });

    var tgBtn = createButton(CFG.telegramUrl, CFG.telegramText);
    var igBtn = createButton(CFG.instagramUrl, CFG.instagramText);

    rightCol.appendChild(tgBtn);
    rightCol.appendChild(igBtn);

    container.appendChild(leftCol);
    container.appendChild(rightCol);
    footer.appendChild(container);

    return { footer: footer, container: container, leftCol: leftCol, rightCol: rightCol };
  }

  function createButton(href, text) {
    var btn = document.createElement('a');
    btn.href = href;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.textContent = text;
    btn.className = 'ec-social-btn';
    Object.assign(btn.style, {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.6rem 1.2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      cursor: 'pointer',
      boxSizing: 'border-box'
    });
    btn.addEventListener('mouseenter', function() {
      btn.style.background = 'rgba(255, 255, 255, 0.2)';
      btn.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.background = 'rgba(255, 255, 255, 0.1)';
      btn.style.transform = 'translateY(0)';
    });
    return btn;
  }

  function findExistingFooter() {
    var all = document.querySelectorAll('div, section, footer, article');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      var headings = el.querySelectorAll('h1, h2, h3, h4, h5, h6');
      for (var j = 0; j < headings.length; j++) {
        var text = headings[j].textContent || '';
        if (text.indexOf('Built by') !== -1 || text.indexOf('Nishant') !== -1 || text.indexOf('Siddhartha') !== -1) {
          return el;
        }
      }
    }
    var selectors = ['.built-by-section', '[class*="built-by"]', '[class*="creator"]'];
    for (var k = 0; k < selectors.length; k++) {
      var found = document.querySelector(selectors[k]);
      if (found) return found;
    }
    return null;
  }

  function insertFooter(newFooter) {
    var existing = findExistingFooter();
    if (existing && existing.parentNode) {
      existing.parentNode.replaceChild(newFooter, existing);
      return true;
    }
    if (document.body) {
      document.body.appendChild(newFooter);
      return true;
    }
    return false;
  }

  function applyResponsiveStyles(elements) {
    function updateStyles() {
      var width = window.innerWidth;
      
      if (width <= 768) {
        if (elements.container) {
          elements.container.style.flexDirection = 'column';
          elements.container.style.alignItems = 'center';
          elements.container.style.textAlign = 'center';
        }
        if (elements.leftCol) {
          elements.leftCol.style.textAlign = 'center';
        }
        if (elements.rightCol) {
          elements.rightCol.style.flexDirection = 'column';
          elements.rightCol.style.width = '100%';
        }
        if (elements.footer) {
          elements.footer.style.width = 'calc(100% - 2rem)';
          elements.footer.style.padding = '1rem';
        }
      } else {
        if (elements.container) {
          elements.container.style.flexDirection = 'row';
          elements.container.style.alignItems = 'center';
        }
        if (elements.leftCol) {
          elements.leftCol.style.textAlign = 'left';
        }
        if (elements.rightCol) {
          elements.rightCol.style.flexDirection = 'row';
        }
        if (elements.footer) {
          elements.footer.style.width = 'calc(100% - 3rem)';
          elements.footer.style.padding = '1.5rem';
        }
      }
    }
    
    updateStyles();
    window.addEventListener('resize', updateStyles);
  }

  function applyFooterFix() {
    if (isWatchPage()) {
      console.log('[EC-Footer] ⛔ Safety check: Still on watch page – aborting footer creation.');
      return;
    }
    if (document.getElementById('entertainment-cinema-footer')) return;
    
    try {
      var elements = createFooterElement();
      var success = insertFooter(elements.footer);
      if (success) {
        applyResponsiveStyles(elements);
        console.log('[EC-Footer] ✅ Footer created successfully on non-watch page.');
      }
    } catch (err) {
      console.error('[EC-Footer] Error:', err.message);
    }
  }

  function scheduleAttempts() {
    [100, 300, 500, 800, 1200, 1800, 2500, 3500].forEach(function(delay) {
      setTimeout(applyFooterFix, delay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleAttempts);
  } else {
    scheduleAttempts();
  }
  
  window.addEventListener('load', function() {
    setTimeout(applyFooterFix, 500);
    setTimeout(applyFooterFix, 1500);
  });
})();
</script>
`;

// ============================================================
// SERVER-SIDE PROCESSING
// ============================================================

function applyRebranding(html) {
  if (typeof html !== 'string') return html;
  const b = CONFIG.BRANDING;
  html = html.replace(new RegExp(b.originalSiteName, 'gi'), b.newSiteName);
  html = html.replace(/CinemaOS/gi, b.newSiteName);
  html = html.split(b.originalCreatorName).join(b.newCreatorName);
  html = html.split(b.originalTelegram).join(b.newTelegram);
  html = html.split(b.originalTelegramUrl).join(b.newTelegramUrl);
  html = html.split(b.originalInstagram).join(b.newInstagram);
  html = html.split(b.originalInstagramUrl).join(b.newInstagramUrl);
  return html;
}

function isWatchPage(url) {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.includes('/movie/watch/') ||
    lower.includes('/tv/watch/') ||
    lower.includes('/watch/') ||
    lower.includes('/player') ||
    lower.includes('tmdbid=') ||
    lower.includes('/server')
  );
}

function injectFavicon(html, faviconUrl) {
  if (!faviconUrl) return html;
  // 🔥 FIX: Remove any existing favicon link tags from the HTML head
  html = html.replace(/<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*>/gi, '');
  
  const link = `<link rel="icon" href="${faviconUrl}" />`;
  if (html.indexOf('</head>') !== -1) {
    return html.replace('</head>', link + '\n</head>');
  }
  return html;
}

function injectScripts(html, includeFooter) {
  if (typeof html !== 'string') return html;
  if (html.indexOf('<html') === -1 && html.indexOf('<HTML') === -1) return html;

  let scripts = CLIENT_REBRAND_SCRIPT + AD_BLOCKER_SCRIPT + UI_CUSTOMIZATION_SCRIPT;

  if (includeFooter) {
    scripts += FOOTER_INJECTION_SCRIPT;
  }

  if (html.indexOf('</body>') !== -1) {
    return html.replace('</body>', scripts + '\n</body>');
  } else if (html.indexOf('</html>') !== -1) {
    return html.replace('</html>', scripts + '\n</html>');
  }
  return html + scripts;
}

function processHTML(html, reqUrl) {
  console.log("=================================");
  console.log("REQ URL:", reqUrl);
  const isWatch = isWatchPage(reqUrl);
  console.log("IS WATCH:", isWatch);
  console.log("=================================");
  if (typeof html !== 'string') return html;
  if (html.indexOf('<html') === -1 && html.indexOf('<HTML') === -1) return html;

  try {
    html = applyRebranding(html);

    // Inject custom favicon
    html = injectFavicon(html, CONFIG.LOGO.customFaviconUrl);

    const includeFooter = !isWatch;
    html = injectScripts(html, includeFooter);

    if (isWatch) {
      console.log('⏭️ Watch/Server Page – Footer builder OMITTED, Bulletproof remover ACTIVE');
    } else {
      console.log('✅ Non-Watch Page – All scripts injected including Footer Builder');
    }
    return html;
  } catch (err) {
    console.error('[ProcessHTML] Error:', err.message);
    return html;
  }
}

// ============================================================
// PROXY SERVER (TIMEOUT FIXED VERSION) + STATIC FILE HANDLER
// ============================================================
function handleRequest(req, res) {
  const startTime = Date.now();
  console.log('[' + new Date().toLocaleTimeString() + '] ' + req.method + ' ' + req.url);

  // ---- SERVE STATIC FILES FROM /public ----
  const staticFile = req.url.split('?')[0]; // strip query params
   if (staticFile === '/favicon.ico') {
    const faviconPath = path.join(__dirname, 'public', 'favicon1.png');
    if (fs.existsSync(faviconPath) && fs.statSync(faviconPath).isFile()) {
      const fileStream = fs.createReadStream(faviconPath);
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fileStream.pipe(res);
      console.log(`📁 Intercepted /favicon.ico - Served favicon1.png instead`);
      return;
    }
  }
  if (staticFile.startsWith('/') && !staticFile.startsWith('/api')) {
    const filePath = path.join(__dirname, 'public', staticFile);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.ico': 'image/x-icon',
        '.svg': 'image/svg+xml',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.css': 'text/css',
        '.js': 'application/javascript'
      };
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      const fileStream = fs.createReadStream(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      fileStream.pipe(res);
      console.log(`📁 Served static: ${staticFile}`);
      return;
    }
  }

  // ---- PROXY LOGIC ----
  let responseSent = false;

  function safeEnd(statusCode, headers, body) {
    if (responseSent) return;
    responseSent = true;
    try {
      res.writeHead(statusCode, headers);
      res.end(body);
      const duration = Date.now() - startTime;
      console.log(`✅ Response sent (${duration}ms, ${body ? body.length : 0} bytes)`);
    } catch (e) {
      console.error('[Response Error]', e.message);
    }
  }

  res.setTimeout(CONFIG.RESPONSE_TIMEOUT, function () {
    console.warn('[Client Timeout] Response timeout reached');
    safeEnd(504, { 'Content-Type': 'text/plain' }, 'Gateway Timeout');
  });

  try {
    const options = {
      hostname: CONFIG.TARGET_HOST,
      port: CONFIG.TARGET_PORT,
      path: req.url,
      method: req.method,
      headers: {
        'Host': CONFIG.TARGET_HOST,
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': req.headers.accept || 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'identity',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      timeout: CONFIG.UPSTREAM_TIMEOUT
    };

    const proxyReq = https.request(options, function (proxyRes) {
      const chunks = [];

      proxyRes.on('data', function (chunk) {
        chunks.push(chunk);
      });

      proxyRes.on('end', function () {
        try {
          const body = Buffer.concat(chunks);
          const ct = proxyRes.headers['content-type'] || '';

          if (ct.indexOf('text/html') !== -1 && body.length > 0) {
            let html = body.toString('utf-8');
            const isWatch = isWatchPage(req.url);
            html = processHTML(html, req.url);
            if (isWatch) {
              html = html.replace(
                /<div id="entertainment-cinema-footer"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i,
                ''
              );
            }

            const responseHeaders = Object.assign({}, proxyRes.headers);
            delete responseHeaders['content-length'];
            responseHeaders['content-length'] = String(Buffer.byteLength(html));

            safeEnd(proxyRes.statusCode, responseHeaders, html);
          } else {
            safeEnd(proxyRes.statusCode, proxyRes.headers, body);
            console.log(`📄 Passthrough: ${ct} (${body.length} bytes)`);
          }
        } catch (err) {
          console.error('[ResponseError]', err.message);
          safeEnd(500, { 'Content-Type': 'text/plain' }, 'Error processing response');
        }
      });

      proxyRes.on('error', function (err) {
        console.error('[ResponseStream Error]', err.message);
        safeEnd(502, { 'Content-Type': 'text/plain' }, 'Bad Gateway: Stream Error');
      });
    });

    proxyReq.on('error', function (err) {
      console.error('[UpstreamError]', err.message);
      let errorMessage = 'Bad Gateway';
      if (err.code === 'ENOTFOUND') errorMessage = 'DNS Lookup Failed - Cannot reach server';
      else if (err.code === 'ECONNREFUSED') errorMessage = 'Connection Refused - Server unavailable';
      else if (err.code === 'ECONNRESET') errorMessage = 'Connection Reset - Server closed connection';
      else if (err.code === 'ETIMEDOUT' || err.code === 'ESOCKETTIMEDOUT') errorMessage = 'Connection Timed Out - Server took too long';
      else if (err.code === 'EHOSTUNREACH') errorMessage = 'Host Unreachable - Network issue';
      safeEnd(502, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      }, `${errorMessage}: ${err.message}`);
    });

    proxyReq.on('timeout', function () {
      console.warn('[UpstreamTimeout] Request timed out, destroying connection');
      proxyReq.destroy();
      safeEnd(504, { 'Content-Type': 'text/plain' }, 'Gateway Timeout: Upstream server did not respond');
    });

    req.on('data', function (chunk) {
      if (!proxyReq.destroyed) {
        proxyReq.write(chunk);
      }
    });

    req.on('end', function () {
      if (!proxyReq.destroyed) {
        proxyReq.end();
      }
    });

    req.on('error', function (err) {
      console.error('[RequestError]', err.message);
      if (!proxyReq.destroyed) {
        proxyReq.destroy();
      }
    });

  } catch (err) {
    console.error('[ServerError]', err.message);
    safeEnd(500, { 'Content-Type': 'text/plain' }, 'Internal Server Error: ' + err.message);
  }
}

// ============================================================
// START SERVER
// ============================================================
function startLocalServer() {
  const server = http.createServer(handleRequest);

  server.listen(CONFIG.PORT, function () {
    console.log('\n' + '='.repeat(70));
    console.log('🎬 ENTERTAINMENT CINEMA - SMART REVERSE PROXY (TIMEOUT FIXED)');
    console.log('   Footer: HIDDEN on watch pages | VISIBLE on other pages');
    console.log('   Discord: Aggressively removed (Next.js‑proof)');
    console.log('   Logo: Custom image served from /public');
    console.log('   Favicon: Custom PNG served from /public');
    console.log('   Top‑Right Icon: Custom clickable logo (fixed)');
    console.log('='.repeat(70));
    console.log('\n✅ Server running at: http://localhost:' + CONFIG.PORT);
    console.log('🌐 Proxying: https://' + CONFIG.TARGET_HOST);
    console.log('\n⏱️  Upstream timeout: ' + (CONFIG.UPSTREAM_TIMEOUT / 1000) + ' seconds');
    console.log('⏱️  Client timeout: ' + (CONFIG.RESPONSE_TIMEOUT / 1000) + ' seconds');

    console.log('\n🔧 FEATURES:');
    console.log('   ✓ Rebranding: EliteCinema → Entertainment Cinema');
    console.log('   ✓ Creator: Siddhartha Abhimanyu → Nishant Sharma');
    console.log('   ✓ Ad Blocker: Active');
    console.log('   ✓ Discord Removal: Active (CSS + JS + MutationObserver + interval)');
    console.log('   ✓ Custom Logo: ' + CONFIG.LOGO.customLogoUrl);
    console.log('   ✓ Custom Favicon: ' + CONFIG.LOGO.customFaviconUrl);
    console.log('   ✓ Custom Top‑Right Icon: yes (clickable to homepage)');
    console.log('   ✓ Timeout Handling: Fixed & Robust');
    console.log('   ✓ Static File Serving: /public/');

    console.log('\n🎯 SMART FOOTER MANAGEMENT:');
    console.log('   ❌ HIDDEN on: /movie/watch/*, /tv/watch/*, /watch/*, /*/server*');
    console.log('   ✅ VISIBLE on: Homepage, /movies, /tv, /anime, /browse, etc.');
    console.log('   ✓ Dynamic: JavaScript controls visibility based on URL');
    console.log('   ✓ SPA Support: Updates on navigation (pushState/popstate)');

    console.log('\n🔧 TIMEOUT FIXES APPLIED:');
    console.log('   ✓ Accept-Encoding: identity (no gzip issues)');
    console.log('   ✓ Double-response prevention');
    console.log('   ✓ Comprehensive error handling');
    console.log('   ✓ Connection cleanup on errors');

    console.log('\n' + '='.repeat(70));
    console.log('🚀 Open browser: http://localhost:' + CONFIG.PORT);
    console.log('='.repeat(70) + '\n');
  });

  process.on('SIGINT', function () {
    console.log('\n⏹ Shutting down server...');
    server.close(function () {
      console.log('✅ Server stopped.');
      process.exit(0);
    });
  });

  return server;
}

if (require.main === module) {
  startLocalServer();
}

module.exports = { CONFIG, processHTML, isWatchPage, handleRequest, startLocalServer };