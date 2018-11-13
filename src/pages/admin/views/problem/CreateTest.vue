<template>
    <div class="test" v-loading="loading">
        <p class="test-title">创建试卷</p>
        <div class="title-text"><span>试卷标题 : &nbsp;&nbsp;</span> <el-input v-model="title" type='text' placeholder="请输入试卷标题" class="title"></el-input></div> 
        <div class="title-text"><span>起始时间 : &nbsp;&nbsp;</span> 
              <el-date-picker
                v-model="start_time"
                type="datetime"
                style="width: 28%;"
                placeholder="选择起始时间">
              </el-date-picker>
        </div> 
        <div class="title-text"><span>结束时间 : &nbsp;&nbsp;</span> 
             <el-date-picker
                v-model="end_time"
                type="datetime"
                style="width: 28%"
                placeholder="选择结束时间">
              </el-date-picker>
        </div> 
        <div class="title-text title-textarea"><span>试卷描述 : &nbsp;&nbsp;</span> <el-input v-model="desc" type="textarea" :rows="3" placeholder="请输入试卷描述" class="title"></el-input></div> 
        <div class="title-text"><span>是否公开 : &nbsp;&nbsp;</span> 
             <el-switch
                v-model="is_visitable"
                active-text="公开"
                inactive-text="不公开">
            </el-switch>
        </div> 
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
            start_time:'',
            end_time:'',
            is_visitable: false,
            loading:false
        }
    },
    methods:{
        submit(){
            this.loading=true
            let data={
                title:this.title,
                desc:this.desc,
                is_visitable:this.is_visitable,
                start_time:this.start_time,
                end_time:this.end_time
            }
            api.createTest(data).then(res => {
                this.loading=false
                this.$router.push({name: 'test-list'})
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
    .title-textarea{
        margin-bottom: 80px;
    }
    .test-title{
        font-size: 24px;
        margin-bottom: 60px;
    }
    .btn{
        margin-top: 30px;
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF
    }
}
</style>


