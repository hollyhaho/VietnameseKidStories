const express = require("express")
const service = require("./getDataFromVietBao")
const bodyParser = require("body-parser")

const app = express();
const port = (process.env.PORT || 5000);
// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + "/Client"));

app.get("/stories", function(req, res){
   service.getChildrenStories()
    .then(function(data){
        // console.log(data)
        // console.log(data.length)
        res.send(data)
    })
})

app.listen(port, function(){
    console.log("App listening on port " + port);
})