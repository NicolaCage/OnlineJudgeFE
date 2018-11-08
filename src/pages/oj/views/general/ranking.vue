<template>
  <div>
    <div class="title">
      <span class="title-text">排行榜</span> AC排行榜 <router-link :to="{name:'acm-rank'}">查看更多 >></router-link>
    </div>
    <div class="contnet">
        <el-row :gutter="0">
            <el-col :span="8"><div class="text content-val">名次</div></el-col>
            <el-col :span="8"><div class="text content-val">选手</div></el-col>
            <el-col :span="8"><div class="text content-val">AC</div></el-col>
        </el-row>
        <el-row :gutter="0" v-for="(announcement,index) in announcements" :key="announcement.id" :class="{active:index%2==0}" class="content-val">
            <el-col :span="8"><div class="text">{{index+1}}</div></el-col>
            <el-col :span="8"><div class="text" style="color:#298cf1;font-size:16px;" @click="goDetail(announcement.user.username)">{{announcement.user.username}}</div></el-col>
            <el-col :span="8"><div class="text" style="font-size:16px;cursor:pointer">{{announcement.accepted_number/announcement.submission_number|ac}}</div></el-col>
        </el-row>
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
        limit: 10,
        total: 10,
        btnLoading: false,
        announcements: [],
        announcement: '',
        listVisible: true,

      }
    },
    filters: {
        ac(val){
            val=val*100;
            return val.toFixed(2)+'%';
        }
    },
    beforeCreate() {
        api.getUserRank(0, 9, {rule:'ACM'}).then(res => {
           this.announcements=res.data.data.results
        }).catch(() => {
            alert('网络错误')
        })
    },
    methods:{
        goDetail(name){
            this.$router.push({
                name: 'user-home',
                query: {username: name}
            })
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
        background:#f8f8fa;
        box-shadow:0 2px 4px 0 rgba(0,0,0,0.20);
        border-radius:8px;
        width:100%;
        height:640px;
        margin-top: 20px;
        .text{
            font-family:'PingFangSC-Medium';
            color:#4a4a4a;
            text-align:center;
            height:64px;
            line-height: 64px;
            font-size: 18px;
            p{
                font-size:18px;
                color:#ffffff;
                text-align:center;
                background:#14bd68;
                border-radius:4px;
                width:78px;
                height:22px;
                line-height: 22px;
                margin: 0 auto;
            }
        }
        .statu{
            padding-top: 13px;
        }
        .active{
            background:#ffffff;
        }
        .content-val{
            font-size: 16px
        }
   }
</style>
