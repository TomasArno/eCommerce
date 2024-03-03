const registerFormBtn = document.querySelector('#register');
// const registerGoogleBtn = document.querySelector('#registerGoogle');

registerFormBtn.addEventListener('click', async (e) => {
	e.preventDefault();

	const email = document.querySelector('#email').value;
	const name = document.querySelector('#name').value;
	const password = document.querySelector('#password').value;
	const photo = document.querySelector('#photo').value;

	const data = { email, name, password };

	if (photo) data.photo = photo;

	const res = await fetch('http://localhost:8080/api/sessions/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	const resData = await res.json();

	if (resData.statusCode == 200) {
		window.location.href = 'http://localhost:8080/';
	} else {
		alert(resData.message);
	}

	console.log(resData);
});

// registerGoogleBtn.addEventListener('click', async (e) => {
// 	e.preventDefault();

// 	fetch('http://localhost:8080/api/sessions/google', {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 	});
// });

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…DcxfQ.ioKmYGDJfDuT34jVSYlMQn8M8pQTPHYsC-Zt6-pttrk
