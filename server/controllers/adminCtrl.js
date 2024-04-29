const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password)

        // Predefined admin credentials
        const predefinedUsername = 'admin';
        const predefinedPassword = 'admin123';

        // Compare the provided username and password with the predefined values
        if (username !== predefinedUsername || password !== predefinedPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // If the username and password match, generate a JWT token
        const token = jwt.sign({ username: predefinedUsername }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
