<template>
  <div>
    <div class="title">
      <span class="title-text">最新习题</span> 来试下你的身手吧～ <a>查看更多 >></a>
    </div>
    <div class="contnet">
        <el-row :gutter="0">
            <el-col :span="5"><div class="text content-val">习题编号</div></el-col>
            <el-col :span="6"><div class="text content-val">题目名称</div></el-col>
            <el-col :span="5"><div class="text content-val">级别</div></el-col>
            <el-col :span="4"><div class="text content-val">分值</div></el-col>
            <el-col :span="4"><div class="text content-val">AC比例</div></el-col>
        </el-row>
        <el-row :gutter="0" v-for="(announcement,index) in announcements" :key="announcement.problem_num" :class="{active:index%2==0}" class="content-val">
            <el-col :span="5"><div class="text">{{announcement.problem_num}}</div></el-col>
            <el-col :span="6"><div class="text" style="color:#298cf1">{{announcement.problem_name}}</div></el-col>
            <el-col :span="5">
                <div class="text statu">
                    <p v-if="announcement.statu==0">低阶</p> 
                    <p v-if="announcement.statu==1" style="background:#14bd68">中阶</p> 
                    <p v-if="announcement.statu==2" style="background:#298cf1">高阶</p>  
                </div>
            </el-col>
            <el-col :span="4"><div class="text" style="color:#298cf1">{{announcement.score}}</div></el-col>
            <el-col :span="4"><div class="text">{{announcement.ac}}</div></el-col>
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
                problem_num:'201',
                problem_name:'Jam的计数法',
                statu:1,
                num:157,
                score:124,
                ac:'36.5%',
            },
            {
                problem_num:'21',
                problem_name:'数字游戏',
                statu:0,
                num:157,
                score:124,
                ac:'48.5%',
            },
            {
                problem_num:'233',
                problem_name:'计算分数的浮点数值',
                statu:2,
                num:157,
                score:124,
                ac:'36.5%',
            },
            {
                problem_num:'321',
                problem_name:'奥小白摘苹果',
                statu:1,
                num:157,
                score:124,
                ac:'36.5%',
            },
           {
                problem_num:'121',
                problem_name:'小白的数字迷宫',
                statu:0,
                num:157,
                score:124,
                ac:'36.5%',
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
                background:#fb9b01;
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
