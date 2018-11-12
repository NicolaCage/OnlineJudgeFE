<template>
    <div class="test" v-loading="loading">
        <p class="test-title">创建试卷</p>
        <div class="title-text"><span>试卷标题 : &nbsp;&nbsp;</span> <el-input v-model="title" type='text' placeholder="请输入试卷标题" class="title"></el-input></div> 
        <div class="title-text"><span>试卷描述 : &nbsp;&nbsp;</span> <el-input v-model="desc" type="textarea" :rows="3" placeholder="请输入试卷描述" class="title"></el-input></div> 
        <el-button @click="submit" class="btn">确认创建</el-button>
    </div>
</template>
<script>
import api from '../../api.js'
export default {
    data () {
        return{
            title:'',
            desc:'',
            loading:false
        }
    },
    methods:{
        submit(){
            this.loading=true
            let data={
                title:this.title,
                desc:this.desc
            }
            api.createTest(data).then(res => {
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
    padding: 5% 0 15%;
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
    .test-title{
        font-size: 24px;
        margin-bottom: 60px;
    }
    .btn{
        margin-top: 60px;
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF
    }
}
</style>


