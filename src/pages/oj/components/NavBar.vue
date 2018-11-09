<template>
  <div id="header">
    <div class="logo"><img src="/static/img/icon.png" alt=""></div>
    <Menu theme="light" mode="horizontal" @on-select="handleRoute" :active-name="activeMenu" class="oj-menu">
      <div class="oj-li">
      <Menu-item name="/" class="nav-title">
        {{$t('m.Home')}}
      </Menu-item>
      <Menu-item name="/problems" class="nav-title">
        {{$t('m.NavProblems')}}
      </Menu-item>
      <!-- <Menu-item name="/write" class="nav-title">
        笔试题库
      </Menu-item> -->
      <Menu-item name="/contests" class="nav-title">
        {{$t('m.Contests')}}
      </Menu-item>
      <Menu-item name="/status" class="nav-title">
        {{$t('m.NavStatus')}}
      </Menu-item>
      <Submenu name="rank" class="nav-title">
        <template slot="title">
          {{$t('m.Rank')}}
        </template>
        <Menu-item name="/acm-rank" class="nav-title">
          {{$t('m.ACM_Rank')}}
        </Menu-item>
        <Menu-item name="/oi-rank" class="nav-title">
          {{$t('m.OI_Rank')}}
        </Menu-item>
      </Submenu>
      <Submenu name="about" class="nav-title">
        <template slot="title">
          {{$t('m.About')}}
        </template>
        <Menu-item name="/about" class="nav-title">
          {{$t('m.Judger')}}
        </Menu-item>
        <Menu-item name="/FAQ" class="nav-title">
          {{$t('m.FAQ')}}
        </Menu-item>
      </Submenu>
      </div>
      <template v-if="!isAuthenticated" class="user-login">
        <div class="btn-menu">
          <Button type="ghost"
                  ref="loginBtn"
                  shape="circle"
                  @click="handleBtnClick('login')">{{$t('m.Login')}}
          </Button>
          <Button v-if="website.allow_register"
                  type="ghost"
                  shape="circle"
                  @click="handleBtnClick('register')"
                  style="margin-left: 5px;">{{$t('m.Register')}}
          </Button>
        </div>
      </template>
      <template v-else class="user-login">
        <Dropdown class="drop-menu" @on-click="handleRoute" placement="bottom" trigger="click">
          <Button type="text" class="drop-menu-title">{{ user.username | capitalize}}
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <Dropdown-menu slot="list">
            <Dropdown-item name="/user-home">{{$t('m.MyHome')}}</Dropdown-item>
            <Dropdown-item name="/status?myself=1">{{$t('m.MySubmissions')}}</Dropdown-item>
            <Dropdown-item name="/setting/profile">{{$t('m.Settings')}}</Dropdown-item>
            <Dropdown-item v-if="isAdminRole" name="/admin">{{$t('m.Management')}}</Dropdown-item>
            <Dropdown-item divided name="/logout">{{$t('m.Logout')}}</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </template>
    </Menu>
    <Modal v-model="modalVisible" :width="400">
      <div slot="header" class="modal-title">Welcome to {{website.website_name_shortcut}}</div>
      <component :is="modalStatus.mode" v-if="modalVisible"></component>
      <div slot="footer" style="display: none"></div>
    </Modal>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import login from '@oj/views/user/Login'
  import register from '@oj/views/user/Register'

  export default {
    components: {
      login,
      register
    },
    mounted () {
      this.getProfile()
    },
    filters: {
      capitalize: (value)=> {
        if (!value) return ''
        value = value.toString()
        let str,stringFlag = true;
           for(var i = 0; i < value.length; i++){
              if(value.charCodeAt(i) > 255){
                  stringFlag = false;
                  break;
              }
           }
           if(!stringFlag){
              str=value.charAt(0)+"*"+value.substr(2)
           }else{
              str=value
           }
        return str
      }
    },
    methods: {
      ...mapActions(['getProfile', 'changeModalStatus']),
      handleRoute (route) {
        if (route && route.indexOf('admin') < 0) {
          this.$router.push(route)
        } else {
          window.open('/admin/')
        }
      },
      handleBtnClick (mode) {
        this.changeModalStatus({
          visible: true,
          mode: mode
        })
      }
    },
    computed: {
      ...mapGetters(['website', 'modalStatus', 'user', 'isAuthenticated', 'isAdminRole']),
      // 跟随路由变化
      activeMenu () {
        return '/' + this.$route.path.split('/')[1]
      },
      modalVisible: {
        get () {
          return this.modalStatus.visible
        },
        set (value) {
          this.changeModalStatus({visible: value})
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #header {
    min-width: 1200px;
    padding: 0 2%;
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    .oj-li{
      margin: 0 auto;
      display: inline-block;
      text-align: center;
    }
    .oj-menu {
      background: #fdfdfd;
      width: 100%;
      margin: 0 auto;
      z-index: 1000;
      text-align: center;
      .nav-title{
        font-family:'PingFangSC-Regular';
        font-size:14px;
        flex: 1;
        text-align: center;
      }
    }
    .user-login{
      position: absolute;
    }
    .logo {
      margin-left: 4.17%;
      position: absolute;
      width:169px;
      z-index: 1001;
      height: 60px;
      img{
        width: 100%;
        height: 43px;
        display: inline-block;
        margin-top: 8px;
      }
    }

    .drop-menu {
      float: right;
      margin-right: 30px;
      position: absolute;
      right: 10px;
      &-title {
        font-size: 18px;
      }
    }
    .btn-menu {
      font-size: 16px;
      float: right;
      margin-right: 4.17%;
    }
  }

  .modal {
    &-title {
      font-size: 18px;
      font-weight: 600;
    }
  }
</style>
