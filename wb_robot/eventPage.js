// alert('ffffdddd0000')
chrome.extension.onMessage.addListener((function(req, sender, sendRes) {
    console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension")

    if (req.status == "ready")
        sendRes({cmd: "now fuck!"})
    else
        sendRes({cmd: 'wait'})
    
})

chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendMessage(tab.id, {status: "success"}, function(res) {
    console.log(res);
  });
});
