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

function makeApiPostRequest(endpoint, body) {
  const url = apiRoot + endpoint;
  const init = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  };

  return fetch(url, init)
    .then(results => { return results.json() });
}

export function editEmployee(employee) {
  const endpoint = 'employee/' + employee.id + '/edit';
  return makeApiPostRequest(endpoint, employee);
}

export function terminateEmployee(employee) {
  const endpoint = `employee/${employee.id}/terminate`;
  return makeApiPostRequest(endpoint, {});
}
