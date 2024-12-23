import { Schema } from 'mongoose';

const GameResults = new Schema({
	duration: {type: String},
  number_of_words: {type: Number},
	number_of_characters: {type: Number},
	mistakes: {type: Number},
	accuracy: {type: Number},
	wpm: {type: Number},
	csp: {type: Number},
  date: { type: Date, default: Date.now }
});

export default GameResults;