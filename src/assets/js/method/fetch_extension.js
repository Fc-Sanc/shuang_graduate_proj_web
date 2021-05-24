import {Cookies} from "quasar";

function fetch_s(input, init) {
    let token = Cookies.get('jwt')
    console.log(init.headers)
    init.headers.Authorization = token
    return fetch(input, init)
}

export {
    fetch_s
}
