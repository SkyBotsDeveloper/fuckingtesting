const socialLinks = require('./socialLinks');

module.exports = {
    // Inject Discord link into navigation
    injectDiscordLink($, cheerio) {
        const discordUrl = socialLinks.discord;
        
        // Find game icons or specific elements in nav
        $('nav').each((i, nav) => {
            $(nav).find('a, button, li, div, span').each((j, el) => {
                const $el = $(el);
                const text = ($el.text() + ' ' + ($el.attr('class') || '') + ' ' + ($el.attr('id') || '')).toLowerCase();
                
                // If element looks like a game icon/controller
                if (text.includes('game') || text.includes('controller')) {
                    // Replace with Discord link
                    $el.replaceWith(
                        `<a href="${discordUrl}" 
                             target="_blank" 
                             id="discord-fixed-link" 
                             style="display:inline-flex!important;"
                         >${cheerio.html(el)}</a>`
                    );
                }
            });
        });
    }
};