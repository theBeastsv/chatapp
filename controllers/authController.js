const User = require("../models/user"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
   
    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send("Username already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, process.env.SECRETKEY); // Replace with your secret key

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
   
    const user = await User.findOne({ username });
    
    if (!user) return res.status(401).send("Invalid username or password");

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
   
    if (!isMatch) return res.status(401).send("Invalid username or password");

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.SECRETKEY); // Replace with your secret key
    

  

    res.send({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
