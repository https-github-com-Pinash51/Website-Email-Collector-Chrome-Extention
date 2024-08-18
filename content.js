(function () {
    const emails = [...document.body.innerText.matchAll(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi)].map(match => match[0]);
    if (emails.length > 0) {
        chrome.runtime.sendMessage({ type: 'emails', emails: emails });
    }
})();
