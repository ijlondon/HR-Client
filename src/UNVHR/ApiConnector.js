import {getCurrentUser} from './UserService';

const apiRoot = process.env.REACT_APP_API_HOST;

function makeApiGetRequest(endpoint) {
  const init = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCurrentUser().accessToken
    },
  };
  return fetch(apiRoot + endpoint, init)
    .then(results => { return results.json() });
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
      'Authorization': 'Bearer ' + getCurrentUser().accessToken
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
