<template>
    <div class="test" v-loading="loading">
        <p class="test-title">编辑题目</p>
        <div class="title-text desc"><span>题目描述 : &nbsp;&nbsp;</span><el-input v-model="desc" type="textarea" :rows="2" placeholder="请输入题目描述" class="title"></el-input></div> 
        <div class="title-text"><span>题目分值 : &nbsp;&nbsp;</span><el-input v-model="score" type='text' placeholder="请输入题目分值" class="title"></el-input></div> 
        <div class="title-text"><span>题目答案 : &nbsp;&nbsp;</span><el-input v-model="answer" type='text' placeholder="请输入题目答案" class="title"></el-input></div> 
        <div class="title-text">
            <span>题目选项: </span> <div class="add">  </div>
        </div> 
        <div class="title-text" v-for="(item,index) in choice_list" :key="index"><el-input v-model="item.desc" type='text' placeholder="请输入选项描述" class="title choice"></el-input> </div> 

        <el-button @click="submit" class="btn">确认保存</el-button>
    </div>
</template>
<script>
import api from '../../api.js'
export default {
    data () {
        return{
            score:'',
            desc:'',
            answer:'',
            choice_list:[{
                desc:"",
                order_in_list:""
            }],
            id:'',
            loading:false
        }
    },
    mounted(){
        this.loading=true
        api.getNumDetail(this.$route.params.problemId).then(res =>{
            this.loading=false
            this.score=res.data.data.value
            this.desc=res.data.data.desc
            this.id=res.data.data.id
            this.answer=res.data.data.answer
            this.choice_list=res.data.data.choice_list
        }).catch(() => {
            this.loading=false
        })
    },
    methods:{
        submit(){
            this.loading=true
            this.choice_list.forEach((val,i)=>{
                this.choice_list[i].order_in_list=i+1
            })
            let data={
                id:this.id,
                score:this.score,
                desc:this.desc,
                answer:this.answer,
                choice_list:this.choice_list
            }
            api.editNum(data).then(res => {
                this.loading=false
                this.$router.push({name: 'num-list'})
            }).catch(() => {
                this.loading=false
            })
        }
    }
}
</script>
<style lang="less" scoped>
.test{
    text-align: center;
    background: #fff;
    padding: 1% 0 15%;
    color: #495060;
    .title-text{
        font-size: 16px;
        margin-bottom: 30px;
        .title{
            width: 30%;
            height: 35px;
            line-height: 35px;
            font-size: 16px;
            padding:0 1%;
            outline: none;
            border-radius: 4px;
            background-color: #fff;

        }
    }
    .desc{
        margin-bottom: 50px;
    }
    .test-title{
        font-size: 24px;
        margin-bottom: 30px;
    }
    .btn{
        margin-top: 60px;
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF
    }
    .add{
        width: 30%;
        display: inline-block;
    }
    .add-btn{
        margin-top: 0;
         
    }
    .choice{
        width: 40% !important;
    }
}
</style>


