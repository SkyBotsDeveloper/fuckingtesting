module.exports = {
    // Target Site
    targetSite: 'https://elitecinema.vercel.app',
    
    // Port
    port: 3000,
    
    // Brand Replacements (Original → Your Brand)
    replacements: {
        // Names
        names: [
            { from: /Siddhartha Abhimanyu/gi, to: 'Nishant Sharma' },
            { from: /Siddhartha/gi, to: 'Nishant' },
            { from: /Abhimanyu/gi, to: 'Sharma' }
        ],
        
        // Social Handles
        handles: [
            { from: /@iflexsid/gi, to: '@rightend' },
            { from: /elite\.sid/gi, to: 'nishant._sharma' },
            { from: /t\.me\/iflexsid/gi, to: 't.me/rightend' },
            { from: /instagram\.com\/elite\.sid/gi, to: 'instagram.com/_nishant._sharma/' }
        ],
        
        // Product Names (CinemaOS → Entertainment Cinema)
        products: [
            // With version numbers
            { from: /CinemaOS\s*V1/gi, to: 'Entertainment Cinema V1' },
            { from: /CinemaOS\s*V2/gi, to: 'Entertainment Cinema V2' },
            { from: /CinemaOS\s*V3/gi, to: 'Entertainment Cinema V3' },
            { from: /CinemaOS\s*4K/gi, to: 'Entertainment Cinema 4K' },
            { from: /Cinemaos_v1/gi, to: 'Entertainment Cinema V1' },
            { from: /Cinemaos_v2/gi, to: 'Entertainment Cinema V2' },
            { from: /Cinemaos_v3/gi, to: 'Entertainment Cinema V3' },
            
            // Generic versions
            { from: /CinemaOS\s*[Vv](\d+)/gi, to: 'Entertainment Cinema V$1' },
            { from: /Cinemaos_v(\d+)/gi, to: 'Entertainment Cinema V$1' },
            
            // Plain names (catch-all)
            { from: /CinemaOS/gi, to: 'Entertainment Cinema' },
            { from: /cinemaos/gi, to: 'Entertainment Cinema' },
            { from: /cinema os/gi, to: 'Entertainment Cinema' },
            { from: /CINEMAOS/gi, to: 'ENTERTAINMENT CINEMA' },
            
            // EliteCinema variations
            { from: /EliteCinema/g, to: 'Entertainment Cinema' },
            { from: /elitecinema/gi, to: 'Entertainment Cinema' },
            { from: /ELITECINEMA/g, to: 'ENTERTAINMENT CINEMA' },
            { from: /Elite Cinema/gi, to: 'Entertainment Cinema' },
            { from: /EliteFlix/gi, to: 'Entertainment Cinema' },
            { from: /eliteflix/gi, to: 'Entertainment Cinema' },
            { from: /ELITEFLIX/gi, to: 'ENTERTAINMENT CINEMA' }
        ]
    },
    
    // Site Metadata
    metadata: {
        title: 'Entertainment Cinema',
        copyright: '© 2026 Entertainment Cinema',
        tagline: 'Crafted with ❤️ Passion & Dedication.'
    }
};