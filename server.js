var Koa = require("koa");
var router= require("koa-router")();

const puppeteer = require('puppeteer');
var globalPage = undefined;
var app = new Koa();

router.get("/open",async (ctx,next)=>{
    var url = ctx.query.url;

    await openPage(url);
    ctx.body="end";
});


router.get("/locate",async (ctx,next)=>{
    console.log(ctx.query);
    var selector=ctx.query.selector;
    var action= ctx.query.action;

    locate(selector,action);
    ctx.body="end";
});

router.get("/shot",async (ctx,next)=>{
    await shot();
});


async function delay(time){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve();
        },time);
    });
}
//curl localhost:3000/open?url=baidu.com
async function openPage(url){
    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: false
    });//打开浏览器
    console.log(url);
    globalPage = await browser.newPage();
    await globalPage.goto("http://"+url);//打开
}

//curl localhost:3000/shot
async function shot(url){
    await globalPage.screenshot({path: 'example.png'});//截个图
}

//curl "http://localhost:3000/locate?selector=%23su&action=click"
//curl "http://localhost:3000/locate?selector=%23kw&action=input"
async function locate(selector,action,content){
    console.log(action);
    if(action=="click"){ 
        var element= await globalPage.$("#su");
        await element.click();

    }else if(action == "input"){
        await globalPage.focus(selector);
        globalPage.keyboard.type('puppeteer');
    }
    await delay(1000);
}


app.use(router.routes());
app.listen(3000);