// function getMainName(url) {
//     try {

//         // The URL constructor is used to parse the given URL.
//         // new URL(url) creates a URL object from the provided URL string.
//         // .hostname extracts the hostname from the URL. For example, from https://www.flipkart.com/some-product, it extracts www.flipkart.com.
//         const hostname = new URL(url).hostname;
//         console.log(`========  hostname  =====>>> `, hostname);
//         const websiteName = hostname.split('.').slice(-2, -1)[0];
//         console.log(`========  webName  =====>>> `, websiteName)
//         // const mainName = hostname.split('.').slice(-3, -2)[0];
//         // console.log(`========  mainName=====>>> `, mainName)
//         // console.log(`======== HEHE=====>>> `,  hostname.split('.').slice(-2, -1)[0])

//         // return mainName || hostname.split('.').slice(-2, -1)[0];
//         // return hostname.split('.').slice(-2, -1)[0];
//         return websiteName;
//     } catch (e) {
//         console.error('Invalid URL:', e);
//         return null;
//     }
// }

// // Example usage
// const url1 = "https://www.flipkart.com/xiaomi-11i-hypercharge-5g-pacific-pearl-128-gb/p/itm495eaae251d5b?pid=MOBG9QWVHHSZS9HY&lid=LSTMOBG9QWVHHSZS9HYP30X9H&marketplace=FLIPKART&store=tyy%2F4io&srno=b_1_1&otracker=nmenu_sub_Electronics_0_Mi&iid=9b7ec196-3316-4281-b480-f80ea19ab3c0.MOBG9QWVHHSZS9HY.SEARCH&ssid=73gk2s7ec00000001716983432041";
// const url2 = "https://amazon.in/Sony-DualSense-Controller-Grey-PlayStation/dp/B0BQXZ11B8?ref=dlx_deals_dg_dcl_B0BQXZ11B8_dt_sl10_8e&th=1";
// const url3 = "https://www.flipkart.com/sony-alpha-ilce-6100l-aps-c-mirrorless-camera-16-50-mm-power-zoom-lens-featuring-eye-af-4k-movie-recording/p/itmdc3e60ee35fb1?pid=CAMFM67HBBUJWA9Y&lid=LSTCAMFM67HBBUJWA9YEQYFI8&marketplace=FLIPKART&store=jek%2Fp31%2Ftrv&srno=b_1_1&otracker=browse&fm=organic&iid=b145c620-200b-42c4-83bd-e153e34d7a34.CAMFM67HBBUJWA9Y.SEARCH&ppt=None&ppn=None&ssid=wjoyq1ondc0000001716963084869";

// console.log(getMainName(url1)); // Output: flipkart
// console.log(getMainName(url2)); // Output: amazon
// console.log(getMainName(url3)); // Output: amazon
const productTitle = document.querySelector(titleSelector).innerText;

const productPrice = document.querySelector(priceSelector).innerText;