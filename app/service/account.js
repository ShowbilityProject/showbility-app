import {API_TOKEN, HOST} from '../common/constant';
import {asyncGet, asyncPost, get, post, rawPost} from '../common/requester';
import {retrieveUserSession, storeUserSession} from '../common/securestorage';
import {isEmpty} from '../common/util';

function saveToken(token) {
  return storeUserSession(API_TOKEN, token).then(r => {
    if (r === true) {
      console.log('Save Token Succeed');
    } else {
      console.log('Save Token failed');
    }
    return r;
  });
}

export function requestSignIn(email, password) {
  let uri = HOST + '/getToken/';
  let body = {
    email: email,
    password: password,
  };
  return post(uri, body, false)
    .then(ret => ret.json())
    .then(data => {
      let token = data.token;
      if (isEmpty(token)) return false;
      else return saveToken(token);
    })
    .catch(err => {
      console.log('Error in requestSignIn:' + err);
      return false;
    });
}

export function requestSignUp(name, email, password, birth) {
  let uri = HOST + '/user/';
  let body = {
    nickname: name,
    email: email,
    password: password,
    date_of_birth: birth,
  };
  return post(uri, body)
    .then(res => {
      if (res.ok) return res;
      else throw Error(res.status);
    })
    .then(response => response.json())
    .then(json => {
      return saveToken(json['token']);
    })
    .catch(err => {
      console.log(err);
    });
}

export function validateToken(token) {
  let uri = '/app/sign/validate-token';
  return post(uri).then(response => response);
}

export function getProfile(user_id = 'my') {
  let uri = HOST + `/user/${user_id}/`;
  return get(uri)
    .then(res => {
      if (res.ok) return res.json();
      else {
        console.log(res.status, res.body);
        return false;
      }
    })
    .catch(err => {
      console.log(err.message);
      return false;
    });
}

export async function updateMyProfile(formData) {
  let uri = HOST + '/user/my/';
  return await rawPost(uri, formData);
}

export function getFollowers(user_id, _type) {
  let uri = HOST + `/user/${user_id}/${_type}/`;
  return get(uri)
    .then(res => res.json())
    .catch(() => false);
}

export function requestFollow(user_id) {
  let uri = HOST + `/user/${user_id}/follow/`;
  return post(uri)
    .then(res => res.json())
    .catch(() => false);
}

export function requestUnfollow(user_id) {
  let uri = HOST + `/user/${user_id}/follow/`;
  console.log(uri);
  return post(uri, undefined, true, 'DELETE')
    .then(res => res.json())
    .catch(() => false);
}

export async function verifyToken() {
  let token = await retrieveUserSession(API_TOKEN);
  let uri = HOST + '/verify-token/';
  let body = {
    token: token,
  };
  try {
    let ret = await asyncPost(uri, body, false);
    let serverToken = ret.token;
    return token === serverToken;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function refreshToken() {
  let token = await retrieveUserSession(API_TOKEN);
  let uri = HOST + '/refresh-token/';
  let body = {
    token: token,
  };
  try {
    let ret = await asyncPost(uri, body, false);
    let serverToken = ret.token;
    return token === serverToken;
  } catch (e) {
    console.log(e);
    return false;
  }
}
