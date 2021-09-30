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
      Authorization: `JWT ${jwtToken}`,
    },
  });
}

export async function asyncGet(uri) {
  if (isEmpty(jwtToken)) {
  }
  const res = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${jwtToken}`,
      'Content-Type': APPLICATION_JSON,
    },
  });

  if (!res.ok) {
    const msg = `Error on post ${uri}, msg: ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}

export function post(uri, body) {
  console.log(uri, body);
  return fetch(uri, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${jwtToken}`,
      'Content-Type': APPLICATION_JSON,
    },
    body: JSON.stringify(body),
  });
}

export async function asyncPost(uri, body) {
  console.log(uri, body);
  const res = await fetch(uri, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${jwtToken}`,
      'Content-Type': APPLICATION_JSON,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = `Error on post ${uri}, msg: ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}

export function rawPost(uri, body) {
  console.log(body);
  return fetch(uri, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${jwtToken}`,
    },
    body: body,
  });
}
