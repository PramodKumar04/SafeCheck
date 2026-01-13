console.log("SafeCheck content script loaded");

function extractEmailText() {
    // Gmail main content area (most reliable across accounts)
    const main = document.querySelector("div[role='main']");

    if (!main) return "";

    // Get visible text only
    let text = main.innerText || "";

    // Basic cleanup to reduce Gmail UI noise
    text = text.replace(/Reply|Forward|Inbox|Sent|Drafts/gi, "");
    text = text.replace(/\n{3,}/g, "\n");

    return text.trim();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "GET_EMAIL_TEXT") {
        const text = extractEmailText();
        console.log("EXTRACTED EMAIL TEXT (MAIN):", text);
        sendResponse({ text });
    }
});


