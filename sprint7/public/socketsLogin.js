const socket = io();

const btnUserLogin = document.querySelector("#loginBtn");

btnUserLogin.addEventListener("click", (e) => {
  e.preventDefault();

  const userData = {};

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (email) userData.email = email;
  if (password) userData.password = password;

  socket.emit("userLogin", userData);
});
