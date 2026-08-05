// ============================================
// FOOTER.JS - Complete Two-Column Layout Code
// Location: entertainment-cinema/config/footer.js
// FIXED: Hidden on watch/server pages!
// ============================================

// ✅ ✅ ✅ NEW CODE STARTS HERE ✅ ✅ ✅
// Check if current page is a watch or server page
const currentPath = window.location.pathname.toLowerCase();
const isWatchOrServerPage = 
  currentPath.includes('/movie/watch/') || 
  currentPath.includes('/tv/watch/') || 
  currentPath.includes('/watch/') ||
  currentPath.includes('/server');

// If it's a watch/server page, DON'T create footer at all!
if (isWatchOrServerPage) {
  console.log('[Footer] ⛔ Watch/Server page detected – Footer SKIPPED');
  // Exit immediately - don't run any code below
} else {
// ✅ ✅ ✅ NEW CODE ENDS HERE ✅ ✅ ✅

// Create footer element
const footer = document.createElement('footer');
footer.className = 'footer';

// Footer content container
const footerContent = document.createElement('div');
footerContent.className = 'footer-content';

// Optional: Add "Built with ❤️" text above the card
const builtWithText = document.createElement('p');
builtWithText.className = 'built-with-text';
builtWithText.innerHTML = 'Built with <span style="color: #e879f9;">❤</span> for entertainment enthusiasts worldwide';
footerContent.appendChild(builtWithText);

// ============================================
// BUILT BY SECTION - TWO COLUMN LAYOUT
// ============================================
const builtBySection = document.createElement('div');
builtBySection.className = 'built-by-section';

// Main container - FLEXBOX for two columns
const builtByContainer = document.createElement('div');
builtByContainer.className = 'built-by-container';

// LEFT COLUMN: Text Content
const builtByText = document.createElement('div');
builtByText.className = 'built-by-text';

const builtByTitle = document.createElement('h3');
builtByTitle.textContent = 'Built by Nishant Sharma';

const builtBySubtitle = document.createElement('p');
builtBySubtitle.textContent = 'For contact and updates, use the official creator profiles below.';

builtByText.appendChild(builtByTitle);
builtByText.appendChild(builtBySubtitle);

// RIGHT COLUMN: Social Media Buttons (Horizontal)
const builtByButtons = document.createElement('div');
builtByButtons.className = 'built-by-buttons';

// Telegram Button
const telegramBtn = document.createElement('a');
telegramBtn.href = 'https://t.me/rightend';
telegramBtn.target = '_blank';
telegramBtn.rel = 'noopener noreferrer';
telegramBtn.className = 'social-btn telegram-btn';
telegramBtn.textContent = 'Telegram @rightend';

// Instagram Button
const instagramBtn = document.createElement('a');
instagramBtn.href = 'https://instagram.com/nishant._sharma';
instagramBtn.target = '_blank';
instagramBtn.rel = 'noopener noreferrer';
instagramBtn.className = 'social-btn instagram-btn';
instagramBtn.textContent = 'Instagram nishant._sharma';

// Assemble buttons into right column
builtByButtons.appendChild(telegramBtn);
builtByButtons.appendChild(instagramBtn);

// Assemble two columns into container
builtByContainer.appendChild(builtByText);      // LEFT
builtByContainer.appendChild(builtByButtons);   // RIGHT

// Add container to section
builtBySection.appendChild(builtByContainer);

// Add section to footer
footerContent.appendChild(builtBySection);
footer.appendChild(footerContent);

// ============================================
// CSS STYLES - Inject into page
// ============================================
const footerStyles = `
  .footer {
    margin-top: 3rem;
    padding: 2rem;
    text-align: center;
  }
  
  .built-with-text {
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  
  /* Built By Card Container */
  .built-by-section {
    margin-top: 1rem;
    padding: 1.5rem 2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
  
  /* TWO COLUMN LAYOUT */
  .built-by-container {
    display: flex;
    justify-content: space-between;  /* Pushes left & right apart */
    align-items: center;             /* Vertical centering */
    gap: 2rem;
    flex-wrap: wrap;                 /* Responsive stacking */
  }
  
  /* LEFT COLUMN - Text */
  .built-by-text {
    flex: 1;
    min-width: 280px;
    text-align: left;
  }
  
  .built-by-text h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 0.5rem 0;
  }
  
  .built-by-text p {
    font-size: 0.9rem;
    color: #9ca3af;
    margin: 0;
    line-height: 1.4;
  }
  
  /* RIGHT COLUMN - Buttons */
  .built-by-buttons {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  /* Button Styling */
  .social-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.6rem 1.2rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    color: #ffffff;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  
  .social-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  /* Mobile Responsive */
  @media (max-width: 768px) {
    .built-by-container {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
    }
    
    .built-by-text {
      text-align: center;
    }
    
    .built-by-buttons {
      justify-content: center;
    }
  }
`;

// Create style element and inject CSS
const styleElement = document.createElement('style');
styleElement.textContent = footerStyles;
document.head.appendChild(styleElement);

// Append footer to body
document.body.appendChild(footer);
console.log('[Footer] ✓ Footer created successfully');

// ✅ ✅ ✅ CLOSE THE ELSE BRACE ✅ ✅ ✅
} // End of else block (only runs on non-watch pages)