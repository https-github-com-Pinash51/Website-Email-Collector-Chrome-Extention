// background.js

// Detect the browser environment
const browserAPI = self.browser || self.chrome;

// Example: Listen to browser action clicks (or similar events)
browserAPI.action.onClicked.addListener((tab) => {
    browserAPI.scripting.executeScript({
        target: { tabId: tab.id },
        function: collectEmails
    });
});

// Function to collect emails from the current webpage
function collectEmails() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const emails = Array.from(emailLinks).map(link => link.textContent);
    return emails;
}
