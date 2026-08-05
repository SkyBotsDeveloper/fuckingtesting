// =============================================
// HTML PROCESSOR.JS - Aggressive Logo Override Version
// =============================================

function injectFavicon(html, faviconUrl) {
  if (!faviconUrl) return html;
  var link = '<link rel="icon" href="' + faviconUrl + '" />';
  if (html.indexOf('</head>') !== -1) {
    return html.replace('</head>', link + '\n</head>');
  }
  return html;
}

function injectScripts(html, scriptCode) {
  if (typeof html !== 'string') return html;
  if (html.indexOf('</body>') !== -1) {
    return html.replace('</body>', scriptCode + '\n</body>');
  } else if (html.indexOf('</html>') !== -1) {
    return html.replace('</html>', scriptCode + '\n</html>');
  }
  return html + scriptCode;
}

// ============================================================
// NUCLEAR OPTION LOGO REPLACEMENT SCRIPT
// Runs every 500ms and CANNOT be overridden!
// ============================================================
var NUCLEAR_LOGO_SCRIPT = [
  '<script>',
  '(function() {',
  "  var MY_LOGO = '/logo-modified.png';",
  "  var LOGO_ALT = 'Entertainment Cinema';",
  "",
  "  function nukeLogo() {",
  "    // Strategy 1: Replace ALL images in navbar/header area",
  "    document.querySelectorAll('nav img, header img, .navbar img, [class*=\"logo\"] img, [class*=\"brand\"] img').forEach(function(img) {",
  "      if (img.src && !img.src.includes('logo-modified')) {",
  "        console.log('[NUKE] Destroying logo:', img.src);",
  "        img.src = MY_LOGO;",
  "        img.alt = LOGO_ALT;",
  "        img.style.height = '42px';",
  "        img.style.width = 'auto';",
  "        img.style.borderRadius = '50%';",
  "        img.style.boxShadow = '0 2px 8px rgba(255,215,0,0.4)';",
  "      }",
  "    });",
  "",
  "    // Strategy 2: Find by alt text (catches React-rendered images)",
  "    document.querySelectorAll('img[alt*=\"Cinema\"], img[alt*=\"Elite\"], img[alt*=\"cinema\"]').forEach(function(img) {",
  "      if (!img.src.includes('logo-modified')) {",
  "        console.log('[NUKE] Destroying alt-logo:', img.alt);",
  "        img.src = MY_LOGO;",
  "        img.alt = LOGO_ALT;",
  "        img.setAttribute('data-custom-logo', 'true');",
  "      }",
  "    });",
  "",
  "    // Strategy 3: Intercept new images via MutationObserver backup",
  "    document.querySelectorAll('img:not([data-checked])').forEach(function(img) {",
  "      img.setAttribute('data-checked', 'true');",
  "      var parent = img.closest('nav, header, .navbar, [class*=\"logo\"], [class*=\"brand\"]');",
  "      if (parent && img.width > 20 && img.height > 20) {",
  "        if (!img.src.includes('logo-modified')) {",
  "          console.log('[NUKE] Intercepted new image');",
  "          img.src = MY_LOGO;",
  "          img.alt = LOGO_ALT;",
  "        }",
  "      }",
  "    });",
  "  }",
  "",
  "  // Run immediately",
  "  nukeLogo();",
  "",
  "  // Run every 500ms (aggressive!)",
  "  setInterval(nukeLogo, 500);",
  "",
  "  // Also run on EVERY DOM change",
  "  var observer = new MutationObserver(nukeLogo);",
  "  observer.observe(document.body, { childList: true, subtree: true });",
  "",
  "  console.log('[NUKE] 🚨 Nuclear logo replacement ACTIVE - running every 500ms');",
  "})();",
  '</script>'
].join('\n');

// Discord & Footer Script (simplified)
var DISCORD_FOOTER_SCRIPT = [
  '<script>',
  '(function() {',
  "  function killDiscord() {",
  "    document.querySelectorAll('[href*=\"discord\" i], [class*=\"discord\" i]').forEach(function(el) {",
  "      el.remove();",
  "    });",
  "  }",
  "",
  "  function handleFooter() {",
  "    var path = location.pathname.toLowerCase();",
  "    var isWatch = path.includes('/watch') || path.includes('/server');",
  "    var footer = document.querySelector('footer');",
  "    if (footer) {",
  "      footer.style.display = isWatch ? 'none' : '';",
  "    }",
  "  }",
  "",
  "  killDiscord();",
  "  handleFooter();",
  "  setInterval(function() { killDiscord(); handleFooter(); }, 1000);",
  "  ",
  "  var obs = new MutationObserver(function() { killDiscord(); handleFooter(); });",
  "  obs.observe(document.body, { childList: true, subtree: true });",
  "})();",
  '</script>'
].join('\n');

// CSS for built-by card
var BUILT_BY_CSS = [
  '<style>',
  '  .built-by-section, div[class*="built"] {',
  '    display: flex !important;',
  '    justify-content: space-between !important;',
  '    padding: 1.5rem !important;',
  '    max-width: 900px !important;',
  '    margin: 2rem auto !important;',
  '    background: rgba(255,255,255,0.03) !important;',
  '    border-radius: 12px !important;',
  '  }',
  '</style>'
].join('\n');

// ============================================================
// MAIN PROCESSOR
// ============================================================
module.exports = function processHTML(html, requestUrl) {
  if (typeof html !== 'string') return html;
  
  // Only process HTML documents
  if (!html.includes('<html') && !html.includes('<HTML')) return html;

  // 🔥 SERVER-SIDE: Replace logo URLs in HTML before browser even sees it!
  // This catches initial page load
  html = html.replace(/src=["'][^"']*logo[^"']*["']/gi, 'src="/logo-modified.png"');
  html = html.replace(/src=["'][^"']*icon[^"']*["']/gi, 'src="/logo-modified.png"');
  html = html.replace(/src=["']\/[^"']*\.svg["']/gi, 'src="/logo-modified.png"');
  
  // Replace alt text references
  html = html.replace(/alt=["'][^"']*EliteCinema[^"']*["']/gi, 'alt="Entertainment Cinema"');
  html = html.replace(/alt=["'][^"']*CinemaOS[^"']*["']/gi, 'alt="Entertainment Cinema"');

  // Inject client-side nuclear script (runs every 500ms)
  html = injectScripts(html, NUCLEAR_LOGO_SCRIPT);
  
  // Inject discord/footer script
  html = injectScripts(html, DISCORD_FOOTER_SCRIPT);
  
  // Inject CSS
  html = html.replace('</head>', BUILT_BY_CSS + '</head>');

  // ✅ INJECT FAVICON
  html = injectFavicon(html, '/logo-modified.png');

  console.log('[HTML Processor] ⚡ Processed:', requestUrl);

  return html;
};