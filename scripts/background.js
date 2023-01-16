chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log('here');
  console.log(changeInfo.url);
});
