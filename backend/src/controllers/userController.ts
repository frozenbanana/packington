import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    // 1. Validate user input
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password should be at least 6 characters.' });
    }

    try {
        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // 3. Hash password (This step can be skipped if using the pre-save middleware in the User model to hash the password)
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create user
        const user: IUser = new User({
            username,
            email,
            password  // Or use 'hashedPassword' if you hashed the password above.
        });

        // 5. Save user
        await user.save();

        // 6. Send response (you might also want to create and send a JWT here for auto-login after registration)
        res.status(201).json({ message: 'User registered successfully.' });

    } catch (error) {
        console.error('Error registering user: ', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // 1. Validate user input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    try {
        // 2. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // 3. Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // 4. Create JWT
        const payload = { userId: user.id };  // Can add more claims if needed
        const token = jwt.sign(payload, 'your_secret_jwt_key', { expiresIn: '1h' });  // 'your_secret_jwt_key' should be kept secret and ideally loaded from environment variables

        // 5. Send response
        res.status(200).json({
            message: 'Logged in successfully.',
            token: token
        });

    } catch (error) {
        console.error('Error during login: ', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
