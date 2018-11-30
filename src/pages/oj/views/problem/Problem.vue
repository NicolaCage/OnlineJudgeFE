<template>
   <div>fdsafdsfdsafda</div>
</template>

<script>
  // import {mapGetters, mapActions} from 'vuex'
  // import {types} from '../../../../store'
  // // import CodeMirror from '@oj/components/CodeMirror.vue'
  // import storage from '@/utils/storage'
  // import {FormMixin} from '@oj/components/mixins'
  // import {JUDGE_STATUS, CONTEST_STATUS, buildProblemCodeKey} from '@/utils/constants'
  // import api from '@oj/api'
  // import {pie, largePie} from './chartData'

  // // 只显示这些状态的图形占用
  // const filtedStatus = ['-1', '-2', '0', '1', '2', '3', '4', '8']

  // export default {
  //   name: 'Problem',
  //   components: {
  //     // CodeMirror
  //   },
  //   mixins: [FormMixin],
  //   data () {
  //     return {
  //       statusVisible: false,
  //       captchaRequired: false,
  //       graphVisible: false,
  //       submissionExists: false,
  //       captchaCode: '',
  //       captchaSrc: '',
  //       contestID: '',
  //       problemID: '',
  //       submitting: false,
  //       code: '',
  //       language: 'C++',
  //       theme: 'solarized',
  //       submissionId: '',
  //       submitted: false,
  //       result: {
  //         result: 9
  //       },
  //       problem: {
  //         title: '',
  //         description: '',
  //         hint: '',
  //         my_status: '',
  //         template: {},
  //         languages: [],
  //         created_by: {
  //           username: ''
  //         },
  //         tags: []
  //       },
  //       pie: pie,
  //       largePie: largePie,
  //       // echarts 无法获取隐藏dom的大小，需手动指定
  //       largePieInitOpts: {
  //         width: '500',
  //         height: '480'
  //       }
  //     }
  //   },
  //   beforeRouteEnter (to, from, next) {
  //     let problemCode = storage.get(buildProblemCodeKey(to.params.problemID, to.params.contestID))
  //     if (problemCode) {
  //       next(vm => {
  //         vm.language = problemCode.language
  //         vm.code = problemCode.code
  //         vm.theme = problemCode.theme
  //       })
  //     } else {
  //       next()
  //     }
  //   },
  //   mounted () {
  //     this.$store.commit(types.CHANGE_CONTEST_ITEM_VISIBLE, {menu: false})
  //     this.init()
  //   },
  //   methods: {
  //     ...mapActions(['changeDomTitle']),
  //     init () {
  //       this.$Loading.start()
  //       this.contestID = this.$route.params.contestID
  //       this.problemID = this.$route.params.problemID
  //       let func = this.$route.name === 'problem-details' ? 'getProblem' : 'getContestProblem'
  //       api[func](this.problemID, this.contestID).then(res => {
  //         this.$Loading.finish()
  //         let problem = res.data.data
  //         this.changeDomTitle({title: problem.title})
  //         api.submissionExists(problem.id).then(res => {
  //           this.submissionExists = res.data.data
  //         })
  //         problem.languages = problem.languages.sort()
  //         this.problem = problem
  //         this.changePie(problem)

  //         // 在beforeRouteEnter中修改了, 说明本地有code，无需加载template
  //         if (this.code !== '') {
  //           return
  //         }
  //         // try to load problem template
  //         this.language = 'C++'
  //         let template = this.problem.template
  //         if (template && template[this.language]) {
  //           this.code = template[this.language]
  //         }
  //       }, () => {
  //         this.$Loading.error()
  //       })
  //     },
  //     changePie (problemData) {
  //       // 只显示特定的一些状态
  //       for (let k in problemData.statistic_info) {
  //         if (filtedStatus.indexOf(k) === -1) {
  //           delete problemData.statistic_info[k]
  //         }
  //       }
  //       let acNum = problemData.accepted_number
  //       let data = [
  //         {name: 'WA', value: problemData.submission_number - acNum},
  //         {name: 'AC', value: acNum}
  //       ]
  //       this.pie.series[0].data = data
  //       // 只把大图的AC selected下，这里需要做一下deepcopy
  //       let data2 = JSON.parse(JSON.stringify(data))
  //       data2[1].selected = true
  //       this.largePie.series[1].data = data2

  //       // 根据结果设置legend,没有提交过的legend不显示
  //       let legend = Object.keys(problemData.statistic_info).map(ele => JUDGE_STATUS[ele].short)
  //       if (legend.length === 0) {
  //         legend.push('AC', 'WA')
  //       }
  //       this.largePie.legend.data = legend

  //       // 把ac的数据提取出来放在最后
  //       let acCount = problemData.statistic_info['0']
  //       delete problemData.statistic_info['0']

  //       let largePieData = []
  //       Object.keys(problemData.statistic_info).forEach(ele => {
  //         largePieData.push({name: JUDGE_STATUS[ele].short, value: problemData.statistic_info[ele]})
  //       })
  //       largePieData.push({name: 'AC', value: acCount})
  //       this.largePie.series[0].data = largePieData
  //     },
  //     handleRoute (route) {
  //       this.$router.push(route)
  //     },
  //     onChangeLang (newLang) {
  //       if (this.problem.template[newLang]) {
  //         if (this.code.trim() === '') {
  //           this.code = this.problem.template[newLang]
  //         }
  //       }
  //       this.language = newLang
  //     },
  //     onChangeTheme (newTheme) {
  //       this.theme = newTheme
  //     },
  //     onResetToTemplate () {
  //       this.$Modal.confirm({
  //         content: 'Are you sure you want to reset your code?',
  //         onOk: () => {
  //           let template = this.problem.template
  //           if (template && template[this.language]) {
  //             this.code = template[this.language]
  //           }
  //         }
  //       })
  //     },
  //     checkSubmissionStatus () {
  //       // 使用setTimeout避免一些问题
  //       if (this.refreshStatus) {
  //         // 如果之前的提交状态检查还没有停止,则停止,否则将会失去timeout的引用造成无限请求
  //         clearTimeout(this.refreshStatus)
  //       }
  //       const checkStatus = () => {
  //         let id = this.submissionId
  //         api.getSubmission(id).then(res => {
  //           this.result = res.data.data
  //           if (Object.keys(res.data.data.statistic_info).length !== 0) {
  //             this.submitting = false
  //             this.submitted = false
  //             clearTimeout(this.refreshStatus)
  //             this.init()
  //           } else {
  //             this.refreshStatus = setTimeout(checkStatus, 2000)
  //           }
  //         }, res => {
  //           this.submitting = false
  //           clearTimeout(this.refreshStatus)
  //         })
  //       }
  //       this.refreshStatus = setTimeout(checkStatus, 2000)
  //     },
  //     submitCode () {
  //       if (this.code.trim() === '') {
  //         this.$error('Code can not be empty')
  //         return
  //       }
  //       this.submissionId = ''
  //       this.result = {result: 9}
  //       this.submitting = true
  //       let data = {
  //         problem_id: this.problem.id,
  //         language: this.language,
  //         code: this.code,
  //         contest_id: this.contestID
  //       }
  //       if (this.captchaRequired) {
  //         data.captcha = this.captchaCode
  //       }
  //       const submitFunc = (data, detailsVisible) => {
  //         this.statusVisible = true
  //         api.submitCode(data).then(res => {
  //           this.submissionId = res.data.data && res.data.data.submission_id
  //           // 定时检查状态
  //           this.submitting = false
  //           this.submissionExists = true
  //           if (!detailsVisible) {
  //             this.$Modal.success({
  //               title: 'Success',
  //               content: 'Submit code successfully'
  //             })
  //             return
  //           }
  //           this.submitted = true
  //           this.checkSubmissionStatus()
  //         }, res => {
  //           this.getCaptchaSrc()
  //           if (res.data.data.startsWith('Captcha is required')) {
  //             this.captchaRequired = true
  //           }
  //           this.submitting = false
  //           this.statusVisible = false
  //         })
  //       }

  //       if (this.contestRuleType === 'OI' && !this.OIContestRealTimePermission) {
  //         if (this.submissionExists) {
  //           this.$Modal.confirm({
  //             title: '',
  //             content: '<h3>You have submission in this problem, sure to cover it?<h3>',
  //             onOk: () => {
  //               // 暂时解决对话框与后面提示对话框冲突的问题(否则一闪而过）
  //               setTimeout(() => {
  //                 submitFunc(data, false)
  //               }, 1000)
  //             },
  //             onCancel: () => {
  //               this.submitting = false
  //             }
  //           })
  //         } else {
  //           submitFunc(data, false)
  //         }
  //       } else {
  //         submitFunc(data, true)
  //       }
  //     },
  //     onCopy (event) {
  //       this.$success('Code copied')
  //     },
  //     onCopyError (e) {
  //       this.$error('Failed to copy code')
  //     }
  //   },
  //   computed: {
  //     ...mapGetters(['problemSubmitDisabled', 'contestRuleType', 'OIContestRealTimePermission', 'contestStatus']),
  //     contest () {
  //       return this.$store.state.contest.contest
  //     },
  //     contestEnded () {
  //       return this.contestStatus === CONTEST_STATUS.ENDED
  //     },
  //     submissionStatus () {
  //       return {
  //         text: JUDGE_STATUS[this.result.result]['name'],
  //         color: JUDGE_STATUS[this.result.result]['color']
  //       }
  //     },
  //     submissionRoute () {
  //       if (this.contestID) {
  //         return {name: 'contest-submission-list', query: {problemID: this.problemID}}
  //       } else {
  //         return {name: 'submission-list', query: {problemID: this.problemID}}
  //       }
  //     }
  //   },
  //   beforeRouteLeave (to, from, next) {
  //     // 防止切换组件后仍然不断请求
  //     clearInterval(this.refreshStatus)

  //     this.$store.commit(types.CHANGE_CONTEST_ITEM_VISIBLE, {menu: true})
  //     storage.set(buildProblemCodeKey(this.problem._id, from.params.contestID), {
  //       code: this.code,
  //       language: this.language,
  //       theme: this.theme
  //     })
  //     next()
  //   },
  //   watch: {
  //     '$route' () {
  //       this.init()
  //     }
  //   }
  // }
