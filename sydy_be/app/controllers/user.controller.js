const User = require('../models/user.model');
const PwReset = require('../models/pw-reset.model')
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'contact.duytuan@gmail.com',   // Replace with your Gmail email address
      pass: 'ddol uuka fwzg vgln'            // Replace with your Gmail password
  }
});

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
      isActive : true
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
      if (!user[0].isActive) {
        return res.status(401).json({ error: 'User is not active' });
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
 exports.deactivateUserController = async(req, res) => {
  const userId = req.params.user_id; // Assuming userId is passed as a parameter in the request

  try {
      // Check if the user exists
      const userExists = await User.getUserInfo(userId);
      if (!userExists) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Deactivate the user
      await User.deactivateUser(userId);

      res.status(200).json({ message: 'User deactivated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.forgotPassword = async (req, res) => {
  try {
      const {email} = req.body;
      const user = await User.getUserInfoByEmail(email);

      if (!user || !user[0]) {
          return res.status(404).json({ error: 'User not found' });
      }

      const resetToken = uuid.v4();
      const expirationTime = new Date(Date.now() + 3600000); // 1 hour expiration

      // Store the reset token and expiration time in the database
      // You need to add a new column to your user table for storing the reset token and expiration time
      await PwReset.storeResetToken(user[0].user_id,resetToken,expirationTime)

      // Send the password reset email
        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: 'contact.duytuan@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: `Click on the following link to reset your password: ${resetLink}`,
        };
        await transporter.sendMail(mailOptions);
      res.json({ success: true, message: 'Password reset instructions sent to your email' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle the password reset with the token
exports.resetPassword = async (req, res) => {
  try {
      const { token, newPassword } = req.body;

      // Verify the token's validity and expiration
      const resetInfo = await PwReset.getResetInfoByToken(token);

      if (!resetInfo || !resetInfo[0] || new Date() > new Date(resetInfo[0].reset_expiration)) {
          return res.status(401).json({ error: 'Invalid or expired token' });
      }

      // Update the user's password and clear the reset token fields
      const hashedPassword = await argon2.hash(newPassword);
      await User.updatePassword(resetInfo[0].user_id, hashedPassword);
      await PwReset.deleteResetInfoByUserId(resetInfo[0].user_id);
      res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Add this controller in your controllers file
exports.changePassword = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { currentPassword, newPassword } = req.body;

    // Retrieve the user's current hashed password from the database
    const user = await User.getUserPW(user_id);
    if (!user || !user[0]) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(user)
    // Verify the provided current password with the hashed password in the database
    const passwordMatch = await argon2.verify(user[0].password, currentPassword);
    console.log(passwordMatch)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    // Hash the new password before updating it in the database
    const hashedNewPassword = await argon2.hash(newPassword);

    // Update the user's password
    await User.updatePassword(user_id, hashedNewPassword);

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.activateUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const data = await User.activateUser(user_id);

    if (data) {
      res.status(200).json({ success: true, message: "User activated successfully." });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deActivateUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const data = await User.deactivateUser(user_id);

    if (data) {
      res.status(200).json({ success: true, message: "User deactivated successfully." });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
