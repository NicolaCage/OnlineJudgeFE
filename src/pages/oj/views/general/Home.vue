<template>
  <Row type="flex" justify="space-around">
    <Col :span="22">
    <div>
    <div shadow v-if="contests.length" class="contest banner">
       <img src="/static/img/bg-5.png" alt="" srcset="">
    </div>
    <div class="user">
        <div class="user-img">
          <img src="/static/img/bg-5.png" alt="">
        </div>
        <p class="user-name">于易阳</p>
        <div class="user-info">
          <div style="flex:1">答题数 <p>79</p></div>
          <div style="flex:1">提交次数 <p>292</p></div>
          <div style="flex:1">分数 <p>6703</p></div>
          <div style="flex:1">排名 <p>1</p></div>
        </div>
    </div>
    </div>
    <Latestnews class="announcement"></Latestnews>
    ;
    <div style="margin-top: 58px">
      <Latestproblem class="latestproblem"></Latestproblem>
      <Ranking class="ranking"></Ranking>
      <Newgame class="newgame"></Newgame>
      <img src="/static/img/bg-5.png" alt="" class="btn-img">
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
      Newgame
    },
    data () {
      return {
        contests: [],
        index: 0
      }
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
    margin-top: 0;
  }
  .btn-img{
    width: 30.75%;
    display: inline-block;
    float: right;
    box-shadow:0 2px 4px 0 rgba(0,0,0,0.20);
    border-radius:8px;
    height:224px;
    margin-top: -365px;
  }
  .announcement {
  
    border: 0;
    outline: none;
    margin-top: 58px;
  }
</style>
