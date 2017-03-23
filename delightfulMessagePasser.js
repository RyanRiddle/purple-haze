
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("GOOEYRAIN")) {
        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {    
            browser.tabs.sendMessage(tabs[0].id, "hey friend, you're doing a great job today!!!")});
    }
});
