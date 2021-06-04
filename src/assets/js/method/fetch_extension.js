import {Cookies} from "quasar";

export function fetch_base(url, optionalValue) {
    let token = Cookies.get('token')
    if (token != null) {
        if (optionalValue.headers != null) {
            optionalValue.headers['Authorization'] = token
        } else {
            optionalValue.headers = {
                'Authorization': token
            }
        }
    }
    return fetch(url, optionalValue).then(promise => promise.json())
}

export function fetch_get(url) {
    return fetch_base(url, {method: 'GET'})
}

export function fetch_post_json_body(url, optionalValue) {
    optionalValue.method = 'POST'
    if (optionalValue.headers != null) {
        optionalValue.headers['Content-Type'] = 'application/json; charset=UTF-8'
    } else {
        optionalValue.headers = {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
    return fetch_base(url, optionalValue)
}

export function fetch_tp(url, optionalValue) {
    return fetch(url, optionalValue).then(promise => promise.json())
}
