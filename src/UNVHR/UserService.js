const userInfoKey = 'loginInfo';

export function handleLogin(response) {
  localStorage.setItem(userInfoKey, JSON.stringify(response));
  window.location.reload()
}

export function handleLogout(response) {
  localStorage.removeItem(userInfoKey);
  window.location.reload()
}

export function getCurrentUser() {
  if (localStorage.getItem(userInfoKey)) {
    const userInfo = JSON.parse(localStorage.getItem(userInfoKey));
    const expirationDate = userInfo.tokenObj.expires_at;
    const currentDate = new Date().getTime();
    if (currentDate >= expirationDate) {
      handleLogout();
    }
  }
  return localStorage.getItem(userInfoKey) ? JSON.parse(localStorage.getItem(userInfoKey)) : null;
}

