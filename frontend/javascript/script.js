import { addResults } from './fetch/addResultsFetch.js';

const text = 'Apple banana chair dog elephant flower Green house island juice king lamp mountain needle orange Pigeon queen rabbit Star tree aloha bird calf dogs 08324 eagle funny glow horizon igloo jump kingdom lion Moon nest oak pine quiet rose sun tide umbrella velvet wind Xylophone yellow zebra ace bright cup drum echo fish grass hop ink Joker kick luck map Night owl path Quest rain sleep turtle vine wall xmas yard zippy art belt candy dirt earth fox grip hill ice jet kite light Mouse nap olive 5467 paint queen red snow train unit Vast wind yawn Zero apple banana cat deer Egg fox garden hope inner joy Kelp leaf mud new owl pot queen rose seed turtle up vase whale xylophone yoke zone ant bus cheese dart Earth flower gift hamster iguana jug kiwi lantern marble nut 64345 orange pet quiz Rabbit salt tail Under volcano worm extra fog 32345 glow House ice jelly Kangaroo lion milk nice Ocean plant quick rock star time umbrella vase wind exit yard zen apple Balloon cream drop easy field gnome hint igloo joke koala light moon neck odd Peak quiz road sock top unity view wizard yellow zip alarm box 0012 dance eat face give hop inch'.split(" ");
const textLength = text.length;

let seconds = 0;
let time;
let isGameStarted = false;

function addClass(element, name){
  element.classList.add(name);
};

function removeClass(element, name){
	element.classList.remove(name);
};

function randomWord(){
	const randomIndx = Math.floor(Math.random() * textLength);
	return text[randomIndx];
};

function formatWord(word){
	return `<div class="word">${word.split('').map(letter => `<span class="letter">${letter}</span>`).join('')}</div>`;
};

function printedWords(){
	const words = document.querySelectorAll('.word');
	let counter = 0;

	for (let index = 0; index < words.length; index++) {
		if(words[index].classList.length === 1) counter++;
		else break;	
	}

	return counter;
};

function timerFormat(seconds){
	const minut = Math.floor(seconds / 60);
	const currentSeconds = seconds - minut * 60;
	if(minut >= 1){
		if(currentSeconds < 10 && minut < 10){
			return `0${minut}:0${currentSeconds}`;
		}
		else if(currentSeconds > 9 && minut < 10){
			return `0${minut}:${currentSeconds}`;
		}
		else if(currentSeconds < 10 && minut > 9){
			return `${minut}:0${currentSeconds}`;
		}
		else if(currentSeconds > 9 && minut > 9){
			return `${minut}:${currentSeconds}`;
		}
	}
	else if(seconds < 10){
		return `00:0${seconds}`;
	}
	else{
		return `00:${seconds}`;
	}
};

function timer(){
	const timerDiv = document.getElementById('timeText');

	if (isGameStarted) return;

	isGameStarted = true; 
	time = setInterval(() => {
		seconds++;
		timerDiv.innerText = timerFormat(seconds);
	}, 1000);
};


function newGame(){
	if (isGameStarted) return;

	document.getElementById('words').innerHTML = '';

	for(let i = 0; i < 500; i++){
		document.getElementById('words').innerHTML += formatWord(randomWord());
	}

	addClass(document.querySelector('.word'), 'current');
	addClass(document.querySelector('.letter'), 'current');

	const currentWord = document.querySelector('.word.current');
	cursor.style.display = 'block';
	cursor.style.top = currentWord.firstChild.getBoundingClientRect().top + 2 + 'px';
	cursor.style.left = currentWord.getBoundingClientRect().left - 1 + 'px';

	document.getElementById('stopButton').disabled = false;
	timer();
};

