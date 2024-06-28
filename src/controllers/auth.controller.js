const userModel = require("../model/user.model");


exports.addUser = (req, res) => {
    try {
        return res.render('register');
    } catch (error) {
        next(error);
        console.log("ERROR =====>>", error);
    }
}

exports.addUserProcess = async (req, res, next) => {
    // const { username = "", email = "" } = req.body;
    try {
        //   const errors = req.flash('error');
          const payload = req.body;

        //   if (errors) {
        const email = req.body.email;
        const isUserExist = await userModel.findOne({ email });
        console.log(`======== :: isUserExist  =====>>> `, isUserExist)

        if (!isUserExist) {
            await userModel.create(payload);

            return res.render('login');
        }
        else {
            // const errors = ["Email already in use"];
            // return res.render("register", {
            //     errors,
            //     formData: {
            //         username,
            //         email
            //     },
            // });
            console.log("USER EXISTS");
        }
        //   }
    } catch (error) {
        next(error);
    }
}

exports.loginUser = async (req, res, next) => {
    // const errors = req.flash('error');
    // return res.render('login', { errors });
    return res.render('login');
}

// exports.loginProcess = async (req, res,next) => {
//     const {email,password} = req.body;
//     // console.log(payload);

//     const user = await userModel.find({email});
//     console.log(user[0]);

//     if (user[0].password == '123456') {
//         console.log("LOGGED IN");
//     }else{

//         console.log("FAILED");
//     }
    
// }

exports.logout = (req, res, next) => {
    res.clearCookie("connect.sid");
    req.logout((err) => {
      if (err) return next(err)
      req.session.destroy((err) => {
        res.redirect('login');
      })
    })
  }