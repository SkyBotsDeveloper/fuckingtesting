const brandConfig = require('../config/brand');

module.exports = {
    process(jsCode) {
        // Protect video URLs first
        const videoPlaceholders = {};
        let counter = 0;
        
        jsCode = jsCode.replace(
            /https?:\/\/[^\s"'<>]+?\.(m3u8|mpd|ts|mp4|webm|mkv|m3u|m4a|aac|ogg|wav)(?=\s|"|'|>|$)/gi,
            (match) => {
                const key = `__VIDEO_URL_${counter++}__`;
                videoPlaceholders[key] = match;
                return key;
            }
        );
        
        // Name replacements
        jsCode = jsCode.replace(/Siddhartha Abhimanyu/gi, 'Nishant Sharma');
        jsCode = jsCode.replace(/@iflexsid/gi, '@rightend');
        jsCode = jsCode.replace(/elite\.sid/gi, 'nishant._sharma');
        
        // URL rewriting
        jsCode = jsCode.replace(
            /https:\/\/elitecinema\.vercel\.app(?![^\s]*\.(m3u8|mpd|ts|mp4|webm|mkv))/gi,
            ''
        );
        jsCode = jsCode.replace(/t\.me\/iflexsid/gi, 't.me/rightend');
        jsCode = jsCode.replace(/instagram\.com\/elite\.sid/gi, 'instagram.com/_nishant._sharma/');
        
        // String literal replacements (single quotes, double quotes, template literals)
        const stringPatterns = [
            { regex: /'CinemaOS'/gi, replacement: "'Entertainment Cinema'" },
            { regex: /'cinemaos'/gi, replacement: "'Entertainment Cinema'" },
            { regex: /'CINEMAOS'/gi, replacement: "'ENTERTAINMENT CINEMA'" },
            { regex: /'EliteCinema'/g, replacement: "'Entertainment Cinema'" },
            { regex: /'elitecinema'/gi, replacement: "'Entertainment Cinema'" },
            { regex: /"CinemaOS"/gi, replacement: '"Entertainment Cinema"' },
            { regex: /"cinemaos"/gi, replacement: '"Entertainment Cinema"' },
            { regex: /"CINEMAOS"/gi, replacement: '"ENTERTAINMENT CINEMA"' },
            { regex: /"EliteCinema"/g, replacement: '"Entertainment Cinema"' },
            { regex: /"elitecinema"/gi, replacement: '"Entertainment Cinema"' },
            { regex: /`CinemaOS`/gi, replacement: '`Entertainment Cinema`' },
            { regex: /`cinemaos`/gi, replacement: '`Entertainment Cinema`' },
            { regex: /`CINEMAOS`/gi, replacement: '`ENTERTAINMENT CINEMA`' },
            { regex: /`EliteCinema`/g, replacement: '`Entertainment Cinema`' },
            { regex: /`elitecinema`/gi, replacement: '`Entertainment Cinema`' }
        ];
        
        stringPatterns.forEach(({regex, replacement}) => {
            jsCode = jsCode.replace(regex, replacement);
        });
        
        // Restore video URLs
        Object.entries(videoPlaceholders).forEach(([key, value]) => {
            jsCode = jsCode.replace(key, value);
        });
        
        return jsCode;
    }
};