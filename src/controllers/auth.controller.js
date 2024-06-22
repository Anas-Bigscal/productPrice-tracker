const userModel = require("../model/user.model");


exports.addUser = (req, res) => {
    try {
        // console.log('HERERERE');
        return res.render('register');
    } catch (error) {
        // next(error);
        console.log("ERROR =====>>", error);
    }
    // res.render('register');
}

exports.addUserProcess = async (req, res, next) => {
    const { username = "", email = "" } = req.body;
    try {
        //   const errors = req.flash('error');

        //   if (errors) {
        const email = req.body.email;
        const isUserExist = await userModel.findOne({ email });

        if (!isUserExist) {
            await userModel.create(req.body);
            return res.redirect('/auth/login');
        }
        else {
            const errors = ["Email already in use"];
            return res.render("register", {
                errors,
                formData: {
                    username,
                    email
                },
            });
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