import User from '../models/User.js';

class resultsController {
	async addResults(req, res) {
		const { duration, number_of_words, number_of_characters, mistakes, accuracy, wpm, csp, date } = req.body;
		const userId = req.user.id;

		try {
			const user = await User.findById(userId);

			if (!user) {
				return res.status(404).send('User not found');
			}

			user.gameResults.push({
				duration: duration,
				number_of_words: number_of_words,
				number_of_characters: number_of_characters,
				mistakes: mistakes,
				accuracy: accuracy,
				wpm: wpm,
				csp: csp,
				date: date
			});

			await user.save();

			res.status(200).send('Game result recorded');
		} 
		catch (error) {
			console.error(error);
			res.status(500).send('Server error');
		};
	};

	async getResults(req, res) {
		const userId = req.user.id;
		try {
			const user = await User.findById(userId).select('gameResults');

			if (!user) {
				return res.status(404).send('User not found');
			}
			res.json(user.gameResults);

		} 
		catch (error) {
			console.error(error);
			res.status(500).send('Server error');
		};
	};
};

export default new resultsController();