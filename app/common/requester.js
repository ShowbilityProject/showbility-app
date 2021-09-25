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
  return fetch(uri, {
    method: 'GET',
    headers: {
      token: jwtToken,
    },
  });
}

export function post(uri, body) {
  console.log(uri, body);
  return fetch(uri, {
    method: 'POST',
    headers: {
      token: jwtToken,
      'Content-Type': APPLICATION_JSON,
    },
    body: JSON.stringify(body),
  });
}
