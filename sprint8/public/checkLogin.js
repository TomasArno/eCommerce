const removeChilds = (father, childArray) => {
  for (const child of childArray) {
    father.removeChild(child);
  }
};

(async () => {
  const res = await fetch('/api/sessions/');
  const data = await res.json();

  const navBarEl = document.querySelector('.navbar_container');

  const navLoginEl = document.querySelector('#nav-login');
  const navRegisterEl = document.querySelector('#nav-register');
  const navOrdersEl = document.querySelector('#nav-orders');
  const navFormEl = document.querySelector('#nav-form');
  const signoutEl = document.querySelector('#nav-signout');

  if (data.statusCode !== 200) {
    removeChilds(navBarEl, [navFormEl, navOrdersEl, signoutEl]);
  } else {
    removeChilds(navBarEl, [navLoginEl, navRegisterEl]);

    if (data.message.role < 1) {
      navBarEl.removeChild(navFormEl);
    }
  }

  signoutEl.addEventListener('click', () => {
    fetch('/api/sessions/signout', { method: 'POST' });
    location.replace('/');
  });
})();
