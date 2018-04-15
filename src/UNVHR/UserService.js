const userInfoKey = 'loginInfo';

export function handleLogin(response) {
  localStorage.setItem(userInfoKey, JSON.stringify(response));
}

export function handleLogout(response) {
  console.log(response);
  localStorage.removeItem(userInfoKey);
}

export function getCurrentUser() {
  return localStorage.getItem(userInfoKey) ? JSON.parse(localStorage.getItem(userInfoKey)) : null;
}

