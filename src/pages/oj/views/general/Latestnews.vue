<template>
  <div>
    <div class="title">
      <span class="title-text">最新答题动态</span> 点击代码和题目编号可查看详情哦～ <router-link :to="{name:'submission-list'}">查看更多 >></router-link>
    </div>
    <div class="contnet">
        <el-row :gutter="0">
            <el-col :span="5"><div class="text content-val">时间</div></el-col>
            <el-col :span="4"><div class="text content-val">代码Code</div></el-col>
            <el-col :span="3"><div class="text content-val">状态</div></el-col>
            <el-col :span="3"><div class="text content-val">题目编号</div></el-col>
            <el-col :span="3"><div class="text content-val">运行时长</div></el-col>
            <el-col :span="2"><div class="text content-val">内存</div></el-col>
            <el-col :span="2"><div class="text content-val">语言</div></el-col>
            <el-col :span="2"><div class="text content-val">编译者</div></el-col>
        </el-row>
        <el-row :gutter="0" v-for="(announcement,index) in announcements" :key="announcement.id" :class="{active:index%2==0}" class="content-val">
            <el-col :span="5"><div class="text">{{announcement.create_time|capitalize}}</div></el-col>
            <el-col :span="4"><div class="text" style="color:#298cf1;overflow: hidden;padding: 0 10px;cursor:pointer;" @click="goProblem(announcement.problem)">{{announcement.id}}</div></el-col>
            <el-col :span="3">
                <div class="text statu">
                    <p :style="announcement.result|statu_color">{{announcement.result|statu_name}}</p> 
                </div>
            </el-col>
            <el-col :span="3"><div class="text" style="color:#298cf1;cursor:pointer;" @click="goProblem(announcement.problem)">{{announcement.problem}}</div></el-col>
            <el-col :span="3"><div class="text">{{announcement.statistic_info.time_cost}}ms</div></el-col>
            <el-col :span="2"><div class="text">{{announcement.statistic_info.memory_cost|memory_filter}}</div></el-col>
            <el-col :span="2"><div class="text">{{announcement.language}}</div></el-col>
            <el-col :span="2"><div class="text">{{announcement.username}}</div></el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
  import api from '@oj/api'
  import Pagination from '@oj/components/Pagination'
  import time from '@/utils/time'
  import { JUDGE_STATUS} from '@/utils/constants'
  import utils from '@/utils/utils'
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
    beforeCreate(){
        api.getSubmissionList(0, 5, {
            myself: false,
            result: '',
            username: ''
        },).then(res => {
           this.announcements=res.data.data.results
            
        }).catch(() => {
        alert('网络错误')
        })
    },
    methods:{
        goProblem(id){
            this.$router.push({name: 'problem-details', params: {'problemID': id}})
        }
    },
    filters: {
        capitalize:  (value)=> {
            return time.utcToLocal(value)
        },
        statu_name: (val)=>{
            return JUDGE_STATUS[val].name
        },
        statu_color:(colors)=>{
            return  'background:'+ JUDGE_STATUS[colors].color
        },
        memory_filter: (memory)=>{
            return utils.submissionMemoryFormat(memory)
        },
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
        height:288px;
        margin-top: 20px;
        .text{
            font-family:'PingFangSC-Medium';
            color:#4a4a4a;
            text-align:center;
            height:48px;
            line-height: 48px;
            font-size: 12px;
            p{
                font-size:12px;
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
