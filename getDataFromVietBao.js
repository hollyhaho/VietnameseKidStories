const rp = require('request-promise');
const cheerio = require('cheerio')

var urls = [
    "https://vietbao.com/p131/1/thieu-nhi?_=1527124839180",
    "https://vietbao.com/p131/2/thieu-nhi?_=1527124839181",
    "https://vietbao.com/p131/3/thieu-nhi?_=1527124839182",
    "https://vietbao.com/p131/4/thieu-nhi?_=1527124839183",
]
var childrenStoriesRAW = []
var childrenStoriesFormated = {}

var thuThieuNhiStories = []
var tamTinhThayTro = []
var beVietVanViet = []

function getChildrenStories(){
    
    return rp(urls[0])
    .then(function(htmlString0){
        
        parseHTML(htmlString0)
        return(childrenStoriesRAW)
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

module.exports = {
    getChildrenStories
}

function parseHTML(htmlString) {
    var indexOfStories = 1;
    var $ = cheerio.load(htmlString);
    // Gets 2nd item array that holds all of pl_list pl_list_col_1 dom objects
    var pl_list_col_1_that_holds_stories = $("div.pl_list.pl_list_col_1").eq(indexOfStories).html();
    $ = cheerio.load(pl_list_col_1_that_holds_stories);
    var $titleOfStories = $("div.pl_row div.pl_title a");
    for (var i = 0; i < $titleOfStories.length; i++) {
        var title = $("div.pl_row div.pl_title a")[i].attribs.title;
        var link = "https://vietbao.com/" + $("div.pl_row div.pl_title a")[i].attribs.href;
        var date = $("div.pl_row span.pl_date").eq(i).html();
        var newStory = {
            title: title,
            link: link,
            date: date
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