<template>
    <div class="container">
        <div class="avatar-container">
        <img class="avatar" :src="data.user.avatar"/>
        </div>
        <Card :padding="100">
        <div v-if="data.user">
            <p style="margin-top: -10px">
            <span v-if="data.user" class="emphasis username">{{data.user.user.username}}</span>
            </p>
            <hr id="split"/>

            <div class="flex-container">
            <div class="left">
                <p>试卷名</p>
                <p class="emphasis">{{data.subject.title}}</p>
            </div>
            <div class="middle">
                <p>总分数</p>
                <p class="emphasis">{{data.subject.score}}</p>
            </div>
            <div class="right">
                <p>得分</p>
                <p class="emphasis">{{data.value}}</p>
            </div>
            </div>
            <div id="problems">
            <div><span>答题时间:</span> {{data.update_time | capitalize}}</div>
            <Button @click="btn">重新答题</Button>
            </div>
        </div>
        </Card>
    </div>
</template>
<script>
 import time from '@/utils/time'
 import api from '@oj/api'
export default {
     data () {
        return {
        "data": {}
        }
    },
    beforeCreate () {
        console.log(this.$route.params.AnswerID)
        api.getanswer({'id':this.$route.params.AnswerID}).then(res => {
            this.data=res.data.data
        })
    },
    methods:{
        btn(){
            this.$router.push({name: 'write-list'})
        }
    },
    filters: {
        capitalize:  (value)=> {
            return time.utcToLocal(value)
        },
    }
}
</script>
<style lang="less" scoped>
  .container {
    position: relative;
    width: 75%;
    margin: 100px auto;
    text-align: center;
    .answer{
        font-size: 18px;
        font-weight: 600;
        font-family: 'Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif';
    }
    p {
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .avatar-container {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      z-index: 1;
      top: -90px;
      .avatar {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        box-shadow: 0 1px 1px 0;
      }
    }
    .emphasis {
      font-size: 20px;
      font-weight: 600;
    }
    .username{
        font-size: 28px;
    }
    #split {
      margin: 20px auto;
      width: 90%;
    }
    .flex-container {
      margin-top: 30px;
      padding: auto 20px;
      .left {
        flex: 2 1;
        p{
            font-size: 18px;
        }
      }
      .middle {
        flex: 1 1;
        border-left: 1px solid #999;
        border-right: 1px solid #999;
        p{
            font-size: 18px;
        }
      }
      .right {
        flex: 1 1;
        p{
            font-size: 18px;
        }
      }
    }
    #problems {
      box-sizing:border-box;
      margin-top: 30px;
      padding-left: 30px;
      padding-right: 30px;
      font-size: 18px;
      div{
          margin-bottom: 30px;
      }
      button{
          width: 120px;
          height: 35px;
          font-size: 18px;
          line-height: 20px;
          background: #f99156;
          color: #ffffff;
          border: 0;
      }
      .btns {
        margin-top: 15px;
        .problem-btn {
          display: inline-block;
          margin: 5px;
        }
      }
    }
    #icons {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-50%);
      .icon {
        padding-left: 20px;
      }
    }
  }
</style>


