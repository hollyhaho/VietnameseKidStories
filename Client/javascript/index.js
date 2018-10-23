$(document).ready(function() {
    "use strict";

      $.get("/stories/thuThieuNhi", function(stories){
        stories.forEach(story => {
              let markup = createStoryTile(story);
              $(".thuThieuNhi").append(markup);
        })
      })

      $.get("/stories/beVietVanViet", function(stories){
        stories.forEach(story => {
            let markup = createStoryTile(story);
            $(".beVietVanViet").append(markup);
        })
      })

      $.get("/stories/tamTinhThayTro", function(stories){
          stories.forEach(story => {
              let markup = createStoryTile(story);
              $(".tamTinhThayTro").append(markup);
          })
      })

      $.get("/stories/truyenCoTich", function(stories){
          console.log(stories);
          Object.keys(stories).forEach(function(key){
            stories[key].forEach(function(story){
                let markup = createStoryTile(story);
                $(".truyenCoTich").append(markup);
            })
          })
       
      })

      function createStoryTile(datarecord) {
        return `
        <div class="col-sm-12 col-md-4">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${datarecord.title}</h5>
                <p class="card-text">${datarecord.shortDescription}</p>
                <a class="btn btn-primary" href="${datarecord.link}">Link to Article</a>
                </div>
            </div>
         </div>
        `;
      }
});