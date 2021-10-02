import {HOST, APPLICATION_JSON} from './constant';
import {retrieveUserSession} from './securestorage';
import {isEmpty} from './util';

let jwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImNsb3duIiwiZXhwIjoxNjMzMTc0MDg1LCJlbWFpbCI6IiJ9.yhwsO9MF3MvSLBksEF68pwfTixKkSPL0ik_Y-lZWjw0';

function setToken() {
  retrieveUserSession('');
}

function getCommonOptions() {
  let options = {
    headers: {
      'Content-Type': APPLICATION_JSON,
    },
  };
  if (!isEmpty(jwtToken)) {
    options.headers['Authorization'] = `JWT ${jwtToken}`;
  }
  return options;
}

export function get(uri) {
  let options = getCommonOptions();
  options.method = 'GET';
  return fetch(uri, options);
}

export async function asyncGet(uri) {
  let options = getCommonOptions();
  options.method = 'GET';
  const res = await fetch(uri, options);

  if (!res.ok) {
    const msg = `Error on post ${uri}, msg: ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}

export function post(uri, body) {
  let options = getCommonOptions();
  options.method = 'POST';
  options.body = JSON.stringify(body);
  return fetch(uri, options);
}

export async function asyncPost(uri, body) {
  let options = getCommonOptions();
  options.method = 'POST';
  options.body = JSON.stringify(body);
  console.log(options);

  const res = await fetch(uri, options);

  if (!res.ok) {
    const msg = `Error on post ${uri}, msg: ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}

export async function rawPost(uri, body) {
  let options = getCommonOptions();
  options.method = 'POST';
  options.body = body;
  const res = await fetch(uri, options);

  if (!res.ok) {
    const msg = `Error on post ${uri}, msg: ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}
