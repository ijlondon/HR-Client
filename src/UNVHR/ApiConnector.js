import {getCurrentUser} from './UserService';
import { func } from 'prop-types';

const apiRoot = process.env.REACT_APP_API_HOST;

function makeApiGetRequest(endpoint) {
  const init = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (getCurrentUser()) {
    init.headers['Authorization'] = getCurrentUser().accessToken;
  }
  return fetch(apiRoot + endpoint, init)
    .then(results => { return results.json() });
}

export function getUser(userId) {
  const endpoint = 'employee/' + userId;
  return makeApiGetRequest(endpoint);
}

export function getCurrentUserInfo() {
  const endpoint = 'employee/userInfo';
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
  const endpoint = 'employee/search?toSearch=' + query;
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
  if (getCurrentUser()) {
    init.headers['Authorization'] = getCurrentUser().accessToken;
  }
  return fetch(url, init)
    .then(results => { return results.json() });
}

export function editEmployee(employee) {
  const endpoint = 'employee/' + employee.id + '/edit';
  return makeApiPostRequest(endpoint, employee);
}

export function editDepartment(department) {
  const endpoint = 'department/' + department.id + '/edit';
  return makeApiPostRequest(endpoint, department);
}

export function terminateEmployee(employee) {
  const endpoint = `employee/${employee.id}/terminate`;
  return makeApiPostRequest(endpoint, {});
}
