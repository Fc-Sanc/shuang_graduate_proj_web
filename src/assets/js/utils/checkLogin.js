import {Cookies, Notify} from "quasar";
import {fetch_get} from "assets/js/method/fetch_extension";
import {api} from "assets/js/api";

export function checkLogin(fail = () => {
}) {
    let userId = Cookies.get('user_id')
    if (userId) {
        fetch_get(api.user.checkLogin().url).then(result => {
            if (result.code === 0 && result.data === true) {
                console.log('login check pass.')
                return true
            } else {
                console.log('login check failed.')
                Notify.create('登录信息失效或未登录，请先登录后再进行操作')
                Cookies.remove('token');
                Cookies.remove('user_id')
                Cookies.remove('user_type')
                Cookies.remove('username')
                Cookies.remove('portrait_url')
                fail()
                return false
            }
        })
    } else {
        console.log('not login.')
        Notify.create('请登录后进行操作')
        Cookies.remove('token');
        Cookies.remove('user_id')
        Cookies.remove('user_type')
        Cookies.remove('username')
        Cookies.remove('portrait_url')
        fail()
        return false
    }

}
