'use strict';

var url;
var response;
var gauge;
var description;
var bias_category;
var bias_percentage;
var orgBias;

chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      url = "url=" + tabs[0].url;
      response = '';

      $.ajax({
          url: 'http://ec2-3-17-180-35.us-east-2.compute.amazonaws.com/getBias',
          data: url,
          success: function(response) {
              console.log(response)
              var json = $.parseJSON(response);
              description = document.getElementById('return_text');
              description.innerHTML = json['text'];

              orgBias = json['orgBias'];
              bias_category = document.getElementById('bias_category');
              bias_percentage = document.getElementById('bias_percentage');
              gauge = document.getElementById('gauge_indicator');   // Moves gauge indicator

              if (orgBias == 'left') {
                  bias_category.innerHTML = 'Left'
                  bias_percentage.innerHTML = "(80% Left)";
                  gauge.style.right = 270+'px';   //Scale: 3% = full right, 94% = full left
              } else if (orgBias == 'left-center') {
                  bias_category.innerHTML = 'Center-Left'
                  bias_percentage.innerHTML = "(30% Left)";
                  gauge.style.right = 199+'px';   //Scale: 3% = full right, 94% = full left
              } else if (orgBias == 'center') {
                  bias_category.innerHTML = 'Center'
                  bias_percentage.innerHTML = "(Minimal Bias)";
                  gauge.style.right = 153+'px';   //Scale: 3% = full right, 94% = full left
              } else if (orgBias == 'right-center') {
                  bias_category.innerHTML = 'Center-Right'
                  bias_percentage.innerHTML = "(30% Right)";
                  gauge.style.right = 107+'px';   //Scale: 3% = full right, 94% = full left
              } else if (orgBias == 'right') {
                  bias_category.innerHTML = 'Right'
                  bias_percentage.innerHTML = "(80% Right)";
                  gauge.style.right = 37+'px';   //Scale: 3% = full right, 94% = full left
              }
          },
          error: function(error) {
              console.log(error);
          }
      });
   }
);
