import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

dotenv.config();

// Generation tokens
const generateAccesToken = id => {
	const payload = { id };
	return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class authController {
	async registration(req, res) {
		try {
			// Getting results of checking(in authRouter.js) length of password
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Regitration failed: ', errors });
			}

			const { username, password } = req.body;

			const candidate = await User.findOne({ username });
			if (candidate) {
				res.status(400).json({ message: 'This name is already taken' });
			};

			// Encrypting password
			const hashPassword = bcrypt.hashSync(password, 7);
			const user = new User({ username, password: hashPassword });
			
			await user.save();
			
			return res.status(201).json({ message: 'Success registration' });
		}
		catch (error) {
			res.status(400).json({ message: 'Registration error' });
		};
	};

	async login(req, res) {
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ username });

			if (!user) {
				return res.status(400).json({ message: `User ${username} not found` });
			};

			// Compare password without decrypting
			const validPassword = bcrypt.compareSync(password, user.password);

			if (!validPassword) {
				return res.status(400).json({ message: `Wrong password` });
			};

			const token = generateAccesToken(user._id);
			return res.json({ token });
		} 
		catch (error) {
			console.log(error);
			res.status(400).json({ message: 'Login error' });
		};
	};
};

export default new authController();