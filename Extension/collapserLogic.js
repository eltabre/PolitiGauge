// var coll = document.getElementsByClassName("collapsible");
// var i;
//
// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//       document.documentElement.style.height = 70+'px';
//       document.body.style.height = 70+'px';
//     } else {
//       content.style.display = "block";
//       document.documentElement.style.height = 110+'px';
//       document.body.style.height = 110+'px';
//     }
//   });
// }


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      document.documentElement.style.height = 70+'px';
      document.body.style.height = 70+'px';
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      document.documentElement.style.height = 120+'px';
      document.body.style.height = 120+'px';
    }
  });
}
