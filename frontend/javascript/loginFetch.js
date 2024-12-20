document.getElementById('loginForm').addEventListener('submit', event => {
	event.preventDefault();

	const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

	fetch('https://speed-typing-backend.onrender.com/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({username, password})
	})
	.then(res => {
		if (res.ok){
			alert("You logined successfully!")
			return res.json()
		} else {
			alert("Something went wrong.")
		}
	})
	.then(data => {
		if (data.token) {
			localStorage.setItem('token', data.token);
			console.log('User is logged in');
			window.location.href = '../html/index.html'
		} else {
			console.error('Login failed');
		}
	})
	.catch(error => {
		console.error(error)
	})
})