const express = require("express");
const service = require("./getDataFromVietBao")

const app = express();
const port = (process.env.PORT || 3000);

app.get("/stories", function(req, res){
   service.getChildrenStories()
    .then(function(data){
        console.log(data)
        // console.log(data.length)
        res.send(data)
    })
})

app.listen(port, function(){
    console.log("App listening on port " + port);
})