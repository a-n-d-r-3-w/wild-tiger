/* eslint-disable no-console,no-alert */
/* globals window, document, auth0, localStorage, alert */
window.addEventListener('load', () => {
  const loginStatus = document.querySelector('.container h4');
  const homeView = document.getElementById('home-view');
  const homeViewBtn = document.getElementById('btn-home-view');
  const loginBtn = document.getElementById('btn-login');
  const logoutBtn = document.getElementById('btn-logout');

  // noinspection ES6ModulesDependencies, NodeModulesDependencies
  const webAuth = new auth0.WebAuth({
    domain: 'wild-tiger.auth0.com',
    clientID: 'xP7Pdp7IfwuHO3hjKPtmlAtFDbO5m23x',
    responseType: 'token id_token',
    audience: 'https://wild-tiger.auth0.com/userinfo',
    scope: 'openid',
    redirectUri: window.location.href,
  });

  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    webAuth.authorize();
  });

  homeViewBtn.addEventListener('click', () => {
    homeView.style.display = 'inline-block';
    // loginView.style.display = 'none';
  });

  function isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function displayButtons() {
    if (isAuthenticated()) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
      loginStatus.innerHTML = 'You are logged in!';
    } else {
      loginBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
      loginStatus.innerHTML = 'You are not logged in! Please log in to continue.';
    }
  }

  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    displayButtons();
  }

  logoutBtn.addEventListener('click', logout);

  function setSession(authResult) {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime(),
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  function handleAuthentication() {
    webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        loginBtn.style.display = 'none';
        homeView.style.display = 'inline-block';
      } else if (err) {
        homeView.style.display = 'inline-block';
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
      displayButtons();
    });
  }

  handleAuthentication();
});