export const base_url = 'http://localhost:7734'

export const api = {
    candidate: {
        register() {
            return {
                url: `${base_url}/register/candidate`,
                method: 'POST',
                body: {
                    username: '',
                    password: '',
                    email: '',
                    type: 'social',
                    name: ''
                }
            }
        },
        login() {
            return {
                url: `${base_url}/login/candidate`,
                method: 'POST',
                body: {
                    username: '',
                    password: ''
                }
            }
        },
        getSelfInfo() {
            return {
                url: `${base_url}/open/self_info`,
                method: 'GET'
            }
        },
        getUserInfo(id) {
            return {
                url: `${base_url}/open/user_info/${id}`,
                method: 'GET'
            }
        }
    },
    post: {
        getPosts(page = 0, pageSize = 10, type = 'all') {
            return {
                url: `${base_url}/open/posts/${page}/${pageSize}/${type}`,
                method: 'GET'
            }
        },
        get_requiring_posts_by_candidate_id(id) {
            return {
                url: `${base_url}/post/applying/candidate/${id}`,
                method: 'GET'
            }
        },
        get_requiring_posts_by_hr_id(id) {
            return {
                url: `${base_url}/post/applying/hr/${id}`,
                method: 'GET'
            }
        },
        get_requiring_posts_by_post_id(id) {
            return {
                url: `${base_url}/post/applying/post/${id}`,
                method: 'GET'
            }
        },
        apply() {
            return {
                url: `${base_url}/post/apply`,
                method: 'POST',
                body: {
                    candidateId: 0,
                    postId: 0
                }
            }
        }
    },
    postType: {
        getAll() {
            return {
                url: `${base_url}/open/post_type/all`,
                method: 'GET'
            }
        }
    },
    hr: {
        getById(id) {
            return {
                url: `${base_url}/open/hr/${id}`,
                method: 'GET'
            }
        },
        getAllByCompanyId(id) {
            return {
                url: `${base_url}/open/hr/companyId/${id}`,
                method: 'GET'
            }
        }
    },
    user: {
        checkLogin() {
            return {
                url: `${base_url}/checkLogin`,
                method: 'GET'
            }
        }
    },
    im: {
        getUserSig(userId) {
            return {
                url: `${base_url}/open/im/genUserSig/${userId}`,
                method: 'GET'
            }
        }
    },
    file: {
        upload() {
            return {
                url: `${base_url}/open/upload`,
                method: 'POST',
                body: {}
            }
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

