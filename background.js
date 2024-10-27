// background.js

// Allowed domains list (including hianime.to, discord.com, aniwatchtv.to, github.com, and animepahe.ru)
const allowedDomains = [
    "hianime.to", "www.hianime.to",
];

// Set to store manually opened tab IDs
let manuallyOpenedTabs = new Set();
let initialLoadTabs = new Set();

// Function to close a tab based on its ID, with additional error handling
function closeTab(tabId) {
    chrome.tabs.get(tabId, (tab) => {
        // Check if the tab exists and is active before attempting to close
        if (chrome.runtime.lastError) {
            console.error(`Error: ${chrome.runtime.lastError.message}`);
        } else if (tab) {
            chrome.tabs.remove(tabId, () => {
                if (chrome.runtime.lastError) {
                    console.error(`Error closing tab: ${chrome.runtime.lastError.message}`);
                } else {
                    console.log(`Tab with ID ${tabId} has been closed.`);
                }
            });
        } else {
            console.log(`Tab with ID ${tabId} does not exist or is already closed.`);
        }
    });
}

// Function to check if a domain matches any in the allowedDomains list
function isAllowedDomain(domain) {
    return allowedDomains.includes(domain);
}

// Monitor for newly created tabs
chrome.tabs.onCreated.addListener((newTab) => {
    // Tabs without an opener or with a new tab URL are manually opened
    if (!newTab.openerTabId || newTab.pendingUrl === "opera://startpage/" || newTab.pendingUrl === "chrome://newtab/") {
        manuallyOpenedTabs.add(newTab.id);
        console.log(`Manually opened tab detected: ${newTab.id}`);
    }
});

// Monitor tab updates to detect redirects and block unauthorized tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading' && tab.url) {
        try {
            const tabDomain = new URL(tab.url).hostname;

            // Exclude internal browser pages and allowed domains
            if (tab.url.startsWith("opera://") || tab.url.startsWith("chrome://") || isAllowedDomain(tabDomain) || manuallyOpenedTabs.has(tabId) || initialLoadTabs.has(tabId)) {
                console.log(`Allowed domain, manual tab, or internal page detected: ${tab.url}`);
                return;
            }

            // Otherwise, close the tab
            console.log(`Redirect detected to unallowed domain: ${tab.url}. Closing tab.`);
            closeTab(tabId);

        } catch (e) {
            console.error("Error processing tab URL:", e);
        }
    }
});

// Remove tab from manually opened set when it is closed
chrome.tabs.onRemoved.addListener((tabId) => {
    manuallyOpenedTabs.delete(tabId);
    initialLoadTabs.delete(tabId);
    console.log(`Tab with ID ${tabId} was removed manually.`);
});

// When the extension is first loaded, check already open tabs and exclude them
chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
        const domain = new URL(tab.url).hostname;
        if (isAllowedDomain(domain) || tab.url === "chrome://newtab/" || tab.url === "opera://startpage/" || tab.url.startsWith("chrome://") || tab.url.startsWith("opera://")) {
            initialLoadTabs.add(tab.id);
            console.log(`Excluding already open tab: ${tab.id}`);
        }
    });
});
