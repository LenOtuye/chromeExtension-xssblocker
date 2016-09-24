alert('this is a test')

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var blockRequest = false;
        var xssRegex = /<script>.+<\/script>/i
        
        unescapedURL = unescape(details.url);
        
        alert('About to test regex ' + unescapedURL)
        
        if(xssRegex.test(unescapedURL)) {
            blockRequest = true;            
        }
        
        if(blockRequest) {
            alert('You have been protected from a potential XSS attack')
        }
        
        return {cancel: blockRequest};
    },
    {urls: ["<all_urls>"]},
    ["blocking", "requestBody"]
);