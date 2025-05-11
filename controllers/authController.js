const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User  = require("../models/userModel");
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please Input Username and Password" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: "Login Successful",token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error during login" });
  }
};