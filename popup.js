// popup.js

// Ensure compatibility between Chrome and Firefox
const browserAPI = window.browser || window.chrome;

// Function to collect emails from the current webpage
function collectEmails() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const emails = Array.from(emailLinks).map(link => link.textContent);
    return emails;
}

// Display collected emails in the popup
function displayEmails(emails) {
    const emailList = document.getElementById('emailList');
    emails.forEach(email => {
        const emailItem = document.createElement('div');
        emailItem.className = 'email-item';
        emailItem.textContent = email;
        emailList.appendChild(emailItem);
    });
}

// Request emails from the current webpage
document.addEventListener('DOMContentLoaded', function () {
    browserAPI.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browserAPI.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                function: collectEmails
            },
            (results) => {
                if (results && results[0] && results[0].result) {
                    displayEmails(results[0].result);
                }
            }
        );
    });
});
