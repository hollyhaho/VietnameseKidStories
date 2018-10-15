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
        console.log(data.length)
        res.send(data)
    })    
})

app.get("/stories/beVietVanViet", function(req, res){
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



app.get("/stories/thuThieuNhi", function(req, res){
    var thuThieuNhiStories = []
    service.getChildrenStories2()
    .then(function(data){
        for (var i = 0; i < data.length; i++){
            if (/Thư Thiếu Nhi/.test(data[i].title)){
                thuThieuNhiStories.push(data[i])
            }
        }
        res.send(thuThieuNhiStories)
    })
})

app.get("/stories/tamTinhThayTro", function(req, res){
    var tamTinhThayTro = []
    service.getChildrenStories2()
    .then(function(data){
        for (var i = 0; i < data.length; i++){
            if (/Tâm Tình Thầy Trò/.test(data[i].title)){
                tamTinhThayTro.push(data[i])
            }
    
        }
        res.send(tamTinhThayTro)
    })
})

app.get("/stories/truyenCoTich", function(req, res){
    var truyenCoTich = []
    service.getChildrenStories2()
    .then(function(data){
        for (var i = 0; i < data.length; i++){
            if (/Truyện Cổ Tích/.test(data[i].title)){
                truyenCoTich.push(data[i])
            }
        }
        const groupedStories = groupBy(truyenCoTich, childrenStory => childrenStory.title)
        const groupedStoriesObject = Array.from(groupedStories).reduce((obj, [key,value]) => (
            Object.assign(obj, {[key]: value})
        ), {});
        res.send(groupedStoriesObject)
    })
})

function groupBy(list, keyGetter){
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection){
            map.set(key, [item])
        } else {
            collection.push(item)
        }
    });
    return map
}
app.listen(port, function(){
    console.log("App listening on port " + port);
})