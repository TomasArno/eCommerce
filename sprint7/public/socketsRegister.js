const socket = io();

const btnUserRegister = document.querySelector("#registerBtn");

btnUserRegister.addEventListener("click", (e) => {
  e.preventDefault();

  const userData = {};

  const email = document.querySelector("#email").value;
  const name = document.querySelector("#name").value;
  const photo = document.querySelector("#photo").value;

  if (name) userData.name = name;
  if (photo) userData.photo = photo;
  if (email) userData.email = email;

  socket.emit("userRegister", userData);
});
