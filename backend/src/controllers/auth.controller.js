const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key_here';

exports.register = async (req, res) => {
    try {
        // Accept various field name formats from frontend
        let { name, username, firstName, lastName, email, password, phone, location, city, country } = req.body;

        // Build name from firstName + lastName if name not provided
        if (!name) {
            if (firstName && lastName) {
                name = `${firstName} ${lastName}`.trim();
            } else if (firstName) {
                name = firstName;
            } else if (username) {
                name = username;
            }
        }

        // Build location from city + country if not provided
        if (!location && (city || country)) {
            location = [city, country].filter(Boolean).join(', ');
        }

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        }

        if (!name) {
            return res.status(400).json({ message: 'Name is required (provide name, username, or firstName)' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            location
        });

        // Generate token immediately so user is logged in after registration
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });

        res.status(201).json({
            message: 'User registered successfully',
            userId: user.id,
            token,
            user: {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Allow login with either 'username' field OR 'email' field
        const loginEmail = username || email;

        if (!loginEmail || !password) {
            return res.status(400).json({ message: 'Email/Username and Password are required' });
        }

        const user = await User.findOne({ where: { email: loginEmail } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });

        res.json({
            token,
            user: {
                id: user.id.toString(),
                name: user.name,
                avatar: user.avatar,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
