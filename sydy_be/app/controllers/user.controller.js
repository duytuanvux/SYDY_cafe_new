const User = require('../models/user.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

exports.register = async (req, res) => {
  try {
    const userData = {
      user_id: uuid.v4(), // Generate a UUID for user_id
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      is_admin: false,
      phone: req.body.phone,
      address:req.body.address,
    };

    const existingUser = await User.checkUsernameExists(userData.username);
    const existingEmail = await User.checkEmailExists(userData.email);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }

    const hash = await argon2.hash(userData.password);
    userData.password = hash;

    const result = await User.register(userData);
    res.json({ success: true, message: 'User registered successfully', data: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user with the given username exists
      const user = await User.getUserByUsername(username);
  
      if (!user || !user[0]) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Verify the provided password with the hashed password in the database
      const passwordMatch = await argon2.verify(user[0].password, password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Generate a JWT token
      const secretKey = process.env.JWT_SECRET;
      const token = jwt.sign(
        {
          userId: user[0].user_id,
          username: user[0].username,
        },
        secretKey,
        { expiresIn: '24h' } // Token expiration time (adjust as needed)
      );
  
      const data = {
        user_id: user[0].user_id,
        fullname: user[0].fullname,
        is_admin : user[0].is_admin,
        token,
      };
  
      res.json({ success: true, message: 'Login successful', data });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
exports.getUserInfo = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const data = await User.getUserInfo(user_id);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateUserInfo = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const data = req.body;
        const result = await User.updateUserInfo(user_id,data);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAllUser = async (req,res) => {
  try {
      const data = await User.getAllUser()
      res.json(data)
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
