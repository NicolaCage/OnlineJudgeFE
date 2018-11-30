// import ProblemList from ' @oj/views/problem/ProblemList.vue'
// import Logout from '@oj/views/user/Logout.vue'
// import UserHome from '@oj/views/user/UserHome.vue'
// import About from '@oj/views/help/About.vue'
// import FAQ from '@oj/views/help/FAQ.vue'
// import NotFound from '@oj/views/general/404.vue'
// import Home from '@oj/views/general/Home.vue'
// import Announcements from '@oj/views/general/Announcements.vue'
const ProblemList = () => import(/* webpackChunkName: "problem" */ '@oj/views/problem/ProblemList.vue')
const Logout = () => import(/* webpackChunkName: "Logout" */ '@oj/views/user/Logout.vue')
const UserHome = () => import(/* webpackChunkName: "user" */ '@oj/views/user/UserHome.vue')
const About = () => import(/* webpackChunkName: "help" */ '@oj/views/help/About.vue')
const FAQ = () => import(/* webpackChunkName: "help" */ '@oj/views/help/FAQ.vue')
const NotFound = () => import(/* webpackChunkName: "general" */ '@oj/views/general/404.vue')
const Home = () => import(/* webpackChunkName: "general" */ '@oj/views/general/Home.vue')
const Announcements = () => import(/* webpackChunkName: "general" */ '@oj/views/general/Announcements.vue')
// Grouping Components in the Same Chunk
const SubmissionList = () => import(/* webpackChunkName: "submission" */ '@oj/views/submission/SubmissionList.vue')
const SubmissionDetails = () => import(/* webpackChunkName: "submission" */ '@oj/views/submission/SubmissionDetails.vue')

const ACMRank = () => import(/* webpackChunkName: "rank" */ '@oj/views/rank/ACMRank.vue')
const OIRank = () => import(/* webpackChunkName: "rank" */ '@oj/views/rank/OIRank.vue')

const ApplyResetPassword = () => import(/* webpackChunkName: "password" */ '@oj/views/user/ApplyResetPassword.vue')
const ResetPassword = () => import(/* webpackChunkName: "password" */ '@oj/views/user/ResetPassword.vue')

const Problem = () => import(/* webpackChunkName: "Problem" */ '@oj/views/problem/Problem.vue')

export {
  Home, NotFound, Announcements,
  Logout, UserHome, About, FAQ,
  ProblemList, Problem,
  ACMRank, OIRank,
  SubmissionList, SubmissionDetails,
  ApplyResetPassword, ResetPassword
}
/* 组件导出分为两类, 一类常用的直接导出，另一类诸如Login, Logout等用懒加载,懒加载不在此处导出
 *   在对应的route内加载
 *   见https://router.vuejs.org/en/advanced/lazy-loading.html
 */
