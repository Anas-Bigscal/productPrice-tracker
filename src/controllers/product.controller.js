const puppeteer = require("puppeteer");
const productDetailModel = require("../model/product.model");
const selectors = require("../utils/selectors")
const { getMainName ,scrapeProductData} = require("../utils/helper")

exports.getProductPrice = async (req, res, next) => {
    try {
        const productData = req.body;
        // console.log(`========  productData=====>>> `, productData);

        const product = await productDetailModel.findOne({ ...productData });

        if (product) {
            console.log(":::::::::::::::::: DATA ALREADY EXIST ::::::::::::::::");
            return res.send({message:"DATA ALREADY EXIST"});
        }

        productDetailModel.create(productData);
        // const PAGE_URL = "https://www.flipkart.com/xiaomi-11i-hypercharge-5g-pacific-pearl-128-gb/p/itm495eaae251d5b?pid=MOBG9QWVHHSZS9HY&lid=LSTMOBG9QWVHHSZS9HYP30X9H&marketplace=FLIPKART&store=tyy%2F4io&srno=b_1_1&otracker=nmenu_sub_Electronics_0_Mi&iid=9b7ec196-3316-4281-b480-f80ea19ab3c0.MOBG9QWVHHSZS9HY.SEARCH&ssid=73gk2s7ec00000001716983432041";

        // const browser = await puppeteer.launch({ headless: false });

        // const page = await browser.newPage();

        // await page.goto(PAGE_URL);

        // const data = await page.evaluate(() => {

        //     const productTitle = document.querySelector(
        //         "#container > div > div._39kFie.N3De93.JxFEK3._48O0EI > div.DOjaWF.YJG4Cf > div.DOjaWF.gdgoEp.col-8-12 > div:nth-child(2) > div > div:nth-child(1) > h1 > span.VU-ZEz"
        //     ).innerText;

        //     const productPrice = document.querySelector(
        //         "#container > div > div._39kFie.N3De93.JxFEK3._48O0EI > div.DOjaWF.YJG4Cf > div.DOjaWF.gdgoEp.col-8-12 > div:nth-child(2) > div > div:nth-child(4) > div > div > div:nth-child(1)"
        //     ).innerText;

        //     return { productTitle, productPrice }
        // });

        console.log("INSERTED============>>");
        // await browser.close();
        return res.send({ message: "SUCCESS", data: productData });

    } catch (error) {
        console.log("ERROR ====>", error);
    }
}

exports.getPrice = async (req, res, next) => {
    const data = await productDetailModel.find();
    console.log("DATA::::::::::::::>>",data);
    const selectorsObj = selectors.selectorObj;
    // console.log(`========  selectorsObj=====>>> `, selectorsObj)

    for (const elem of data) {
        const websiteName = getMainName(elem.productLink);
        console.log(`========  websiteName =====>>> `, websiteName);  
        if (selectorsObj.hasOwnProperty(websiteName)) {
            const { productTitle, productPrice } = selectorsObj[websiteName];
            // console.log(`========  productTitle=====>>> `, productTitle)
            // console.log(`========  productPrice =====>>> `, productPrice)
            console.log(":::::::::::EMAIL-------===========",elem.userEmail);
            console.log(":::::::::::RS -------===========",elem.productPrice);
            const scrapedData = await scrapeProductData(elem.productLink, productTitle, productPrice);
            scrapedData.productPrice = scrapedData.productPrice.replace("₹", "");

            console.log(`========  scrapedData=====>>> `, scrapedData.productPrice);
            console.log(`========  productPrice=====>>> `, elem.productPrice);
            if (scrapedData.productPrice == elem.productPrice) {
                console.log("HUM JEET GAYEEEEE");
            }
        }
    }

    // This loop does'nt work synchronously
    // data.forEach(async (elem) => {
    //     // console.log(`========  elem=====>>> `, elem)
    //     const websiteName = getMainName(elem.productLink);
    //     // console.log(`========  websiteName =====>>> `, websiteName);  
    //     if (selectorsObj.hasOwnProperty(websiteName)) {
    //         const { productTitle, productPrice } = selectorsObj[websiteName];
    //         // console.log(`========  productPrice=====>>> `, productPrice)
    //         // console.log(`========  productTitle=====>>> `, productTitle)
    //         // console.log(":::::::::::PRODUCTLINK-------===========",elem.productLink);
    //         const scrapedData = await scrapeProductData(elem.productLink, productTitle, productPrice);
    //         scrapedData.productPrice = scrapedData.productPrice.replace("₹", "");

    //         // console.log(`========  scrapedData=====>>> `, scrapedData.productPrice);
    //         // console.log(`========  productPrice=====>>> `, elem.productPrice);
    //         if (scrapedData.productPrice == elem.productPrice) {
    //             console.log("HUM JEET GAYEEEEE");
    //         }
    //     }

    // })
    return res.send("HELLO");
}