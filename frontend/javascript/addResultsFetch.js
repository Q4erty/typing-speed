export function addResults(duration, number_of_words, number_of_characters, mistakes, accuracy, wpm, csp){
	const token = localStorage.getItem('token');

	fetch('http://localhost:3000/profile/addResults', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({duration, number_of_words, number_of_characters, mistakes, accuracy, wpm, csp})
	})
	.then(res => {
		if (res.ok){
			alert("Your results recorded!")
		} else {
			alert("Something went wrong.")
		}
	})
	.catch(error => {
		console.error(error)
	})
}