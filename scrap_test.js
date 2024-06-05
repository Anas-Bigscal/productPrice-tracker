const puppeteer = require("puppeteer");

async function scrapeProductData() {
    // const PAGE_URL = "https://www.flipkart.com/sony-alpha-ilce-6100l-aps-c-mirrorless-camera-16-50-mm-power-zoom-lens-featuring-eye-af-4k-movie-recording/p/itmdc3e60ee35fb1?pid=CAMFM67HBBUJWA9Y&lid=LSTCAMFM67HBBUJWA9YEQYFI8&marketplace=FLIPKART&store=jek%2Fp31%2Ftrv&srno=b_1_1&otracker=browse&fm=organic&iid=b145c620-200b-42c4-83bd-e153e34d7a34.CAMFM67HBBUJWA9Y.SEARCH&ppt=None&ppn=None&ssid=wjoyq1ondc0000001716963084869";
    const PAGE_URL = "https://www.flipkart.com/xiaomi-11i-hypercharge-5g-pacific-pearl-128-gb/p/itm495eaae251d5b?pid=MOBG9QWVHHSZS9HY&lid=LSTMOBG9QWVHHSZS9HYP30X9H&marketplace=FLIPKART&store=tyy%2F4io&srno=b_1_1&otracker=nmenu_sub_Electronics_0_Mi&iid=9b7ec196-3316-4281-b480-f80ea19ab3c0.MOBG9QWVHHSZS9HY.SEARCH&ssid=73gk2s7ec00000001716983432041";
    // const PAGE_URL = "https://www.flipkart.com/ifb-ai-convertible-8-in-1-cooling-2024-model-1-5-ton-5-star-split-inverter-heavy-duty-ac-white/p/itm92123760f572c?pid=ACNGXE7G9SHD8CJN&lid=LSTACNGXE7G9SHD8CJNFUABNJ&marketplace=FLIPKART&store=j9e%2Fabm%2Fc54&srno=b_1_1&otracker=browse&fm=organic&iid=en_D19kOaprgyY2YYXQv2AOEWezz8pHIEI2NBeRjF1oEIRgnfemoNuS_qt1DsOmouxzVIzsyDBL_EOEW-CBPMjAdg%3D%3D&ppt=pp&ppn=pp&ssid=q5o782c9uo0000001716988849290";

    const browser = await puppeteer.launch({ headless: false });
    // const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(PAGE_URL);

    const data = await page.evaluate(() => {

        const productTitle = document.querySelector(
            "._39kFie.N3De93.JxFEK3._48O0EI .C7fEHH .VU-ZEz"
        ).innerText;

        const productPrice = document.querySelector(
            "._39kFie.N3De93.JxFEK3._48O0EI .C7fEHH .UOCQB1 .Nx9bqj.CxhGGd"
        ).innerText;

        let productAvailability = document.querySelector(".DOjaWF.YJG4Cf .DOjaWF.gdgoEp .lwANdH ._3Yl67G._7Pd1Fp");

        // if(productAvailability) console.log("PRODUCT NOT AVAILABLE");
        productAvailability = productAvailability == null ? "No": productAvailability.innerText.trim();

        return { productTitle, productPrice ,productAvailability}
        // return { productTitle, productPrice }
    });

    console.log("DATA============>>", data);
    await browser.close();
    return data;
}

scrapeProductData()