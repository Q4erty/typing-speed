const token = localStorage.getItem('token');
const place = document.getElementById('textProfile')

export function getResults() {
    fetch('http://localhost:3000/profile/getResults', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            console.log("Something went wrong in getResultsFetch().");
        }
    })
    .then(data => {
        console.log(data);
				if (data && data.length > 0) {
					let resultHTML = "<ul>";
					data.forEach(result => {
							resultHTML += `
									<li>
											<strong>Duration:</strong> ${result.duration}s 
											<strong>Words:</strong> ${result.number_of_words} 
											<strong>Characters:</strong> ${result.number_of_characters} 
											<strong>Mistakes:</strong> ${result.mistakes} 
											<strong>Accuracy:</strong> ${result.accuracy}% 
											<strong>WPM:</strong> ${result.wpm} 
											<strong>CSP:</strong> ${result.csp} 
									</li>
							`;
					});
					resultHTML += "</ul>";
					place.innerHTML = resultHTML;
			} else {
					place.innerHTML = "<p>No results found.</p>";
			}
    })
    .catch(error => {
        console.error(error);
    });
}

getResults();