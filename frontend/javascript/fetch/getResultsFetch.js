const token = localStorage.getItem('token');

export async function getResults() {
	const loadingScreen = document.getElementById('loadingScreen');
	let result = [];

	loadingScreen.style.display = 'flex';

	try {
		const response = await fetch('https://speed-typing-backend.onrender.com/profile/getResults', {
			method: 'GET',
			headers: {
					'Authorization': `Bearer ${token}`
			}
		});

		if (response.status === 401) {
			window.location.href = '/frontend/html/login.html';
			return;
		};

		const resultsInJson = await response.json();
		if(resultsInJson && resultsInJson.length > 0){
			result = resultsInJson;
		}else{
			console.error('Empty response');
		};
	} catch (error){
		loadingScreen.style.display = 'none';
		console.error(error);
	};
	loadingScreen.style.display = 'none';
	return result;
};

getResults();