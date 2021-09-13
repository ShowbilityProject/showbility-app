import {HOST, APPLICATION_JSON} from './constant';
import {retrieveUserSession} from './securestorage';
import {isEmpty} from './util';

let jwtToken = '';

function setToken() {
  retrieveUserSession('');
}

export function get(uri) {
  if (isEmpty(jwtToken)) {
  }
  return fetch(HOST + uri, {
    method: 'GET',
    headers: {
      token: jwtToken,
    },
  });
}

export function post(uri, body) {
  console.log(HOST + uri, body);
  return fetch(HOST + uri, {
    method: 'POST',
    headers: {
      token: jwtToken,
      'Content-Type': APPLICATION_JSON,
    },
    body: JSON.stringify(body),
  });
}
