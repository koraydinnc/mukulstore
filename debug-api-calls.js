// Debug script to trace API calls
// This can be run in browser console to monitor all fetch requests

(function() {
    const originalFetch = window.fetch;
    
    window.fetch = function(...args) {
        const url = args[0];
        const options = args[1] || {};
        
        if (typeof url === 'string' && url.includes('/api/')) {
            console.log('🌐 API Call:', {
                url: url,
                method: options.method || 'GET',
                timestamp: new Date().toISOString(),
                stackTrace: new Error().stack
            });
            
            if (url.includes('/api/orders-5534/create') && !url.includes('/api/admin/orders-5534/create')) {
                console.error('❌ INCORRECT ENDPOINT DETECTED:', url);
                console.error('Stack trace:', new Error().stack);
                alert('Incorrect API endpoint detected: ' + url);
            }
        }
        
        return originalFetch.apply(this, args);
    };
    
    console.log('🔍 API call monitoring enabled. All fetch requests will be logged.');
})();
