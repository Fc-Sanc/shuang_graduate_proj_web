import cookie from 'js-cookie'

function fetch_s(input, init) {
  let token = cookie.get('jwt')
  console.log(init.headers)
  init.headers.Authorization = token
  return fetch(input, init)
}

export {
  fetch_s
}
