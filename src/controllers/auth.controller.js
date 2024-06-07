const userModel = require("../model/user.model");


exports.addUser = (req, res) => {
    try {
        console.log('HERERERE');
        return res.render('register');
    } catch (error) {
        // next(error);
        console.log("EROORR =====", error);
    }
    // res.render('register');
}
