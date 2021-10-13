import {API_TOKEN, HOST} from '../common/constant';
import {post} from '../common/requester';
import {storeUserSession} from '../common/securestorage';
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
  return post(uri, body)
    .then(ret => ret.json())
    .then(jwtToken => {
      console.log(jwtToken['token']);
      if (isEmpty(jwtToken)) return false;
      else return saveToken(jwtToken);
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
