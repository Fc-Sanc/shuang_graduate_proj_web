/*
export function someMutation (state) {
}
*/
export const setUserInfo = (state, user) => {
    state.info.userId = user.userId
    state.info.avatarUrl = user.avatarUrl
    state.info.username = user.username
    state.info.token = user.token
    state.info.imUserSig = user.imUserSig
}

export const setIsLogin = (state, val) => {
    state.isLogin = val
}


export const setIsIMReady = (state, val) => {
    state.isIMReady = val
}
