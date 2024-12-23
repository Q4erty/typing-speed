const caution = document.getElementById('caution');

function checker(){
	const login = document.getElementById('registrationUsername').value.trim();
	const password = document.getElementById('registrationPassword').value.trim();
	if(login.length > 0 && password.length > 4){
		caution.style.display = 'none';
	}
	else{
		caution.style.display = 'block';
	};
};

document.getElementById('registrationUsername').addEventListener('input', checker);
document.getElementById('registrationPassword').addEventListener('input', checker);