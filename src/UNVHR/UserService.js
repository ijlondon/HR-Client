const userInfoKey = 'loginInfo';

export function handleLogin(response) {
  localStorage.setItem(userInfoKey, JSON.stringify(response));
  window.location.reload()
}

export function handleLogout(response) {
  console.log(response);
  localStorage.removeItem(userInfoKey);
  window.location.reload()
}

export function getCurrentUser() {
  return localStorage.getItem(userInfoKey) ? JSON.parse(localStorage.getItem(userInfoKey)) : null;
}

