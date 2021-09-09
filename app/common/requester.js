import {HOST, APPLICATION_JSON} from "./constant";

let jwtToken = "";

export function get(uri) {
    return fetch(HOST + uri,{
        method: 'GET',
        headers: {
            "token": jwtToken,
        },
    })
}

export function post(uri, body) {
    console.log(HOST+uri, body);
    return fetch(HOST + uri,{
        method: 'POST',
        headers: {
            "token": jwtToken,
            'Content-Type': APPLICATION_JSON,
        },
        body: JSON.stringify(body)
    });
}