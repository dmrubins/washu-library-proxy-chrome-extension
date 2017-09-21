// Parse some local storage objects!
// onNetwork now comes from an LSO
parseLocalStorage();

var hmsProxyURL = 'http://ezp-prod1.hul.harvard.edu/login?url=';

function getRedirectURL(url){
    return hmsProxyURL + url;
}

chrome.webRequest.onBeforeRequest.addListener(
    function(info){
        if( optAutoRedirect )
            return {redirectUrl: getRedirectURL(info.url) }
    },
    {urls: hms_journals},
    ["blocking"]
)

// Listen to clicking on our button.
chrome.browserAction.onClicked.addListener(function (tab) {
     chrome.tabs.update(tab.id, {url: getRedirectURL(tab.url)});
});

// Listen to clicking on our button.
/*chrome.browserAction.onClicked.addListener(function (tab) {
    // Parse and redirect.
    var parsedURL = parseUri(tab.url);

    // We check for HTTP/HTTPS only (no chrome://), and that "proxy.wustl.edu" isn't at the end of the
    // string, otherwise we're probably already at [becker|lib]proxy.wustl.edu.
    if (parsedURL.protocol == 'http' || parsedURL.protocol == 'https') {
        if (parsedURL.host.substring(parsedURL.host.length - 15) != 'proxy.wustl.edu') {
            if (hint_urls.hasOwnProperty(parsedURL.host)) {
                // Warn users if they're doing something unnecessary.
                // In this case, do NOT redirect these URLs.
                showUserHint(hint_urls[parsedURL.host]);
            } else {
                // Warn on-network redirects, but don't block them
                if (onNetwork) {
                    showUserHint('You\'re on a WashU network, so you probably don\'t need a proxy.');
                }
                // TODO: Handle Danforth differently, since they don't seem to like SSL as much.
                // TODO: Consider dropping HTTPS support? Is this useful?
                if (parsedURL.protocol == 'https') {
                    parsedURL.host = parsedURL.host.replace(/\./g, '-');
                }
                if (optPreferDanforth || (!optEnableBecker && optEnableDanforth)) {
                    doRedirectToProxy(tab.id, parsedURL, danforthProxyURL);
                } else {
                    doRedirectToProxy(tab.id, parsedURL, beckerProxyURL);
                }
            }
        } else {
            // User clicked even though we're already proxified
            showUserHint('Looks like you\'re already using the proxy. No need to click again!');
        }
    } else {
        showUserHint('This extension only works on websites starting with http:// or https://');
    }

    // If we've been manually clicked (and auto-triggering is enabled), the journal
    // is missing from our list. Let's send the journal URL to the cloud logger.
    // We log non-http/https here in case we're missing something (ftp sites for journal data?)
    if (!tab.incognito && !optUsageOptOut) {
        writeToRemoteLog(parsedURL.host);
    }
});
*/