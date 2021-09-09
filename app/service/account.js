import { API_TOKEN } from "../common/constant";
import {post} from "../common/requester";
import {storeUserSession} from '../common/securestorage';
import { isEmpty } from "../common/util";

export function requestSignIn(email, password) {
  let uri = "/app/sign/signIn/";
  let body = {
    email: email,
    password: password,
  }
  return post(uri, body).then(ret => ret.headers.get('token'))
  .then(jwtToken => {
    if (isEmpty(jwtToken))
      return false;
    else
      return storeUserSession(API_TOKEN, jwtToken).then(r => {
        if (r == true) {
          console.log("Save Token Succeed");
        } else {
          console.log("Save Token failed");
        }
        return r;
      });
  })
  .catch(err => {
    console.log('Error in requestSignIn:' + err);
    return false;
  })
}

export function requestSignUp(name, email, password, birth) {
  let uri =  "/app/sign/signUp/";
  let body = {
    name: name,
    email: email,
    password: password,
    birth: birth,
  }
  return post(uri, body).then(response => {
    if (response.status == 200) {
      return true;
    } else {
      console.log(response.body);
      return false;
    }
  }).catch(err => {
    console.log(err);
  })
}

export function validateToken(token) {
  let uri = "/app/sign/validate-token";
  return post(uri).then(response => response);
}