document.getElementById('game').addEventListener('keydown', event => {
	const key = event.key;
	const currentWord = document.querySelector('.word.current') || false;
	const currentLetter = document.querySelector('.letter.current');
	const expected = currentLetter?.innerHTML || ' ';
	const isLetter = key.length === 1 && key !== ' ';
	const isSpace = key === ' ';
	const isBackspace = key === 'Backspace';
	const isFirstLetter = currentLetter === currentWord.firstChild || false;

	// console.log({key, expected});
	if(!currentWord) stopGame();

	if(isLetter){
		if(currentLetter){
			addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
			removeClass(currentLetter, 'current');
			if(currentLetter.nextSibling){
				addClass(currentLetter.nextSibling, 'current');
			};
		}
		else{ // Adding wrong printed letter before space
			const incorrectLetter = document.createElement('span');
			incorrectLetter.innerHTML = key;
			incorrectLetter.className = 'letter incorrect extra';
			currentWord.appendChild(incorrectLetter);
		};
	};
	if(isSpace){
		if(expected !== ' '){
			const lettersToInvalide = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
			lettersToInvalide.forEach(element => {
				addClass(element, 'incorrect');
			});
		};

		removeClass(currentWord, 'current');
		addClass(currentWord.nextSibling, 'current');

		if(currentLetter){
			removeClass(currentLetter, 'current');
		};
		addClass(currentWord.nextSibling.firstChild, 'current');
	};

	if(isBackspace){
		// After space
		if(currentLetter && isFirstLetter){
			removeClass(currentWord, 'current');
			addClass(currentWord.previousSibling, 'current');

			removeClass(currentLetter, 'current');
			addClass(currentWord.previousSibling.lastChild, 'current');

			removeClass(currentWord.previousSibling.lastChild, 'correct');
			removeClass(currentWord.previousSibling.lastChild, 'incorrect');
		};

		// Default situation
		if(currentLetter && !isFirstLetter){
			removeClass(currentLetter, 'current');
			addClass(currentLetter.previousSibling, 'current');

			removeClass(currentLetter.previousSibling, 'correct');
			removeClass(currentLetter.previousSibling, 'incorrect');
		};

		// After last word
		if(!currentLetter){
			addClass(currentWord.lastChild, 'current');

			removeClass(currentWord.lastChild, 'correct');
			removeClass(currentWord.lastChild, 'incorrect');
		};
	};

	// Autoscrolling words
	if(currentWord.getBoundingClientRect().top > 320){
		const words = document.getElementById('words');
		const margin = parseFloat(words.style.marginTop || '0px');

		words.style.marginTop = (margin - 36.5) + 'px';
	};

	// Cursor
	const nextLetter = document.querySelector('.letter.current');
	const nextWord = document.querySelector('.word.current');
	const cursor = document.getElementById('cursor');

	if(nextLetter){
		cursor.style.top = nextLetter.getBoundingClientRect().top + 2 + 'px';
		cursor.style.left = nextLetter.getBoundingClientRect().left + 'px';
	}
	else{
		cursor.style.top = nextWord.getBoundingClientRect().top + 10 + 'px';
		cursor.style.left = nextWord.getBoundingClientRect().right - 1 + 'px';
	};
});

function stopGame(){
	const words = document.getElementById('words');
	const allWords = document.querySelectorAll('.word');
	const printedWordsAmount = printedWords();
	const cursor = document.getElementById('cursor');
	const timeText = document.getElementById('timeText');
	const mistakes = document.querySelectorAll('.letter.incorrect').length;
	const notMistakes = document.querySelectorAll('.letter.correct').length;
	const allCharacters = document.querySelectorAll('.letter');
	const allCharactersThatPrinted = mistakes + notMistakes;
	const accuracy = Math.floor((notMistakes * 100) / allCharactersThatPrinted) || 100;
	const wpm = (printedWordsAmount * (60 / seconds)).toFixed(1);
	const csp = (allCharactersThatPrinted / seconds).toFixed(1);

	// Modal window
	const durationModalText = document.getElementById('durationModalText');
	const numberOfWordsModalText = document.getElementById('numberOfWordsModalText');
	const numberOfCharactersModalText = document.getElementById('numberOfCharactersModalText');
	const mistakesModalText = document.getElementById('mistakesModalText');
	const accuracyModalText = document.getElementById('accuracyModalText');
	const wpmModalText = document.getElementById('wpmModalText');
	const cspModalText = document.getElementById('cspModalText');

	durationModalText.innerText = `Duration of the game: ${seconds} seconds`;
	numberOfWordsModalText.innerText = `Number of words: ${printedWordsAmount}`;
	numberOfCharactersModalText.innerText = `Number of characters: ${allCharactersThatPrinted}`;
	mistakesModalText.innerText = `Mistakes: ${mistakes}`;
	accuracyModalText.innerText = `Accuracy: ${accuracy}%`;
	wpmModalText.innerText = `WPM: ${wpm}`;
	cspModalText.innerText = `CSP: ${csp}`;

	// Database
	addResults(seconds, printedWordsAmount, allCharactersThatPrinted, mistakes, accuracy, wpm, csp);

	// Reset settings
	isGameStarted = false;
	words.innerHTML = '';
	cursor.style.display = 'none';
	clearInterval(time);
	seconds = 0;
	timeText.innerText = '00:00';
	words.style.marginTop = 0 + 'px';
	document.getElementById('stopButton').disabled = true;
};

document.getElementById('game').addEventListener('click', newGame);
document.getElementById('stopButton').addEventListener('click', stopGame);