</script>

<style lang="less" scoped>
  .card-title {
    margin-left: 8px;
  }

  .flex-container {
    #problem-main {
      flex: auto;
      margin-right: 18px;
    }
    #right-column {
      flex: none;
      width: 220px;
    }
  }

  #problem-content {
    margin-top: -50px;
    .title {
      font-size: 20px;
      font-weight: 400;
      margin: 25px 0 8px 0;
      color: #3091f2;
      .copy {
        padding-left: 8px;
      }
    }
    p.content {
      margin-left: 25px;
      margin-right: 20px;
      font-size: 15px
    }
    .sample {
      align-items: stretch;
      &-input, &-output {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        margin-right: 5%;
      }
      pre {
        flex: 1 1 auto;
        align-self: stretch;
        border-style: solid;
        background: transparent;
      }
    }
  }

  #submit-code {
    margin-top: 20px;
    margin-bottom: 20px;
    .status {
      float: left;
      span {
        margin-right: 10px;
        margin-left: 10px;
      }
    }
    .captcha-container {
      display: inline-block;
      .captcha-code {
        width: auto;
        margin-top: -20px;
        margin-left: 20px;
      }
    }
  }

  #info {
    margin-bottom: 20px;
    margin-top: 20px;
    ul {
      list-style-type: none;
      li {
        border-bottom: 1px dotted #e9eaec;
        margin-bottom: 10px;
        p {
          display: inline-block;
        }
        p:first-child {
          width: 90px;
        }
        p:last-child {
          float: right;
        }
      }
    }
  }

  .fl-right {
    float: right;
  }

  #pieChart {
    .echarts {
      height: 250px;
      width: 210px;
    }
    #detail {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }

  #pieChart-detail {
    margin-top: 20px;
    width: 500px;
    height: 480px;
  }
</style>

