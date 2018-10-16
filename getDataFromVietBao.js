const rp = require('request-promise');
const cheerio = require('cheerio');
const Promise = require('bluebird');

var urls = generateUrls();
function generateUrls(){
    var urls = []
    for (var i = 1; i < 30; i++) {
        var link = 'https://vietbao.com/p131/' + i + "/thieu-nhi"
        urls.push(link)
    }
    return urls
}
var childrenStoriesRAW = []
var childrenStoriesFormated = {}

var thuThieuNhiStories = []
var tamTinhThayTro = []
var beVietVanViet = []

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


function getChildrenStories(){
    generateUrls()
    console.log(urls[2]);
    return rp(urls[2])
    .then(function(htmlString0){
        
        parseHTML(htmlString0)
        const grouped = groupBy(childrenStoriesRAW, childrenStory => childrenStory.date)
        // console.log(grouped)
        // return(childrenStoriesRAW)
        // return(rp(urls[1]))
    })

   
    // .then(function(htmlString1){
    //     parseHTML(htmlString1)
    //     return(rp(urls[2]))
    // })
    // .then(function(htmlString2){
    //     parseHTML(htmlString2)
    //     return(rp(urls[3]))
    // })
    // .then(function(htmlString3){
    //     parseHTML(htmlString3)
    //     getThuThieuNhi();
    //     getTamTinhThayTro();
    //     getBeVietVanViet();

    //     childrenStoriesFormated.thuThieuNhi = thuThieuNhiStories;
    //     childrenStoriesFormated.tamTinhThayTro = tamTinhThayTro;
    //     childrenStoriesFormated.beVietVanViet = beVietVanViet;

    //     return(childrenStoriesFormated)
    // })
    .catch(function(err){
    
        console.log(err)
    })
   
}

function getChildrenStories2(){
    
    // credit to 
    // https://stackoverflow.com/questions/39649237/node-js-web-scraping-with-loop-on-array-of-urls
    return Promise.map(urls, rp)
    .map((htmlOnPage, index)=> {
        parseHTML(htmlOnPage)
    })
    .then(function(){
        // After all the mapping is done
        // return childnStoriesRaw which now has all stories
        // from all the urls in the urls array
        return(childrenStoriesRAW)
    })
    .catch((e) => console.log("We encountered an error" + e));
    
}

module.exports = {
    getChildrenStories,
    getChildrenStories2
}

function parseHTML(htmlString) {
    var indexOfStories = 1;
    var $ = cheerio.load(htmlString);
    // Gets 2nd item in the array that holds all of pl_list pl_list_col_1 dom objects
    var pl_list_col_1_that_holds_stories = $("div.pl_list.pl_list_col_1").eq(indexOfStories).html();
    $ = cheerio.load(pl_list_col_1_that_holds_stories);
    var $titleOfStories = $("div.pl_row div.pl_title a");

    // generate link to get pictures
    // ex url: https://vietbao.com/images/file/bzAorXrD1QgBAOlp/w150/dothiphuong.jpg
    for (var i = 0; i < $titleOfStories.length; i++) {
        var title = $("div.pl_row div.pl_title a")[i].attribs.title;
        var link = "https://vietbao.com/" + $("div.pl_row div.pl_title a")[i].attribs.href;
        var date = $("div.pl_row span.pl_date").eq(i).html();
        
        var shortDescription;
        if ($("div.pl_row div.pl_brief")[i].children[0] === undefined){
            shortDescription = "no description"
        } else {
            shortDescription = $("div.pl_row div.pl_brief")[i].children[0].data
        }

        console.log(shortDescription);
        var image
        if ($("div.pl_row div.pl_thumbnail img")[i] === undefined ) {
            image = null 
        } else {
            image = "https://vietbao.com/" + $("div.pl_row div.pl_thumbnail img")[i].attribs['data-original']
        }

        var newStory = {
            title: title,
            link: link,
            date: date,
            image: image,
            shortDescription: shortDescription
        };
        childrenStoriesRAW.push(newStory);
    }

}

function getThuThieuNhi(){
    for (var i = 0; i < childrenStoriesRAW.length; i++){
        if (/Thư Thiếu Nhi/.test(childrenStoriesRAW[i].title)){
            thuThieuNhiStories.push(childrenStoriesRAW[i])
        }

    }
    
}
function getBeVietVanViet(){
    for (var i = 0; i < childrenStoriesRAW.length; i++){
        if (/Bé Viết Văn Việt/.test(childrenStoriesRAW[i].title)){
            beVietVanViet.push(childrenStoriesRAW[i])
        }

    }
    
}

function getTamTinhThayTro(){
    for (var i = 0; i < childrenStoriesRAW.length; i++){
        if (/Tâm Tình Thầy Trò/.test(childrenStoriesRAW[i].title)){
            tamTinhThayTro.push(childrenStoriesRAW[i])
        }

    }
    
}