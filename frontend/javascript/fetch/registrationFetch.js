document.getElementById('registrationForm').addEventListener('submit', event => {
	event.preventDefault();

	const loadingScreen = document.getElementById('loadingScreen');
	const username = document.getElementById('registrationUsername').value;
  const password = document.getElementById('registrationPassword').value;

	loadingScreen.style.display = 'flex';

	fetch('https://speed-typing-backend.onrender.com/auth/registration', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({username, password})
	})
	.then(res => {
		loadingScreen.style.display = 'none';
		if (res.ok){
			alert("You registered successfully! Now you need to login")
			window.location.href = '../html/login.html'
		} else {
			alert("Something went wrong.")
		}
	})
	.catch(error => {
		loadingScreen.style.display = 'none';
		console.error(error)
	})
})
