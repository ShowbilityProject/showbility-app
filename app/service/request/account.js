import {post} from "../../common/requester";

export function requestSignIn(email, password) {
    let uri = "/app/sign/signIn/";
    let body = {
        email: email,
        password: password,
    }
    return post(uri, body).then(response => {
        return response;
    }).catch(err => {
        console.log(err);
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