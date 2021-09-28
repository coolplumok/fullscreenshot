const puppeteer         = require('puppeteer-extra');
const randomUseragent   = require('random-useragent');
const StealthPlugin     = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const USER_AGENT = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36';

async function scrap(_callback, url, path) {

    const userAgent = randomUseragent.getRandom();
    const UA        = userAgent || USER_AGENT;
    const browser   = await puppeteer.launch({ headless: true });
    const page      = await browser.newPage();

    // await page.setRequestInterception(true);
    
    // page.on('request', request => {
    //     var domain = null;
    //     var frags = request.url().split('/');
    //     if (frags.length > 2) {
    //         domain = frags[2];
    //     }
    // });

    await page.setViewport({ width: 1200, height: 1400, deviceScaleFactor: 1 });
    await page.setUserAgent(UA);
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    await page.screenshot({
        path,
        fullPage: true
    });

    await browser.close();
    _callback();
}


module.exports.scrap = scrap;