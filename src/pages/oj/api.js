import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
const bestUrl = 'http://www.housegod.cn/api/'
export default {
  getWebsiteConf (params) {
    return ajax(bestUrl+'website', 'get', {
      params
    })
  },
  getAnnouncementList () {
    return ajax(bestUrl+'announcement', 'get')
  },
  login (data) {
    return ajax(bestUrl+'login', 'post', {
      data
    })
  },
  checkUsernameOrEmail (username, email, phone) {
    return ajax(bestUrl+'check_username_or_email', 'post', {
      data: {
        username,
        email,
        phone
      }
    })
  },
  // 注册
  register (data) {
    return ajax(bestUrl+'register', 'post', {
      data
    })
  },
  logout () {
    return ajax(bestUrl+'logout', 'get')
  },
  getCaptcha () {
    return ajax(bestUrl+'captcha', 'get')
  },
  getUserInfo (username = undefined) {
    return ajax(bestUrl+'profile', 'get', {
      params: {
        username
      }
    })
  },
  updateProfile (profile) {
    return ajax(bestUrl+'profile', 'put', {
      data: profile
    })
  },
  freshDisplayID (userID) {
    return ajax(bestUrl+'profile/fresh_display_id', 'get', {
      params: {
        user_id: userID
      }
    })
  },
  twoFactorAuth (method, data) {
    return ajax(bestUrl+'two_factor_auth', method, {
      data
    })
  },
  tfaRequiredCheck (username) {
    return ajax(bestUrl+'tfa_required', 'post', {
      data: {
        username
      }
    })
  },
  getSessions () {
    return ajax(bestUrl+'sessions', 'get')
  },
  deleteSession (sessionKey) {
    return ajax(bestUrl+'sessions', 'delete', {
      params: {
        session_key: sessionKey
      }
    })
  },
  applyResetPassword (data) {
    return ajax(bestUrl+'apply_reset_password', 'post', {
      data
    })
  },
  resetPassword (data) {
    return ajax(bestUrl+'reset_password', 'post', {
      data
    })
  },
  changePassword (data) {
    return ajax(bestUrl+'change_password', 'post', {
      data
    })
  },
  changeEmail (data) {
    return ajax(bestUrl+'change_email', 'post', {
      data
    })
  },
  getLanguages () {
    return ajax(bestUrl+'languages', 'get')
  },
  getProblemTagList () {
    return ajax(bestUrl+'problem/tags', 'get')
  },
  getProblemList (offset, limit, searchParams) {
    let params = {
      paging: true,
      offset,
      limit
    }
    Object.keys(searchParams).forEach((element) => {
      if (searchParams[element]) {
        params[element] = searchParams[element]
      }
    })
    return ajax(bestUrl+'problem', 'get', {
      params: params
    })
  },
  pickone () {
    return ajax(bestUrl+'pickone', 'get')
  },
  getProblem (problemID) {
    return ajax(bestUrl+'problem', 'get', {
      params: {
        problem_id: problemID
      }
    })
  },
  getContestList (offset, limit, searchParams) {
    let params = {
      offset,
      limit
    }
    if (searchParams !== undefined) {
      Object.keys(searchParams).forEach((element) => {
        if (searchParams[element]) {
          params[element] = searchParams[element]
        }
      })
    }
    return ajax(bestUrl+'contests', 'get', {
      params
    })
  },
  getContest (id) {
    return ajax(bestUrl+'contest', 'get', {
      params: {
        id
      }
    })
  },
  getContestAccess (contestID) {
    return ajax(bestUrl+'contest/access', 'get', {
      params: {
        contest_id: contestID
      }
    })
  },
  checkContestPassword (contestID, password) {
    return ajax(bestUrl+'contest/password', 'post', {
      data: {
        contest_id: contestID,
        password
      }
    })
  },
  getContestAnnouncementList (contestId) {
    return ajax(bestUrl+'contest/announcement', 'get', {
      params: {
        contest_id: contestId
      }
    })
  },
  getContestProblemList (contestId) {
    return ajax(bestUrl+'contest/problem', 'get', {
      params: {
        contest_id: contestId
      }
    })
  },
  getContestProblem (problemID, contestID) {
    return ajax(bestUrl+'contest/problem', 'get', {
      params: {
        contest_id: contestID,
        problem_id: problemID
      }
    })
  },
  submitCode (data) {
    return ajax(bestUrl+'submission', 'post', {
      data
    })
  },
  getSubmissionList (offset, limit, params) {
    params.limit = limit
    params.offset = offset
    return ajax(bestUrl+'submissions', 'get', {
      params
    })
  },
  getContestSubmissionList (offset, limit, params) {
    params.limit = limit
    params.offset = offset
    return ajax(bestUrl+'contest_submissions', 'get', {
      params
    })
  },
  getSubmission (id) {
    return ajax(bestUrl+'submission', 'get', {
      params: {
        id
      }
    })
  },
  submissionExists (problemID) {
    return ajax(bestUrl+'submission_exists', 'get', {
      params: {
        problem_id: problemID
      }
    })
  },
  submissionRejudge (id) {
    return ajax(bestUrl+'admin/submission/rejudge', 'get', {
      params: {
        id
      }
    })
  },
  updateSubmission (data) {
    return ajax(bestUrl+'submission', 'put', {
      data
    })
  },
  getUserRank (offset, limit, rule = 'acm') {
    let params = {
      offset,
      limit,
      rule
    }
    return ajax(bestUrl+'user_rank', 'get', {
      params
    })
  },
  getContestRank (params) {
    return ajax(bestUrl+'contest_rank', 'get', {
      params
    })
  },
  getACMACInfo (params) {
    return ajax(bestUrl+'admin/contest/acm_helper', 'get', {
      params
    })
  },
  updateACInfoCheckedStatus (data) {
    return ajax(bestUrl+'admin/contest/acm_helper', 'put', {
      data
    })
  }
}

/**
 * @param url
 * @param method get|post|put|delete...
 * @param params like queryString. if a url is index?a=1&b=2, params = {a: '1', b: '2'}
 * @param data post data, use for method put|post
 * @returns {Promise}
 */
function ajax (url, method, options) {
  if (options !== undefined) {
    var {params = {}, data = {}} = options
  } else {
    params = data = {}
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
      data
    }).then(res => {
      // API正常返回(status=20x), 是否错误通过有无error判断
      if (res.data.error !== null) {
        Vue.prototype.$error(res.data.data)
        reject(res)
        // 若后端返回为登录，则为session失效，应退出当前登录用户
        if (res.data.data.startsWith('Please login')) {
          store.dispatch('changeModalStatus', {'mode': 'login', 'visible': true})
        }
      } else {
        resolve(res)
        // if (method !== 'get') {
        //   Vue.prototype.$success('Succeeded')
        // }
      }
    }, res => {
      // API请求异常，一般为Server error 或 network error
      reject(res)
      console.log(res.data.data)
      Vue.prototype.$error(res.data.data)
    })
  })
}
