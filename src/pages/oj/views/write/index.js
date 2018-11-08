const WriteList = () => import(/* webpackChunkName: "contest" */ './WriteList.vue')
const WriteDetails = () => import(/* webpackChunkName: "contest" */ './WriteDetails.vue')
// const ContestProblemList = () => import(/* webpackChunkName: "contest" */ './children/ContestProblemList.vue')
const Result = () => import(/* webpackChunkName: "contest" */ './Result.vue')
// const ACMContestHelper = () => import(/* webpackChunkName: "contest" */ './children/ACMHelper.vue')

export { WriteList,WriteDetails,Result}
