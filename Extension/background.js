// Use this if we want to keep it to only AllSides/MBFC sites

// chrome.runtime.onInstalled.addListener(function() {
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//       chrome.declarativeContent.onPageChanged.addRules([{
//         conditions: [new chrome.declarativeContent.PageStateMatcher({
//           pageUrl: {hostEquals: '*.com/*'},    // Have it work for any site in our db
//       })
//         ],
//             actions: [new chrome.declarativeContent.ShowPageAction()]
//       }]);
//     });
//   });



  // chrome.browserAction.onClicked.addListener(function (tab) {
  //     chrome.tabs.executeScript({
  //         file: 'getBias.js'
  //     });
  // });
  //
