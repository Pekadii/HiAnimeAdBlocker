// background.js

// Function to close a tab based on its ID
function closeTab(tabId) {
    if (tabId) {
        chrome.tabs.remove(tabId, () => {
            if (chrome.runtime.lastError) {
                console.error("Error closing tab:", chrome.runtime.lastError);
            } else {
                console.log(`Tab with ID ${tabId} has been closed.`);
            }
        });
    }
}

// Function to check if a domain matches hianime.to
function isHianimeDomain(domain) {
    return domain === "hianime.to" || domain === "www.hianime.to";
}

// Listen for tab updates to check if the user visits hianime.to or its subpages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const domain = new URL(tab.url).hostname;

        // If the user visits hianime.to, we begin monitoring for new tabs
        if (isHianimeDomain(domain)) {
            console.log(`User visited ${tab.url}. Monitoring for any new tabs and redirects.`);

            // Monitor for new tabs created by hianime.to
            chrome.tabs.onCreated.addListener((newTab) => {
                chrome.tabs.get(newTab.openerTabId, (openerTab) => {
                    if (openerTab) {
                        const openerDomain = new URL(openerTab.url).hostname;

                        // Only close the new tab if it was opened by hianime.to
                        if (isHianimeDomain(openerDomain)) {
                            console.log(`New tab opened by hianime.to detected: ${newTab.url}. Closing it.`);
                            closeTab(newTab.id);
                        }
                    }
                });
            });

            // Listen for web requests and block any that match unwanted domains
            chrome.webRequest.onBeforeRequest.addListener(
                function(details) {
                    const blockedDomains = [
                        "lps.plarium.com", // Add other domains if necessary
                        "moneyzenith.com",
                        "discoveryfeed.org",
                        "narakathegame.com",
                        "coupons.flightshotelsbook.com",
                        "motherlyvisions.com",
                        "discoverhealth.today",
                        "cookingfanatic.com",
                    ];

                    const requestDomain = new URL(details.url).hostname;

                    // If the domain is in the blocked list, close the tab where the request occurred
                    if (blockedDomains.includes(requestDomain)) {
                        console.log(`Blocked request detected from ${requestDomain}. Closing tab.`);
                        closeTab(details.tabId);
                    }
                },
                { urls: ["<all_urls>"] },
                ["blocking"]
            );
        }
    }
});
