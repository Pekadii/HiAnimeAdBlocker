// background.js

// List of domains that are considered allowed (e.g., hianime.to)
const allowedDomains = ["hianime.to", "www.hianime.to"];

// Function to close a tab based on its ID
function closeTab(tabId) {
    if (tabId) {
        chrome.tabs.remove(tabId, () => {
            if (chrome.runtime.lastError) {
                console.error("Error closing tab:", chrome.runtime.lastError);
            } else {
                console.log(`Tab closed.`);
            }
        });
    }
}

// Function to check if a domain matches hianime.to
function isHianimeDomain(domain) {
    return allowedDomains.includes(domain);
}

// Monitor new tabs only when they are opened by hianime.to
function monitorTabs() {
    chrome.tabs.onCreated.addListener((newTab) => {
        // Check if the new tab was opened by another tab (openerTabId must exist)
        if (newTab.openerTabId) {
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
        }
    });

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete' && tab.url) {
            const domain = new URL(tab.url).hostname;

            // Only close the tab if it is opened by hianime.to and redirects to a different domain
            chrome.tabs.get(tabId, (updatedTab) => {
                if (updatedTab.openerTabId) {
                    chrome.tabs.get(updatedTab.openerTabId, (openerTab) => {
                        if (openerTab) {
                            const openerDomain = new URL(openerTab.url).hostname;

                            // Check if the tab was opened by hianime.to but is not loading a hianime domain
                            if (isHianimeDomain(openerDomain) && !isHianimeDomain(domain)) {
                                console.log(`Redirected tab from hianime.to detected with domain ${domain}. Closing tab.`);
                                closeTab(tabId);
                            }
                        }
                    });
                }
            });
        }
    });
}

// Event listener for service worker activation
chrome.runtime.onInstalled.addListener(() => {
    console.log("Service worker activated and blocking rules applied.");
    monitorTabs();
});

// Ensures the service worker wakes up when the browser starts
chrome.runtime.onStartup.addListener(() => {
    console.log("Service worker restarted on browser startup.");
    monitorTabs();
});
