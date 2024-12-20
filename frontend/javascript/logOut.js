function logOut(){
	localStorage.removeItem('token');  
}

document.getElementById('logOut').addEventListener('click', logOut);