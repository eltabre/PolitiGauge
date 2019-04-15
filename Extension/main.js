'use strict';

var url;
var response;
var gauge;
// var extractor = require('unfluff');

chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      url = "url=" + tabs[0].url;
      response = '';

      $.ajax({
          url: 'http://localhost:5000/getBias',
          data: url,
          success: function(response) {
              console.log(response);
              gauge = document.getElementById('gauge_indicator');   // Moves gauge indicator
              gauge.style.right = response+'%';
          },
          error: function(error) {
              console.log(error);
          }
      });
   }
);
