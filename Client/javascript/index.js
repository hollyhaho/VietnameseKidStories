$(document).ready(function() {
    "use strict";
    $.get("/stories", function(stories) {
       stories.forEach(story =>  {
        // var x = document.createElement("IMG");
        var image = document.createElement("IMG")
        image.src = story.image
        console.log(image.src)
        $(".images").append(image)
       });
      });
 
});