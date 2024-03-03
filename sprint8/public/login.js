const loginFormBtn = document.querySelector('#login');
// const loginGoogleBtn = document.querySelector('#loginGoogle');

loginFormBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const data = { email, password };

  const res = await fetch('http://localhost:8080/api/sessions/login', {
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

// loginGoogleBtn.addEventListener('click', async (e) => {
// 	e.preventDefault();

// 	fetch('http://localhost:8080/api/sessions/google', {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 	});
// });
