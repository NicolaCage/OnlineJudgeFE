<template>
  <div>
    <div class="title">
      <span class="title-text">新比赛</span> 最新赛事 <router-link :to="{name:'contest-list'}">查看更多 >></router-link>
    </div>
    <div class="contnet">
        <img src="/static/img/bg-4.png" alt="">
        <img src="/static/img/bg-3.png" alt="">
    </div>
  </div>
</template>

<script>
  import api from '@oj/api'
  import Pagination from '@oj/components/Pagination'

  export default {
    name: 'Announcement',
    components: {
      Pagination
    },
    data () {
      return {
   
      }
    }
     
  }
</script>

<style scoped lang="less">
   .title{
        font-family:'PingFangSC-Regular';
        height: 50px;
       .title-text{
            font-size:36px;
            display: inline-block;
            margin-right: 5px;
            color:#4a4a4a;
       }
        font-size:18px;        
        color:#9b9b9b;
        a{
            display: block;
            float: right;
            line-height: 50px;
        }
   }
   .contnet{
        width:100%;
        height:494px;
        padding-bottom: 0;
        img{
            margin-top: 24px;

            display: inline-block;
            box-shadow:0 2px 4px 0 rgba(0,0,0,0.20);
            border-radius:8px;
            width:100%;
            height:224px;
        }
   }
</style>
