<template>
  <div>
    <p class="title">{{title}}</p>
    <div class="content-tags"><Tag type="dot" :color="status.color" class="tags">{{status.name}}</Tag></div>
    <div class="content-choice">
      <template v-for="(item,index) in question">
          <p :key="item.id">{{index+1}}. {{item.desc}}</p>
          <RadioGroup v-model="choice[index].answer" :key="index" >
              <Radio :label="obj.order_in_list"  :key="obj.id" v-for="obj in item.choice" class="choice">
                <span v-if="obj.order_in_list==1">A.</span>
                <span v-if="obj.order_in_list==2">B.</span>
                <span v-if="obj.order_in_list==3">C.</span>
                <span v-if="obj.order_in_list==4">D.</span>
                {{obj.desc}}
              </Radio>
          </RadioGroup>
      </template><br/>
    </div>
    <Button @click="submit" class="btn" :disabled="!isstatus" :class="{active:isstatus}">提交试题</Button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import api from '@oj/api'
  import { CONTEST_STATUS_REVERSE, CONTEST_STATUS } from '@/utils/constants'
  export default {
    data () {
        return {
            question: [0],
            choice:[],
            title:'',
            animal: '',
            id:'',
            status:{},
            isstatus:false
        }
    },
    mounted () {
      api.getWrite(parseInt(this.$route.params.WriteID)).then((res) => {
         this.question=res.data.data.question_list,
         this.title=res.data.data.title,
         this.id=res.data.data.id,
         this.status=CONTEST_STATUS_REVERSE[res.data.data.status],
         this.isstatus=(res.data.data.status==0),
         this.question.forEach((value,index,array)=>{
            this.choice.push({'question':value.id,'answer':0})
         })
      })
    },
    methods:{
      submit(){
        console.log(this.choice)
        for(var i=0;i<this.choice.length;i++){
              if(this.choice[i].answer==0){
                if(confirm('您还有第'+(i+1)+'题没做,你确定提交吗？')){
                  break;
                }else{
                  return;
                }
              }
            }
        let data={
          'subject':this.id,
          'answer_list':this.choice
        }
        api.answer(data).then(res => {
            this.$router.push({name: 'result', params: {AnswerID: res.data.data.id}})
        })
      }
    },
    name: 'write-details',
    components: {

    },
    computed: {

    }
  }
</script>
<style lang="less" scoped>
.title{
  font-size: 28px;
  height: 35px;
  line-height: 35px;
  text-align: center;
}
.choice{
  display: block;
  font-size: 16px;
  height: 35px;
  line-height: 35px
}
.content-choice{
  font-size: 18px;
  width: 92%;
  margin: 20px auto;
}
.btn{
  display: block;
  font-size: 16px;
  width: 120px;
  height: 35px;
  line-height: 22px;
  margin: 50px auto 0;
  border: 0;
  background: #dcdfe6;
  color: #ffffff;
}
.active{
  background: #f99156 !important;
  color: #ffffff !important;
}
.content-tags{
  height: 45px;
  line-height: 45px;
  width: 100%;
  margin-top: 20px;
  .tags{
    margin-right: 0;
    float: right;
  }
}
</style>
