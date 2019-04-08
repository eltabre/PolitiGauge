'use strict';

var currUrl;
var extractor = require('unfluff');
var BodyExtractor = require('extract-main-text');



function getData(url, textPrinter) {
    $.ajax({
        url: url,
        success: textPrinter
    });
}​

chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      currUrl = tabs[0].url;
      console.log("Request for " + currUrl);

      //Unfluff option...
      getData(currUrl, function(response) {
              var json = extractor(response, 'en');
              console.log("Unfluff Text:");
              console.dir(json);
      })


      //Extract-main-text option...
      var bodyExtractor = new BodyExtractor({
          url: currUrl
      });
      bodyExtractor.analyze()
      .then(function(text) {
          console.log("Extract-main-text:\n" + bodyExtractor.title);
          console.log(bodyExtractor.mainText);
      });
   }

   // ------------------------------------------------------------------------------

   //Ajax call to server running python
   // $.ajax({
   //     url: url
   // }).done(function(data) {
   //     //Print result
   //     console.log(data);
   // }).fail(function (jqXHR, textStatus) {
   //       //Error message
   //       console.log(textStatus);;
   // });

   // var xmlHttp = new XMLHttpRequest();
   // xmlHttp.open( "GET", currUrl, true ); // false for synchronous request
   // xmlHttp.send( null );
   // html_data = xmlHttp.responseText

   // $.ajax({
   //     url: currUrl,
   //     success: function(data) {
   //         html_data = data;
   //         console.log(html_data);
   //     }
   // });
);
