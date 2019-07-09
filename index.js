const puppeteer = require('puppeteer');
const account = `1140398276@qq.com`;
const password = `qaz123456`;

const globalPage = undefined;

async function delay(time){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve();
        },time);
    });
}
async function openPage(){
    const browser = await puppeteer.launch({
        headless: false
    });//打开浏览器
    const page = await browser.newPage();//打开一个空白页
    globalPage = page;
}

async function openUrl(url){
    await globalPage.screenshot({path: 'example.png'});//截个图
}


await function locate(xpath,action,content){
    if(action=="click"){

    }else if(action == "input"){
        
    }
}


// (async () => {
//     const browser = await puppeteer.launch({
//         // headless: false
//     });//打开浏览器
//     const page = await browser.newPage();//打开一个空白页
//     await page.goto('https://www.imdb.com/chart/top');//打开豆瓣网站

//     await page.screenshot({path: 'example.png'});//截个图

//     await browser.close();//关掉浏览器
// })();