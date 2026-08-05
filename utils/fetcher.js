const https = require('https');
const zlib = require('zlib');
const brand = require('../config/brand');

// ✅ EXPORT AS OBJECT WITH METHOD
module.exports = {
    fetchFromTarget: function(urlPath, method, postData) {
        return new Promise(function(resolve, reject) {
            // Default values
            method = method || 'GET';
            
            var fullUrl = brand.targetSite + urlPath;
            var url = new URL(fullUrl);
            
            var options = {
                hostname: url.hostname,
                port: 443,
                path: url.pathname + url.search,
                method: method,
                headers: {
                    'Host': url.hostname,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Referer': brand.targetSite + '/',
                    'Origin': brand.targetSite
                },
                timeout: 30000
            };
            
            if (postData && method === 'POST') {
                options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                options.headers['Content-Length'] = Buffer.byteLength(postData);
            }
            
            console.log('[FETCH] ' + method + ' ' + urlPath);
            
            var req = https.request(options, function(res) {
                var chunks = [];
                
                res.on('data', function(chunk) {
                    chunks.push(chunk);
                });
                
                res.on('end', function() {
                    var buffer = Buffer.concat(chunks);
                    var encoding = res.headers['content-encoding'];
                    
                    var decompressor = null;
                    if (encoding === 'gzip') decompressor = zlib.gunzip;
                    else if (encoding === 'deflate') decompressor = zlib.inflate;
                    else if (encoding === 'br') decompressor = zlib.brotliDecompress;
                    
                    if (decompressor) {
                        decompressor(buffer, function(err, dec) {
                            resolve({
                                status: res.statusCode,
                                headers: res.headers,
                                data: dec || buffer,
                                cookies: res.headers['set-cookie']
                            });
                        });
                    } else {
                        resolve({
                            status: res.statusCode,
                            headers: res.headers,
                            data: buffer,
                            cookies: res.headers['set-cookie']
                        });
                    }
                });
            });
            
            req.on('error', function(err) {
                reject(err);
            });
            
            req.on('timeout', function() {
                req.destroy();
                reject(new Error('Request timeout'));
            });
            
            if (postData && method === 'POST') {
                req.write(postData);
            }
            
            req.end();
        });
    }
};