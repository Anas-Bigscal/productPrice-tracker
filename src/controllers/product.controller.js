const productDetailModel = require("../model/product.model");
const userModel = require("../model/user.model");
const selectors = require("../utils/selectors")
const { getMainName, scrapeProductData } = require("../utils/helper")
const { sendMail } = require("../utils/sendMail")

exports.getProduct = async (req, res, next) => {
    try {
        const user = req.user[0];
        // console.log(`======== :: user  =====>>> `,typeof user._id)
        
        const data = await productDetailModel.find({userId: user._id});
        console.log("DATA=========>>>",data);
        // RENDER PRODUCT PAGE
        return res.render('getProduct',{product: data});
    } catch (error) {
        next(error);
        console.log("ERROR =====>>", error);
    }
}

exports.getProductDetail = async (req, res, next) => {
    try {
        const productData = req.body;
        productData.userId = req.user[0]._id;
        console.log(`========  productData=====>>> `, productData);

        const product = await productDetailModel.findOne({ ...productData });

        if (!product) {
            productDetailModel.create(productData);
            console.log("INSERTED============>>");
            return res.send({ message: "SUCCESS", data: productData });
        }
        
        
        console.log(":::::::::::::::::: DATA ALREADY EXIST ::::::::::::::::");
        return res.send({ message: "DATA ALREADY EXIST" });

    } catch (error) {
        console.log("ERROR ====>", error);
    }
}

exports.getPrice = async (req, res, next) => {

    const data = await productDetailModel.find();
    console.log("DATA::::::::::::::>>", data);
    
    const selectorsObj = selectors.selectorObj;
    // console.log(`========  selectorsObj=====>>> `, selectorsObj)

    for (const elem of data) {
        const websiteName = getMainName(elem.productLink);

        console.log(`\n\n========  websiteName =====>>> ${websiteName}`);

        // if (websiteName == "amazon") continue;

        if (selectorsObj.hasOwnProperty(websiteName)) {
            const productSelectors = selectorsObj[websiteName];

            console.log(":::::::::::USER EMAIL-------===========", elem.userEmail);
            console.log(":::::::::::USER RS   -------===========", elem.productPrice);

            const scrapedData = await scrapeProductData(elem.productLink, productSelectors);
            if (scrapedData.productAvailability == "No") {
                console.log("PRODUCT NOT AVAILABLE");
                continue
            };
            scrapedData.productPrice = scrapedData.productPrice.replace("₹", "");

            console.log(`======== SCRAPED PRICE =====>>> `, scrapedData.productPrice);
            console.log(`========    DB PRICE   =====>>> `, elem.productPrice);

            if (scrapedData.productPrice < elem.productPrice) {

                const sendData = {
                    userEmail: elem.userEmail,
                    productLink: elem.productLink,
                    productTitle: scrapedData.productTitle,
                    productMentionedPrice: elem.productPrice,
                    productNewPrice: scrapedData.productPrice,
                    productImage: scrapedData.productImage
                }

                // console.log(sendData);
                await sendMail(sendData);
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