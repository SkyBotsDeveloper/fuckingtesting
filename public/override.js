// =============================================
// OVERRIDE.JS - Client-Side Fix for Pre-Built Footer
// Location: public/override.js
// Purpose: Restructure "Built by" card after page loads
// =============================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('[Override] Looking for Built by card...');
  
  // Wait for page to fully render
  setTimeout(() => {
    restructureBuiltByCard();
  }, 500);
  
  // Also try on window load
  window.addEventListener('load', () => {
    setTimeout(() => {
      restructureBuiltByCard();
    }, 1000);
  });
});

function restructureBuiltByCard() {
  // Strategy: Find element containing "Built by" text
  let builtByCard = null;
  
  // Method A: Search all divs/sections for one with "Built by" heading
  const allElements = document.querySelectorAll('div, section, footer');
  for (let el of allElements) {
    const h3 = el.querySelector('h3');
    if (h3 && h3.textContent.includes('Built by')) {
      builtByCard = el;
      console.log('[Override] ✅ Found card:', builtByCard);
      break;
    }
  }
  
  // Method B: Try class-based selectors
  if (!builtByCard) {
    builtByCard = document.querySelector('.built-by-section') ||
                  document.querySelector('[class*="built-by"]') ||
                  document.querySelector('[class*="creator"]');
  }
  
  // If found, apply two-column layout!
  if (builtByCard) {
    console.log('[Override] Applying two-column layout...');
    applyTwoColumnLayout(builtByCard);
  } else {
    console.warn('[Override] ⚠️ Card not found - checking page structure...');
    
    // Debug help
    const allH3s = document.querySelectorAll('h3');
    console.log('[Debug] All H3s on page:', 
      Array.from(allH3s).map(h => h.textContent.trim())
    );
  }
}

function applyTwoColumnLayout(card) {
  // Store original content temporarily
  const originalHTML = card.innerHTML;
  
  // Clear card
  card.innerHTML = '';
  
  // Create TWO-COLUMN container
  const container = document.createElement('div');
  container.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    width: 100%;
  `;
  
  // ========== LEFT COLUMN: Text ==========
  const leftCol = document.createElement('div');
  leftCol.style.cssText = `
    flex: 1;
    min-width: 280px;
    text-align: left;
  `;
  
  const title = document.createElement('h3');
  title.textContent = 'Built by Nishant Sharma';
  title.style.cssText = `
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 0.5rem 0;
  `;
  
  const subtitle = document.createElement('p');
  subtitle.textContent = 'For contact and updates, use the official creator profiles below.';
  subtitle.style.cssText = `
    font-size: 0.9rem;
    color: #9ca3af;
    margin: 0;
    line-height: 1.4;
  `;
  
  leftCol.appendChild(title);
  leftCol.appendChild(subtitle);
  
  // ========== RIGHT COLUMN: Buttons ==========
  const rightCol = document.createElement('div');
  rightCol.style.cssText = `
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
  `;
  
  // Telegram Button
  const tgBtn = createButton(
    'https://t.me/rightend',
    'Telegram @rightend'
  );
  
  // Instagram Button
  const igBtn = createButton(
    'https://instagram.com/nishant._sharma',
    'Instagram nishant._sharma'
  );
  
  rightCol.appendChild(tgBtn);
  rightCol.appendChild(igBtn);
  
  // Assemble layout
  container.appendChild(leftCol);   // LEFT
  container.appendChild(rightCol);  // RIGHT
  card.appendChild(container);
  
  // Style the card itself
  card.style.cssText = `
    margin-top: 2rem;
    padding: 1.5rem 2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  `;
  
  console.log('[Override] 🎉 Successfully applied two-column layout!');
  
  // Responsive: Stack on mobile
  handleResize(container, leftCol, rightCol);
  window.addEventListener('resize', () => handleResize(container, leftCol, rightCol));
}

function createButton(url, text) {
  const btn = document.createElement('a');
  btn.href = url;
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.textContent = text;
  btn.style.cssText = `
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
  `;
  
  btn.onmouseenter = () => {
    btn.style.background = 'rgba(255, 255, 255, 0.15)';
    btn.style.transform = 'translateY(-1px)';
  };
  
  btn.onmouseleave = () => {
    btn.style.background = 'rgba(255, 255, 255, 0.08)';
    btn.style.transform = 'none';
  };
  
  return btn;
}

function handleResize(container, leftCol, rightCol) {
  if (window.innerWidth <= 768) {
    container.style.flexDirection = 'column';
    leftCol.style.textAlign = 'center';
    rightCol.style.justifyContent = 'center';
  } else {
    container.style.flexDirection = 'row';
    leftCol.style.textAlign = 'left';
    rightCol.style.justifyContent = 'flex-end';
  }
}