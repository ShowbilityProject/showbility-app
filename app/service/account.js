import {API_TOKEN, HOST} from '../common/constant';
import {asyncGet, asyncPost, deleteReq, get, post, rawPost} from '../common/requester';
import {removeUserSession, retrieveUserSession, storeUserSession} from '../common/securestorage';
import {isEmpty} from '../common/util';
import base64 from 'react-native-base64';

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
    username: email,
    password: password,
  };
  console.log(body);
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

export async function requestEmailValidationCode(email) {
  let uri = HOST + '/user/request_code';
  let body = {
    email: email,
  };
  return post(uri, body)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return false;
    })
}

export async function verifyEmailCode(email, code) {
  let uri = HOST + '/user/verify_email_code';
  let body = {
    email: email,
    code: code,
  };
  return post(uri, body)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      return false;
    })
}

export async function requestSignUp(
  nickname,
  email,
  password,
  agreeRule,
  agreeMarketing,
) {
  let uri = HOST + '/user/';
  let body = {
    username: email,
    nickname: nickname,
    password: password,
    agreeRule: agreeRule,
    agreeMarketing: agreeMarketing,
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

// {
//   "username": [
//       "Enter a valid email address."
//       "This field must be unique."
//   ]
// }
export async function requestDuplicateEmailCheck(email) {
  let uri = HOST + '/user/validate_email/';
  let body = {
    username: email,
  };
  return post(uri, body)
    .then(res => {
      if (res.ok) return true;
      else return false;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
}

export async function requestDuplicateNicknameCheck(nickname) {
  let uri = HOST + '/user/validate_nickname/';
  let body = {
    nickname: nickname,
  };
  return post(uri, body)
    .then(res => {
      if (res.ok) return true;
      else return false;
    })
    .catch(err => {
      console.log(err);
      return false;
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
    .then(res => {
      return res.ok;
    })
    .catch(err => {
      console.info(err);
      return false;
    });
}

export function requestUnfollow(user_id) {
  let uri = HOST + `/user/${user_id}/follow/`;
  console.log(uri);
  return post(uri, undefined, true, 'DELETE')
    .then(res => {
      return res.ok;
    })
    .catch(err => {
      console.info(err);
      return false;
    });
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

export async function requestLoginKakao(data) {
  await requestSignOut();
  let uri = HOST + '/user/kakao/';
  let ret = await asyncPost(uri, data);
  let token = ret.token;
  if (isEmpty(token)) return false;
  else return saveToken(token);
}

export async function requestLoginApple(data) {
  await requestSignOut();
  let uri = HOST + '/user/apple/';
  let ret = await asyncPost(uri, data);
  let token = ret.token;
  if (isEmpty(token)) return false;
  else return saveToken(token);
}

export async function requestSignOut() {
  let ret = await removeUserSession(API_TOKEN);
  return ret;
}

// user_id, username, email
export async function getCurrentUser() {
  let token = await retrieveUserSession(API_TOKEN);
  if (isEmpty(token)) return {};
  else {
    let infos = token.split('.');
    let infoString = await base64.decode(infos[1]);
    infoString = infoString.replace(/\0/g, '');
    return JSON.parse(infoString);
  }
}

export async function requestUserWithdraw(user_id) {
  let uri = HOST + `/user/${user_id}/`;
  const res = await deleteReq(uri);
  if (res.ok) {
    removeUserSession(API_TOKEN);
    return true;
  } else return false;
}
