import { Schema, model } from 'mongoose';
import GameResults from './GameResults.js';

const User = new Schema({
	username: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	gameResults: [GameResults]
});

export default model('User', User);