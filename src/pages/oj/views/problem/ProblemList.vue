<template>
  <Row type="flex" :gutter="18">
    <Col :span=19>
    <Panel shadow>
      <div slot="title">Problem List</div>
      <div slot="extra">
        <ul class="filter">
          <li>
            <Dropdown @on-click="filterByDifficulty">
              <span>{{query.difficulty === '' ? 'Difficulty' : query.difficulty}}
                <Icon type="arrow-down-b"></Icon>
              </span>
              <Dropdown-menu slot="list">
                <Dropdown-item name="">All</Dropdown-item>
                <Dropdown-item name="Low">Low</Dropdown-item>
                <Dropdown-item name="Mid">Mid</Dropdown-item>
                <Dropdown-item name="High">High</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </li>
          <li>
            <i-switch size="large" @on-change="handleTagsVisible">
              <span slot="open">Tags</span>
              <span slot="close">Tags</span>
            </i-switch>
          </li>
          <li>
            <Input v-model="query.keyword"
                   @on-enter="filterByKeyword"
                   @on-click="filterByKeyword"
                   placeholder="keyword"
                   icon="ios-search-strong"/>
          </li>
          <li>
            <Button type="info" @click="onReset">
              <Icon type="refresh"></Icon>
              Reset
            </Button>
          </li>
        </ul>
      </div>
        <div class="contnet">
          <el-row :gutter="0">
              <el-col :span="2"><div class="text content-val">习题编号</div></el-col>
              <el-col :span="6"><div class="text content-val" style="text-align:left;">题目名称</div></el-col>
              <el-col :span="6"><div class="text content-val">标签</div></el-col>
              <el-col :span="3"><div class="text content-val">级别</div></el-col>
              <el-col :span="3"><div class="text content-val">提交次数</div></el-col>
              <el-col :span="4"><div class="text content-val">AC比例</div></el-col>
          </el-row>
          <el-row :gutter="0" v-for="(announcement,index) in problemList" :key="announcement._id" :class="{active:index%2==0}" class="content-val">
              <el-col :span="2"><div class="text">{{announcement._id}}</div></el-col>
              <el-col :span="6"><div class="text" style="color:#298cf1;cursor:pointer;text-align:left;" @click="goProblem(announcement._id)">{{announcement.title}}</div></el-col>
              <el-col :span="6"><div class="text"><p v-for="(tag,i) in announcement.tags" :key="i" class="tag" @click="filterByTag(tag)">{{tag}}</p></div></el-col>
              <el-col :span="3">
                  <div class="text statu">
                      <p v-if="announcement.difficulty=='Low'">低阶</p> 
                      <p v-if="announcement.difficulty=='Mid'" style="background:#3684ec">中阶</p> 
                      <p v-if="announcement.difficulty=='High'" style="background:#7f50ff">高阶</p>  
                  </div>
              </el-col>
              <el-col :span="3"><div class="text" style="color:#298cf1">{{announcement.submission_number}}</div></el-col>
              <el-col :span="4"><div class="text">{{announcement.accepted_number/announcement.submission_number|ac}}</div></el-col>
          </el-row>
      </div>
    </Panel>
    <Pagination :total="total" :page-size="limit" @on-change="pushRouter" :current.sync="query.page"></Pagination>

    </Col>

    <Col :span="5">
    <Panel :padding="10">
      <div slot="title" class="taglist-title">Tags</div>
      <Button v-for="tag in tagList"
              :key="tag.name"
              @click="filterByTag(tag.name)"
              type="ghost"
              :disabled="query.tag === tag.name"
              shape="circle"
              class="tag-btn">{{tag.name}}
      </Button>

      <Button long id="pick-one" @click="pickone">
        <Icon type="shuffle"></Icon>
        Pick one
      </Button>
    </Panel>
    <Spin v-if="loadings.tag" fix size="large"></Spin>
    </Col>
  </Row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import api from '@oj/api'
  import utils from '@/utils/utils'
  import { ProblemMixin } from '@oj/components/mixins'
  import Pagination from '@oj/components/Pagination'

  export default {
    name: 'ProblemList',
    mixins: [ProblemMixin],
    components: {
      Pagination
    },
    data () {
      return {
        tagList: [],
        problemList: [],
        limit: 20,
        total: 0,
        loadings: {
          table: true,
          tag: true
        },
        routeName: '',
        query: {
          keyword: '',
          difficulty: '',
          tag: '',
          page: 1
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init (simulate = false) {
        this.routeName = this.$route.name
        let query = this.$route.query
        this.query.difficulty = query.difficulty || ''
        this.query.keyword = query.keyword || ''
        this.query.tag = query.tag || ''
        this.query.page = parseInt(query.page) || 1
        if (this.query.page < 1) {
          this.query.page = 1
        }
        if (!simulate) {
          this.getTagList()
        }
        this.getProblemList()
      },
      pushRouter () {
        this.$router.push({
          name: 'problem-list',
          query: utils.filterEmptyValue(this.query)
        })
      },
      getProblemList () {
        let offset = (this.query.page - 1) * this.limit
        this.loadings.table = true
        api.getProblemList(offset, this.limit, this.query).then(res => {
          this.loadings.table = false
          this.total = res.data.data.total
          this.problemList = res.data.data.results
          if (this.isAuthenticated) {
            this.addStatusColumn(this.problemTableColumns, res.data.data.results)
          }
        }, res => {
          this.loadings.table = false
        })
      },
      goProblem(id){
            this.$router.push({name: 'problem-details', params: {problemID: id}})
      },
      getTagList () {
        api.getProblemTagList().then(res => {
          this.tagList = res.data.data
          this.loadings.tag = false
        }, res => {
          this.loadings.tag = false
        })
      },
      filterByTag (tagName) {
        this.query.tag = tagName
        this.query.page = 1
        this.pushRouter()
      },
      filterByDifficulty (difficulty) {
        this.query.difficulty = difficulty
        this.query.page = 1
        this.pushRouter()
      },
      filterByKeyword () {
        this.query.page = 1
        this.pushRouter()
      },
      handleTagsVisible (value) {
        if (value) {
          this.problemTableColumns.push(
            {
              title: 'Tags',
              align: 'center',
              render: (h, params) => {
                let tags = []
                params.row.tags.forEach(tag => {
                  tags.push(h('Tag', {}, tag))
                })
                return h('div', {
                  style: {
                    margin: '8px 0'
                  }
                }, tags)
              }
            })
        } else {
          this.problemTableColumns.splice(this.problemTableColumns.length - 1, 1)
        }
      },
      onReset () {
        this.$router.push({name: 'problem-list'})
      },
      pickone () {
        api.pickone().then(res => {
          this.$success('Good Luck')
          this.$router.push({name: 'problem-details', params: {problemID: res.data.data}})
        })
      }
    },
    filters: {
        ac(val){
            val=val*100;
            return val.toFixed(2)+'%';
        }
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    watch: {
      '$route' (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.init(true)
        }
      },
      'isAuthenticated' (newVal) {
        if (newVal === true) {
          this.init()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .taglist-title {
    margin-left: -10px;
    margin-bottom: -10px;
  }

  .tag-btn {
    margin-right: 5px;
    margin-bottom: 10px;
  }

  #pick-one {
    margin-top: 10px;
  }
  .contnet{
        background:#f8f8fa;
        box-shadow:0 2px 4px 0 rgba(0,0,0,0.20);
        border-radius:8px;
        width:100%;
        margin-top: 20px;
        .text{
            font-family:'PingFangSC-Medium';
            color:#4a4a4a;
            text-align:center;
            height:48px;
            line-height: 48px;
            font-size: 12px;
            padding-left: 25%;
            p{
                font-size:12px;
                color:#ffffff;
                text-align:center;
                background:#00c7fa;
                border-radius:4px;
                width:78px;
                height:22px;
                line-height: 22px;
            }
            .tag{
              width: 28%;
              margin-left: 2%;
              height:22px;
              line-height: 22px;
              margin-top: 13px;
              display: inline-block;
              border-color: #dddddd;
              background: #69ACF9;
              color: #ffffff;
              overflow: hidden;
              cursor:pointer;
            }
        }
        .statu{
            padding-top: 13px;
            p{
              margin: 0 auto;
            }
        }
        .active{
            background:#ffffff;
        }
        .content-val{
            font-size: 16px
        }
   }
</style>
