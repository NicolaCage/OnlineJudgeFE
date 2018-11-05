<template>
  <Row type="flex" justify="space-around" class="home-bg">
    <Col :span="22">
    <div>
    <div shadow   class="contest banner">
       <img src="/static/img/bg-1.png" alt="" srcset="">
    </div>
    <div class="user">
        <div class="user-img"></div>
          <img :src="'http://oj.ultrabear.com.cn/admin/'+user.avatar" alt="">
        </div>
        <p class="user-name">{{user.username}}</p>
        <div class="user-info">
          <div style="flex:1">答题数 <p>{{user.accepted_number}}</p></div>
          <div style="flex:1">提交次数 <p>{{user.submission_number}}</p></div>
          <div style="flex:1">分数 <p>{{user.total_score}}</p></div>
          <div style="flex:1">排名 <p>1</p></div>
        </div>
    </div>
    </div>
    <Latestnews class="announcement"></Latestnews>
    <div style="margin-top: 58px;position: relative;">
      <Latestproblem class="latestproblem"></Latestproblem>
      <Ranking class="ranking"></Ranking>
      <Newgame class="newgame"></Newgame>
      <Advert class="btn-img"></Advert>
    </div>
    </Col>
  </Row>
</template>

<script>
  import Announcements from './Announcements.vue'
  import Latestnews from './Latestnews.vue'
  import Latestproblem from './Latestproblem.vue'
  import Ranking from './ranking.vue'
  import Newgame from './newgame.vue'
  import Advert from './advert.vue'
  import api from '@oj/api'
  import time from '@/utils/time'
  import { CONTEST_STATUS } from '@/utils/constants'

  export default {
    name: 'home',
    components: {
      Announcements,
      Latestnews,
      Latestproblem,
      Ranking,
      Newgame,
      Advert
    },
    data () {
      return {
        contests: [],
        index: 0,
        user:{}
      }
    },
    beforeCreate() {
        api.getUserRank(0, 1, {rule:'ACM'}).then(res => {
           this.user=res.data.data.results[0]
           this.user.username=res.data.data.results[0].user.username
        }).catch(() => {
            alert('网络错误')
        })
    },
    mounted () {
      
      let params = {status: CONTEST_STATUS.NOT_START}
      api.getContestList(0, 8).then(res => {
        this.contests = res.data.data.results
      })
    },
    methods: {
      getDuration (startTime, endTime) {
        return time.duration(startTime, endTime)
      },
      goContest () {
        this.$router.push({
          name: 'contest-details',
          params: {contestID: this.contests[this.index].id}
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-bg{
    // background-size: 100% 100%;
    // width: 100%;
    // background: url('/static/img/Bg-0.png') no-repeat center -80px;
  }
  .banner{
    background:#ebebeb;
    box-shadow:0 2px 4px 0 rgba(0,0,0,0.20);
    border-radius:8px;
    width:63.33%;
    overflow: hidden;
    height:360px;
    display: inline-block;
    img{
      width: 100%;
      height: 100%;
      display: block;
      margin-top: 0;
    }
  }
  .user{
    width: 30.75%;
    display: inline-block;
    background:#ffffff;
    box-shadow:0 2px 4px 0 rgba(0,0,0,0.20);
    border-radius:8px;
    height:360px;
    position: relative;
    float: right;
    text-align: center;
    color:#4a4a4a;
    padding-top: 50px;
    .user-img{
      
      width:120px;
      height:120px;
      display: block;
      margin: 0 auto;
      overflow: hidden;
      background:#d8d8d8;
      border-radius:100%;
    }
    img{
      width: 100%;
      height: 100%;
    }
    .user-name{
      margin-top: 18px;
      font-family:'PingFangSC-Medium';
      font-size:32px;
    }
    .user-info{
      display: flex;
      margin-top: 33px;
      font-family:'PingFangSC-Regular';
      font-size:12px;
      p{
        font-size:18px;
      }
    }
  }
  .latestproblem{
    width:63.33%;
    display: inline-block;
  }
  .newgame{
    margin-top: 58px;
    width:63.33%;
    display: inline-block;
  }
  .ranking{
    width: 30.75%;
    display: inline-block;
    float: right;
  }
  .btn-img{
    width: 30.75%;
    display: inline-block;
    position: absolute;
    right: 0;
    overflow: hidden;
    box-shadow:0 2px 4px 0 rgba(0,0,0,0.20);
    border-radius:8px;
    height:224px;
    bottom: 5px;
  }
  .announcement {
  
    border: 0;
    outline: none;
    margin-top: 58px;
  }
</style>
