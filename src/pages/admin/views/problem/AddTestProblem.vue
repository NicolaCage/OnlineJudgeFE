<template>
    <div class="test-problem" v-loading="loading">
        <p class="test-problem-title">试卷 -- 添加题目</p>
        <div class="content">
            <div class="tle" >选择试卷 :<span v-if="!id==''">{{id}}</span> </div>
            <el-radio-group v-model="id" class="radios" @change="getTest">
                <el-radio :label="item.id" v-for="(item,index) in subject" :key="index" class="question">{{item.title}}</el-radio>
            </el-radio-group>
        </div>
        <div class="content">
            <div class="tle" >选择题目 : <span v-if="!question_list.length==0">{{question_list}}</span> </div>
            <el-checkbox-group v-model="question_list">
                <el-checkbox :label="item.id" v-for="(item,index) in question" :key="index" class="question">{{item.desc}}</el-checkbox>
            </el-checkbox-group>
            <el-pagination
                class="page"
                layout="prev, pager, next"
                @current-change="currentChange"
                :page-size="pageSize"
                :total="total">
            </el-pagination>
        </div>
        <el-button @click="submit" class="btn">确认添加</el-button>
    </div>
</template>
<script>
import api from '../../api.js'
export default {
    data(){
        return{
            pageSize: 20,
            id:'',
            total:0,
            question_list:[],
            subject:[],
            question:[],
            loading:false
        }
    },
    mounted(){
        this.getNumDetail()
        api.getTest().then(res => {
            this.subject=res.data.data.results
            console.log(this.subject)
        }).catch(() => {
                this.loading=false
        })
    },
    methods:{
        currentChange (page) {
            this.getNumDetail(page)
        },
        getNumDetail(page=1){
            this.loading = true
            let params = {
                limit: this.pageSize,
                offset: (page - 1) * this.pageSize
            }
            api.getNum(params).then(res => {
                this.loading = false
                this.total = res.data.data.total
                console.log()
                this.question = res.data.data.results
            }, res => {
                this.loading = false
            })
        },
        getTest(id){
            api.getTestDetail(id).then(res => {
                this.loading=false
                let arr=[]
                res.data.data.question_list.forEach((val,i) => {
                    arr.push(val.id)
                    this.question_list=arr
                });
            }).catch(() => {
                this.loading=false
            })
        },
        submit(){
            this.loading=true
            let data={
                id:this.id,
                question_list:this.question_list
            }
            api.subjectEdit(data).then(res => {
                this.loading=false
            }).catch(() => {
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
    padding: 1% 0 5%;
    color: #495060;
    .btn{
        margin-top: 30px;
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
    .page{
        margin-top: 20px;
        text-align: center;
    }
}
</style>


