const brandConfig = require('../config/brand');

module.exports = {
    process(cssCode) {
        // Remove references to original site
        cssCode = cssCode.replace(/https?:\/\/elitecinema\.vercel\.app/gi, '');
        
        return cssCode;
    }
};