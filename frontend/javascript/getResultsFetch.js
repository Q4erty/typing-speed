const token = localStorage.getItem('token');
const place = document.getElementById('textProfile')

export async function getResults() {
	let result = []
	try {
		const results = await fetch('https://speed-typing-backend.onrender.com/profile/getResults', {
			method: 'GET',
			headers: {
					'Authorization': `Bearer ${token}`
			}
		})

		const resultsInJson = await results.json()
		if(resultsInJson && resultsInJson.length > 0){
			result = resultsInJson
		}else{
			console.log('empty response')
		}		
	} catch (error) {
		console.log(error)
	}
	return result
}

getResults();