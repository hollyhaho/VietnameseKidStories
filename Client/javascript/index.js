$(document).ready(function() {
    "use strict";
    $.get("/stories", function(stories) {
        console.log(stories)

        stories.forEach(story =>  {
  
            var image = document.createElement("IMG")
            image.src = story.image
            console.log(image.src)
            // $(".images").append(image)
       });
      });
 
});