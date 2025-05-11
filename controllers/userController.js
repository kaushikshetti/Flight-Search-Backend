const bcrypt = require("bcrypt");
const User  = require("../models/userModel");

exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please Input Username and Password" });
    }


    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

 
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(200)
      .json({ message: "User Created Successfully", newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error creating user" });
  }
};