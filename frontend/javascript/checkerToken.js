const token = localStorage.getItem('token')

function checker(){
	if(token){
		document.getElementById('loginNavButton').innerHTML = '<a class="nav-link active" href="./profile.html">Profile</a>'
	}
	else{
		document.getElementById('loginNavButton').innerHTML = '<a class="nav-link active" href="./login.html">Log in</a>'
	}
}

checker()