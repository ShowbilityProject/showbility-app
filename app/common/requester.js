import {HOST, APPLICATION_JSON, API_TOKEN} from './constant';
import {removeUserSession, retrieveUserSession} from './securestorage';
import {isEmpty} from './util';

let jwtToken = '';

async function getToken(refresh = false) {
  if (isEmpty(jwtToken)) {
    jwtToken = await retrieveUserSession(API_TOKEN);
    return jwtToken;
  } else {
    return jwtToken;
  }
}

function removeToken() {
  console.log('Remove Token');
  try {
    if (!isEmpty(jwtToken)) removeUserSession(API_TOKEN);
    jwtToken = '';
  } catch (e) {
    console.log(e);
  }
}

export function setToken(token) {
  jwtToken = token;
}

async function getCommonOptions(addToken = true) {
  let options = {
    headers: {
      'Content-Type': APPLICATION_JSON,
    },
  };
  let token = await getToken();
  if (!isEmpty(token) && addToken) {
    options.headers['Authorization'] = `JWT ${token}`;
  }
  return options;
}

export function get(uri, retry = false) {
  return getCommonOptions().then(options => {
    options.method = 'GET';
    return fetch(uri, options).then(res => {
      if (res.ok) return res;
      else {
        if (res.status === 401) {
          removeToken();
          res.json().then(r => console.log(r));
          if (!retry) return get(uri, true);
        }
        let msg = `Error GET ${uri}, ${res.status}, ${res.body}`;
        throw new Error(msg);
      }
    });
  });
}

export async function asyncGet(uri, retry = false) {
  let options = await getCommonOptions();
  options.method = 'GET';
  const res = await fetch(uri, options);

  if (!res.ok) {
    if (res.status === 401) {
      removeToken();
      res.json().then(r => console.log(r));
      return asyncGet(uri, true);
    }
    const msg = `Error on get ${uri}, msg: ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}

export function post(uri, body, addToken = true, method = 'POST') {
  return getCommonOptions(addToken).then(options => {
    options.method = method;
    options.body = JSON.stringify(body);

    return fetch(uri, options).then(res => {
      if (res.ok) return res;
      else {
        if (res.status === 401) removeToken();
        let msg = `Error post ${uri}, ${res.status}, ${res.body}`;
        console.log(msg);
        throw new Error(msg);
      }
    });
  });
}

export async function asyncPost(uri, body, addToken = true, method = 'POST') {
  let options = await getCommonOptions(addToken);
  options.method = method;
  options.body = JSON.stringify(body);

  const res = await fetch(uri, options);

  if (res.status === 401) removeToken();
  if (!res.ok) {
    const msg = `Error on post ${uri}, msg: ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}

export async function rawPost(uri, body) {
  let options = await getCommonOptions();
  options.method = 'POST';
  options.body = body;
  const res = await fetch(uri, options);

  if (res.status === 401) removeToken();
  if (!res.ok) {
    const msg = `Error on post ${uri}, msg: ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}
