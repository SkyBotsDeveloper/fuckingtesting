module.exports = {
    // Ad domains to block
    blockedDomains: [
        'googlesyndication.com',
        'doubleclick.net',
        'googleadservices.com',
        'google-analytics.com',
        'googletagmanager.com',
        'pagead2.googlesyndication.com',
        'adservice.google.com',
        'amazon-adsystem.com',
        'outbrain.com',
        'taboola.com',
        'popads.net',
        'exoclick.com',
        'adsterra.com',
        'propellerads.com',
        'pushad.com',
        'clickadu.com',
        'adcash.com',
        'mgid.com',
        'revcontent.com'
    ],
    
    // Check if URL is an ad
    isAdUrl(url) {
        if (!url) return false;
        return this.blockedDomains.some(domain => 
            url.toLowerCase().includes(domain)
        );
    }
};