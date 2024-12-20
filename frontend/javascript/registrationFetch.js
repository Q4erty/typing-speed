document.getElementById('registrationForm').addEventListener('submit', event => {
	event.preventDefault();

	const username = document.getElementById('registrationUsername').value;
  const password = document.getElementById('registrationPassword').value;

	fetch('https://speed-typing-backend.onrender.com/auth/registration', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({username, password})
	})
	.then(res => {
		if (res.ok){
			alert("You registered successfully! Now you need to login")
			window.location.href = '/frontend/html/login.html'
			return res.json()
		} else {
			alert("Something went wrong.")
		}
	})
	.then(data => {
		if (data.token) {
			localStorage.setItem('token', data.token);
			console.log('User is logged in');
		} else {
			console.error('Login failed');
		}
	})
	.catch(error => {
		console.error(error)
	})
})
