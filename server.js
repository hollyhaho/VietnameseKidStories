const express = require("express")
const service = require("./getDataFromVietBao")
const bodyParser = require("body-parser")

const app = express();
const port = (process.env.PORT || 5000);
// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + "/Client"));

app.get("/stories", function(req, res){
   service.getChildrenStories2()
    .then(function(data){
        // console.log(data)
        console.log(data.length)
        // console.log(data)

        res.send(data)
    })
    // stories = service.getChildrenStories2()
    
    

})

app.get("/stories/BeVietVanViet", function(req, res){
    var beVietVanViet = []
    
    service.getChildrenStories2()
    .then(function(data){
        for (var i = 0; i < data.length; i++){
            if (/Bé Viết Văn Việt/.test(data[i].title)){
                beVietVanViet.push(data[i])
            }
    
        }

        res.send(beVietVanViet)
    })

})
app.listen(port, function(){
    console.log("App listening on port " + port);
})