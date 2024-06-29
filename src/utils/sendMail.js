const nodemailer = require("nodemailer");

exports.sendMail = async (data) => {

    const sendMailTo = data.userEmail;
    const productLink = data.productLink;
    const productTitle = data.productTitle;
    const productMentionedPrice = data.productMentionedPrice;
    const productNewPrice = data.productNewPrice;
    const productImage = data.productImage

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "priceio.alert@gmail.com",
            pass: "wxxr ivir qqgr kzyw"
        }
    });

    let mailOptions = {
        from: "mail@gmail.com",
        to: `${sendMailTo}`,
        subject: "Price Drop Alert: Don't Miss Out!",
        html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <p>Hi there,</p>
        <p><strong>Great news!</strong> The price of the product you've been eyeing has just dropped.</p>
        <p>
            <strong>Product:</strong> 
            <span style="font-size: 18px; color: #d9534f;">${productTitle}</span>
        </p>
        <p style="text-align: center;">
            <img src="${productImage}" alt="Product Image" style="max-width: 400px; height: auto; margin-bottom: 20px;">
        </p>
        <p>
            <strong>Original Price:</strong> 
            <span style="font-size: 18px; color: #5bc0de;">${productMentionedPrice}</span><br>
            <strong>New Price:</strong> 
            <span style="font-size: 18px; color: #5cb85c;">${productNewPrice}</span>
        </p>
        <p>Don't miss this opportunity to grab your product at a lower price! Act fast before the price goes up again.</p>
        <p style="text-align: center;">
            <a href="${productLink}" style="display: inline-block; padding: 10px 20px; background-color: #f0ad4e; color: #fff; text-decoration: none; border-radius: 5px;">Purchase Now</a>
        </p>
        <p>Happy shopping!</p>
        <p>Best regards,<br>Your Shopping Alert Team</p>
    </div>
    `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(":::::::::ERROR:::::", error);
        }
        else {
            console.log("Email sent:::::", info.response);
        }
    });
}