const navItems = [...document.querySelectorAll('.nav-item')];
const loginActive = document.getElementById('login-active');
const title = document.getElementById('login-modal-label');
const actionButton = document.getElementById('action-button');
const toggleLogin = document.getElementById('toggle-login');

const toggleFollows = [...document.querySelectorAll('.toggle-follow')];

const newTwinge = document.getElementById('new-twinge');
const newTwingeText = document.getElementById('new-twinge-text');

// Set active in the nav for the active page
window.onload = () => {
  // Set all inactive initially
  navItems.forEach(item => item.classList.remove('active'));

  const parmsStr = location.search;

  if (parmsStr !== '') {
    const parms = parmsStr.substr(1).split('&');

    parms.forEach(parm => {
      const [arg, value] = parm.split('=');

      if (arg === 'page') {
        const navItem = document.getElementById(value);

        if (navItem) navItem.classList.add('active');
      }
    });
  }
};

navItems.forEach(item =>
  item.addEventListener('click', e => {
    navItems.forEach(item => item.classList.remove('active'));

    e.currentTarget.classList.add('active');
  })
);

// Switch between login and signup
toggleLogin.addEventListener('click', e => {
  e.preventDefault();

  const suText = 'Sign up';
  const liText = 'Log in';

  if (loginActive.value === '1') {
    loginActive.value = '0';

    title.innerText = suText;
    actionButton.innerText = suText;
    toggleLogin.innerText = liText;
  } else {
    loginActive.value = '1';

    title.innerText = liText;
    actionButton.innerText = liText;
    toggleLogin.innerText = suText;
  }
});

// Sign up or log in
actionButton.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/actions.php?action=login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      loginActive: loginActive.value
    })
  });

  const data = await response.json();

  if (data.errors.length === 0) {
    window.location.assign('/');
  } else {
    const loginErrors = document.getElementById('login-errors');
    const content = data.errors.join('<br>');

    loginErrors.innerHTML = content;
    loginErrors.classList.add('alert', 'alert-danger');
  }
});

// Toggle whether the logged in user is following the tweet author
toggleFollows.forEach(tf => tf.addEventListener('click', toggleFollow));

async function toggleFollow(e) {
  const { userId } = e.target.dataset;

  const response = await fetch('/actions.php?action=toggleFollow', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });

  const data = await response.json();
  const linksForUser = document.querySelectorAll(
    `button[data-user-id="${userId}"]`
  );

  [...linksForUser].forEach(
    link => (link.innerText = data.following ? 'Unfollow' : 'Follow')
  );
}

if (newTwinge) {
  newTwingeText.addEventListener('input', () => {
    newTwinge.disabled = newTwingeText.value === '';
  });

  // Post a new twinge
  newTwinge.addEventListener('click', async () => {
    console.log('Send:', newTwingeText.value);
    const response = await fetch('/actions.php?action=newTwinge', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTwingeText.value })
    });

    const data = await response.json();

    window.location.reload(true);
  });
}
