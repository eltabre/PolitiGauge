'use strict';

var url;
var response;
var gauge;
var description;
var bias_category;
var bias_percentage;

chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      url = "url=" + tabs[0].url;
      response = '';

      $.ajax({
          url: 'http://localhost:5000/getBias',
          data: url,
          success: function(response) {
              console.log(response);
              description = document.getElementById('return_text');
              description.innerHTML = response;
              bias_category = document.getElementById('bias_category');
              bias_category.innerHTML = "Center-Left";
              bias_percentage = document.getElementById('bias_percentage');
              bias_percentage.innerHTML = "(30% Left)";
              gauge = document.getElementById('gauge_indicator');   // Moves gauge indicator
              gauge.style.right = 199+'px';   //Scale: 3% = full right, 94% = full left
          },
          error: function(error) {
              console.log(error);
          }
      });
   }
);
