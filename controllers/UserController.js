import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const UserSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.render("signup", { Message: "Please Enter all fields" });

    const existUser = await User.findOne({ email });

    if (existUser)
      return res.render("signup", {
        Message: "User Already Exist Please Use Other Email ",
      });

    // hasing using bcrypt
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashPassword });

    // set session id
    req.session.userId = newUser._id;
    res.redirect("/");
  } catch (error) {
    res.render("signup", { Message: "Server Error. Please Try agin" });
  }
};


export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.render("login", { Message: "Please Enter all fields" });

    const user = await User.findOne({ email });

    if (!user)
      return res.render("login", {
        Message: "User not Exist Please Signup First",
      });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return res.render("login", { Message: "Password is incorrect" });

    // for session storage
    req.session.userId = user._id;

    res.redirect('/');

  } catch (error) {
    res.render("login", { Message: "Server Error. Please Try agin" });
  }
};
