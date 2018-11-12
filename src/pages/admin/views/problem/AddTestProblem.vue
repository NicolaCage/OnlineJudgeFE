<template>
    <div class="test-problem" v-loading="loading">
        <p class="test-problem-title">试卷 -- 添加题目</p>
        <div class="content">
            <div class="tle" >选择试卷 :<span v-if="!id==''">{{id}}</span> </div>
            <el-radio-group v-model="id" class="radios">
                <el-radio :label="item.id" v-for="(item,index) in subject" :key="index" class="question">{{item.title}}</el-radio>
            </el-radio-group>
        </div>
        <div class="content">
            <div class="tle" >选择题目 : <span v-if="!question_list.length==0">{{question_list}}</span> </div>
            <el-checkbox-group v-model="question_list">
                <el-checkbox :label="item.id" v-for="(item,index) in question" :key="index" class="question">{{item.desc}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-button @click="submit" class="btn">确认添加</el-button>
    </div>
</template>
<script>
import api from '../../api.js'
export default {
    data(){
        return{
            id:'',
            question_list:[],
            subject:[],
            question:[],
            loading:false
        }
    },
    beforeCreate(){
        this.loading=true
        api.getNum().then(res => {
            this.question=res.data.data
            this.loading=false
        })
        api.getTest().then(res => {
            this.subject=res.data.data.results
            console.log(this.subject)
        })
    },
    methods:{
        submit(){
            this.loading=true
            let data={
                id:this.id,
                question_list:this.question_list
            }
            api.subjectEdit(data).then(res => {
                this.loading=false
            })
        }
    }
}
</script>
<style lang="less" scoped>
.test-problem{
    text-align: center;
    background: #fff;
    padding: 1% 0 15%;
    color: #495060;
    .btn{
        margin-top: 60px;
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF
    }
    .question{
        width: 45%;
        padding-left: 3%;
        margin-top: 1.5%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align: left;
        margin-left: 0;
    }
    .el-checkbox{
        font-size: 20px
    }
    .test-problem-title{
        font-size: 24px;
        margin-bottom: 30px;
    }
    .radios{
        width: 100%;
    }
    .tle{
        padding-left: 3%;
        font-size: 18px;
    }
    .content{
        text-align: left;
        margin-bottom: 30px;
    }
}
</style>


