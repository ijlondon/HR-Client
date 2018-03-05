export class ApiConnector {
  constructor() {
    this._apiRoot = 'http://localhost:8080/';
  }

  makeApiGetRequest(endpoint, data) {
    return fetch(this._apiRoot + endpoint, {
      method: 'GET',
      mode: 'no-cors'
    });
  }

  getUser(userId) {
    const endpoint = 'user/' + userId;
    const data = { };
    return this.makeApiGetRequest(endpoint, data);
  }
}
