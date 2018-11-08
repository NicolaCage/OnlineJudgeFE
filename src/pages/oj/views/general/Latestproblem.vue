<template>
  <div>
    <div class="title">
      <span class="title-text">最新习题</span> 来试下你的身手吧～ <router-link :to="{name:'problem-list'}"> 查看更多 >></router-link>
    </div>
    <div class="contnet">
        <el-row :gutter="0">
            <el-col :span="5"><div class="text content-val">习题编号</div></el-col>
            <el-col :span="6"><div class="text content-val">题目名称</div></el-col>
            <el-col :span="5"><div class="text content-val">级别</div></el-col>
            <el-col :span="4"><div class="text content-val">提交次数</div></el-col>
            <el-col :span="4"><div class="text content-val">AC比例</div></el-col>
        </el-row>
        <el-row :gutter="0" v-for="(announcement,index) in announcements" :key="announcement._id" :class="{active:index%2==0}" class="content-val">
            <el-col :span="5"><div class="text">{{announcement._id}}</div></el-col>
            <el-col :span="6"><div class="text" style="color:#298cf1;cursor:pointer;" @click="goProblem(announcement._id)">{{announcement.title}}</div></el-col>
            <el-col :span="5">
                <div class="text statu">
                    <p v-if="announcement.difficulty=='Low'">低阶</p> 
                    <p v-if="announcement.difficulty=='Mid'" style="background:#3684ec">中阶</p> 
                    <p v-if="announcement.difficulty=='High'" style="background:#7f50ff">高阶</p>  
                </div>
            </el-col>
            <el-col :span="4"><div class="text" style="color:#298cf1">{{announcement.submission_number}}</div></el-col>
            <el-col :span="4"><div class="text">{{announcement.accepted_number/announcement.submission_number|ac}}</div></el-col>
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
    methods:{
        goProblem(id){
            this.$router.push({name: 'problem-details', params: {problemID: id}})
        }
    },
    filters: {
        ac(val){
            val=val*100;
            return val.toFixed(2)+'%';
        }
    },
    beforeCreate() {
        api.getProblemList(0, 5, {page:1,last:true}).then(res => {
           this.announcements=res.data.data.results
        }).catch(() => {
            alert('网络错误')
        })
    },
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
                background:#00c7fa;
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
