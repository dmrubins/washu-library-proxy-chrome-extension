/**
 * Derived from the Google Calendar Checker available at:
 * http://code.google.com/chrome/extensions/samples.html
 *
 * Licensed under the Google 3-Clause BSD:
 * http://code.google.com/google_bsd_license.html
 */

function $(id) {
    return document.getElementById(id);
}

//adding listener when body is loaded to call init function.
window.addEventListener('load', init, false);

// Set values based on localStorage
function init() {
    parseLocalStorage();
    $('autoRedirect').checked = optAutoRedirect;
    $('preferDanforth').checked = optPreferDanforth;
    //$('usageOptOut').checked = optUsageOptOut;
}

/**
 * Saves the value of the checkbox into local storage.
 */
function save() {
    localStorage.autoRedirect = $('autoRedirect').checked;
    //localStorage.usageOptOut = $('usageOptOut').checked;
    // Make sure the background page sees the changes!
    chrome.extension.getBackgroundPage().parseLocalStorage();
    $('autoRedirectStatus').innerHTML = 'Saved.';
    $('autoRedirectStatus').style.display = 'block';
    setTimeout(function(){ $('autoRedirectStatus').style.display = 'none' }, 1500);
}

/**
 * Add button listeners for Chrome Extension Manifest v2
 */

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
	var buttons = document.getElementsByTagName('input');
	for (var i = 0; i < buttons.length; i++) {
	    buttons[i].addEventListener('click', function(){
		    save();
		}, false);
	}
    }
}
