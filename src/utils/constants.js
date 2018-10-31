export const JUDGE_STATUS = {
  '-2': {
    name: '编译错误',
    short: 'CE',
    color: '#f90',
    type: 'warning'
  },
  '-1': {
    name: '错误答案',
    short: 'WA',
    color: 'red',
    type: 'error'
  },
  '0': {
    name: '通过',
    short: 'AC',
    color: '#14bd68',
    type: 'success'
  },
  '1': {
    name: '超出时间限制',
    short: 'TLE',
    color: 'red',
    type: 'error'
  },
  '2': {
    name: '超出时间限制',
    short: 'TLE',
    color: 'red',
    type: 'error'
  },
  '3': {
    name: '超出内存限制',
    short: 'MLE',
    color: 'red',
    type: 'error'
  },
  '4': {
    name: '运行时错误',
    short: 'RE',
    color: 'red',
    type: 'error'
  },
  '5': {
    name: '系统错误',
    short: 'SE',
    color: 'red',
    type: 'error'
  },
  '6': {
    name: '等待评测',
    color: 'yellow',
    type: 'warning'
  },
  '7': {
    name: '正在评测',
    color: 'blue',
    type: 'info'
  },
  '8': {
    name: '部分正确',
    short: 'PAC',
    color: '#298cf1',
    type: 'info'
  },
  '9': {
    name: '提交中',
    color: 'yellow',
    type: 'warning'
  }
}

export const CONTEST_STATUS = {
  'NOT_START': '1',
  'UNDERWAY': '0',
  'ENDED': '-1'
}

export const CONTEST_STATUS_REVERSE = {
  '1': {
    name: 'Not Started',
    color: 'yellow'
  },
  '0': {
    name: 'Underway',
    color: 'green'
  },
  '-1': {
    name: 'Ended',
    color: 'red'
  }
}

export const RULE_TYPE = {
  ACM: 'ACM',
  OI: 'OI'
}

export const CONTEST_TYPE = {
  PUBLIC: 'Public',
  PRIVATE: 'Password Protected'
}

export const USER_TYPE = {
  REGULAR_USER: 'Regular User',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super Admin'
}

export const PROBLEM_PERMISSION = {
  NONE: 'None',
  OWN: 'Own',
  ALL: 'All'
}

export const STORAGE_KEY = {
  AUTHED: 'authed',
  PROBLEM_CODE: 'problemCode',
  languages: 'languages'
}

export function buildProblemCodeKey (problemID, contestID = null) {
  if (contestID) {
    return `${STORAGE_KEY.PROBLEM_CODE}_${contestID}_${problemID}`
  }
  return `${STORAGE_KEY.PROBLEM_CODE}_NaN_${problemID}`
}

export const GOOGLE_ANALYTICS_ID = 'UA-111499601-1'
