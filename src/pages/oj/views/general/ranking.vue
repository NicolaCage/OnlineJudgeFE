<template>
  <div>
    <div class="title">
      <span class="title-text">排行榜</span> AC排行榜 <a>查看更多 >></a>
    </div>
    <div class="contnet">
        <el-row :gutter="0">
            <el-col :span="8"><div class="text content-val">名次</div></el-col>
            <el-col :span="8"><div class="text content-val">选手</div></el-col>
            <el-col :span="8"><div class="text content-val">AC</div></el-col>
        </el-row>
        <el-row :gutter="0" v-for="(announcement,index) in announcements" :key="announcement.code" :class="{active:index%2==0}" class="content-val">
            <el-col :span="8"><div class="text">{{announcement.num}}</div></el-col>
            <el-col :span="8"><div class="text" style="color:#298cf1">{{announcement.name}}</div></el-col>
            <el-col :span="8"><div class="text">{{announcement.ac}}</div></el-col>
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
        announcements: [
            {
                num:1,
                name:'于易阳',
                ac:186
            },
           {
                num:2,
                name:'绍钧涵',
                ac:126
            },
            {
                num:3,
                name:'张锦麟',
                ac:96
            },
            {
                num:4,
                name:'Lucas',
                ac:86
            },
            {
                num:5,
                name:'金逸涵',
                ac:76
            },
            {
                num:6,
                name:'绍钧涵',
                ac:126
            },
            {
                num:7,
                name:'张锦麟',
                ac:96
            },
            {
                num:8,
                name:'Lucas',
                ac:26
            },
            {
                num:9,
                name:'金逸涵',
                ac:6
            },
        ],
        announcement: '',
        listVisible: true,

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
