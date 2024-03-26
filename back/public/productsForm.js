const createProductBtn = document.querySelector('#newProduct');

createProductBtn.addEventListener('click', async (e) => {
	e.preventDefault();

	const title = document.querySelector('#title').value;
	const price = document.querySelector('#price').value;
	const stock = document.querySelector('#stock').value;
	const photo = document.querySelector('#photo').value;

	const data = { title, price, stock };

	if (photo) data.photo = photo;

	const res = await fetch('http://localhost:8080/api/products/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const resData = await res.json();

	setTimeout(() => {
		if (resData.statusCode == 201) {
			window.location.href = 'http://localhost:8080/';
		} else {
			alert(resData.message);
		}
	}, 1000);
	console.log(resData);
});
