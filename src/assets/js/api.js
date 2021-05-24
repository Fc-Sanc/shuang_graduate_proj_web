export const base_url = 'http://localhost:7734'

export const api = {
  login_candidate: {
    url: `${base_url}/login/candidate`,
    method: 'POST'
  },
  register: {
    url: `${base_url}/register/candidate`,
    method: 'POST',
    params: {
      username: '',
      password: '',
      email: '',
      type: 'social',
      name: ''
    }
  }
}

export const api_third_party = {
  hitokoto: {
    url: `https://v1.hitokoto.cn/`,
    method: 'GET'
  },
  weather: {
    url: `https://www.tianqiapi.com/free/day?appid=38955711&appsecret=r18HwPHm`,
    method: 'GET'
  }
}

