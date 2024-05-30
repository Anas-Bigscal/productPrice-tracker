const puppeteer = require("puppeteer");

exports.getMainName = (url) => {
    // The URL constructor is used to parse the given URL.
    // new URL(url) creates a URL object from the provided URL string.
    // .hostname extracts the hostname from the URL. For example, from https://www.flipkart.com/some-product, it extracts www.flipkart.com.
    const hostname = new URL(url).hostname;
    // console.log(`========  hostname  =====>>> `, hostname);
    const websiteName = hostname.split('.').slice(-2, -1)[0];
    // console.log(`========  webName  =====>>> `, websiteName)
    // const mainName = hostname.split('.').slice(-3, -2)[0];
    // console.log(`========  mainName=====>>> `, mainName)
    // console.log(`======== HEHE=====>>> `,  hostname.split('.').slice(-2, -1)[0])

    // return mainName || hostname.split('.').slice(-2, -1)[0];
    // return hostname.split('.').slice(-2, -1)[0];
    return websiteName;
}

exports.scrapeProductData = async function (url, titleSelector, priceSelector) {
    // const PAGE_URL = "https://www.flipkart.com/sony-alpha-ilce-6100l-aps-c-mirrorless-camera-16-50-mm-power-zoom-lens-featuring-eye-af-4k-movie-recording/p/itmdc3e60ee35fb1?pid=CAMFM67HBBUJWA9Y&lid=LSTCAMFM67HBBUJWA9YEQYFI8&marketplace=FLIPKART&store=jek%2Fp31%2Ftrv&srno=b_1_1&otracker=browse&fm=organic&iid=b145c620-200b-42c4-83bd-e153e34d7a34.CAMFM67HBBUJWA9Y.SEARCH&ppt=None&ppn=None&ssid=wjoyq1ondc0000001716963084869";
    // const PAGE_URL = "https://www.flipkart.com/xiaomi-11i-hypercharge-5g-pacific-pearl-128-gb/p/itm495eaae251d5b?pid=MOBG9QWVHHSZS9HY&lid=LSTMOBG9QWVHHSZS9HYP30X9H&marketplace=FLIPKART&store=tyy%2F4io&srno=b_1_1&otracker=nmenu_sub_Electronics_0_Mi&iid=9b7ec196-3316-4281-b480-f80ea19ab3c0.MOBG9QWVHHSZS9HY.SEARCH&ssid=73gk2s7ec00000001716983432041";
    const PAGE_URL = url;
    // console.log(`========  url INSIDE FUNCTION=====>>> `, url)
    // console.log(`========  priceSelector INSIDE FUNCTION=====>>> `, priceSelector)
    // console.log(`========  titleSelector INSIDE FUNCTION=====>>> `, titleSelector)
    // console.log(`========  PAGE_URL INSIDE FUNCTION=====>>> `, PAGE_URL)
    // const PAGE_URL = "https://www.flipkart.com/ifb-ai-convertible-8-in-1-cooling-2024-model-1-5-ton-5-star-split-inverter-heavy-duty-ac-white/p/itm92123760f572c?pid=ACNGXE7G9SHD8CJN&lid=LSTACNGXE7G9SHD8CJNFUABNJ&marketplace=FLIPKART&store=j9e%2Fabm%2Fc54&srno=b_1_1&otracker=browse&fm=organic&iid=en_D19kOaprgyY2YYXQv2AOEWezz8pHIEI2NBeRjF1oEIRgnfemoNuS_qt1DsOmouxzVIzsyDBL_EOEW-CBPMjAdg%3D%3D&ppt=pp&ppn=pp&ssid=q5o782c9uo0000001716988849290";

    // const browser = await puppeteer.launch({ headless: false });
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(PAGE_URL);

    const data = await page.evaluate((titleSelector, priceSelector) => {

        // const productTitle = document.querySelector(
        //     "#container > div > div._39kFie.N3De93.JxFEK3._48O0EI > div.DOjaWF.YJG4Cf > div.DOjaWF.gdgoEp.col-8-12 > div:nth-child(2) > div > div:nth-child(1) > h1 > span.VU-ZEz"
        // ).innerText;

        // const productPrice = document.querySelector(
        //     "#container > div > div._39kFie.N3De93.JxFEK3._48O0EI > div.DOjaWF.YJG4Cf > div.DOjaWF.gdgoEp.col-8-12 > div:nth-child(2) > div > div:nth-child(4) > div > div > div:nth-child(1)"
        // ).innerText;

        const productTitle = document.querySelector(titleSelector).innerText;

        const productPrice = document.querySelector(priceSelector).innerText;

        return { productTitle, productPrice }
        // return { productTitle }
        // return { productPrice }
    },titleSelector, priceSelector);

    // console.log("DATA============>>", data);
    await browser.close();
    return data;
}
