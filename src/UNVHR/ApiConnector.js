const apiRoot = 'https://hr-system-api-professionals.herokuapp.com/'

function makeApiGetRequest(endpoint) {
  return fetch(apiRoot + endpoint)
    .then(results=> { return results.json() });
}

export function getUser(userId) {
  const endpoint = 'employee/' + userId;
  return makeApiGetRequest(endpoint);
}

export function getDepartment(departmentId) {
  const endpoint = 'department/' + departmentId;
  return makeApiGetRequest(endpoint);
}

export function listDepartments() {
  const endpoint = 'department';
  return makeApiGetRequest(endpoint);
}

export function searchUser(query) {
  const endpoint = 'user/search?toSearch=' + query;
  return makeApiGetRequest(endpoint);
}
