import { getResults } from './fetch/getResultsFetch.js';

async function watchingResults() {
	const data = await getResults();
	const place = document.getElementById('placeForResults');

	data.forEach(element => {
		const row = document.createElement('tr');

		const idTd = document.createElement('td');
		const date = new Date(element.date);
		idTd.textContent = date.toLocaleString('ru-RU');
		row.appendChild(idTd);

		const durationTd = document.createElement('td');
		durationTd.textContent = element.duration;
		row.appendChild(durationTd);

		const allWordsTd = document.createElement('td');
		allWordsTd.textContent = element.number_of_words;
		row.appendChild(allWordsTd);

		const allCharactersTd = document.createElement('td');
		allCharactersTd.textContent = element.number_of_characters;
		row.appendChild(allCharactersTd);

		const mistakesTd = document.createElement('td');
		mistakesTd.textContent = element.mistakes;
		row.appendChild(mistakesTd);

		const accuracyTd = document.createElement('td');
		accuracyTd.textContent = element.accuracy;
		row.appendChild(accuracyTd);

		const wpmTd = document.createElement('td');
		wpmTd.textContent = element.wpm;
		row.appendChild(wpmTd);

		const cspTd = document.createElement('td');
		cspTd.textContent = element.csp;
		row.appendChild(cspTd);

		place.prepend(row);
	});
};

document.addEventListener('DOMContentLoaded', watchingResults);