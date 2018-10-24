<template>
  <div>
    <div class="title">
      <span class="title-text">最新答题动态</span> 点击代码和题目编号可查看详情哦～ <a>查看更多 >></a>
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
        <el-row :gutter="0" v-for="(announcement,index) in announcements" :key="announcement.code" :class="{active:index%2==0}" class="content-val">
            <el-col :span="5"><div class="text">{{announcement.creat_time}}</div></el-col>
            <el-col :span="4"><div class="text" style="color:#298cf1">{{announcement.code}}</div></el-col>
            <el-col :span="3">
                <div class="text statu">
                    <p v-if="announcement.statu==0">已接收</p> 
                    <p v-if="announcement.statu==1" style="background:#298cf1">部分接收</p> 
                    <p v-if="announcement.statu==3" style="background:#fb9b01">编译错误</p> 
                    <p v-if="announcement.statu==4" style="background:#eb4412">答题错误</p> 
                </div>
            </el-col>
            <el-col :span="3"><div class="text" style="color:#298cf1">{{announcement.num}}</div></el-col>
            <el-col :span="3"><div class="text">{{announcement.time}}</div></el-col>
            <el-col :span="2"><div class="text">{{announcement.memory}}</div></el-col>
            <el-col :span="2"><div class="text">{{announcement.language}}</div></el-col>
            <el-col :span="2"><div class="text">{{announcement.compile_name}}</div></el-col>
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
                creat_time:'2018-9-25 14:17:19',
                code:'e6e0350f11a6',
                statu:0,
                num:157,
                time:'12ms',
                memory:'1M',
                language:'C++',
                compile_name:'金逸涵'
            },
            {
                creat_time:'2018-9-25 14:17:19',
                code:'e6e0350f16a6',
                statu:1,
                num:157,
                time:'88ms',
                memory:'8M',
                language:'C++',
                compile_name:'Lucas'
            },
            {
                creat_time:'2018-9-25 14:17:19',
                code:'e6e0350a16a6',
                statu:3,
                num:157,
                time:'12ms',
                memory:'6M',
                language:'Python',
                compile_name:'张三'
            },
            {
                creat_time:'2018-9-25 14:17:19',
                code:'e6e0350f36a6',
                statu:4,
                num:157,
                time:'12ms',
                memory:'1M',
                language:'C++',
                compile_name:'李四'
            },
            {
                creat_time:'2018-9-25 14:17:19',
                code:'e6e0310f16a6',
                statu:0,
                num:157,
                time:'12ms',
                memory:'1M',
                language:'Python++',
                compile_name:'王五'
            }
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
