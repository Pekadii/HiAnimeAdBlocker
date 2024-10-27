// content.js

// Function to detect and notify the background script of the current URL
function detectNewSite() {
    const currentUrl = window.location.href;
    console.log(`Current URL detected by content script: ${currentUrl}`);

    // Send a message to the background script with the current URL
    chrome.runtime.sendMessage({ action: "blockSite", url: currentUrl }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error sending message to background script:", chrome.runtime.lastError);
        } else {
            console.log("Message sent to background script for URL:", currentUrl);
        }
    });
}

// Initial detection when the script loads
detectNewSite();

// Listen for hash changes and reloads (useful for single-page applications and URL fragments)
window.addEventListener('hashchange', () => {
    console.log("Hash change detected");
    detectNewSite();
});

// Listen for any URL change events (like pop-ups or redirects)
window.addEventListener('popstate', () => {
    console.log("Popstate event detected");
    detectNewSite();
});

// Listen for DOM changes in case the URL is updated dynamically (useful for pop-ups)
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            console.log("DOM mutation detected, checking for URL changes...");
            detectNewSite(); // Re-run detection when a mutation is observed
        }
    });
});

// Start observing the document body for changes
observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
});
