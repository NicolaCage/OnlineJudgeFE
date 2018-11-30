<template>
  <div style="background:#ffffff">
    dfsaffafasdas
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import NavBar from '@oj/components/NavBar.vue'
  import Footer from '@oj/components/Footer.vue'
  // import '../../assets/css/reset.css';
  // import '../../assets/css/media_grid.css';
  // import '../../assets/css/code.css';
  // import 'element-ui/lib/theme-chalk/index.css';
  // import 'iview/dist/styles/iview.css';
  // import 'echarts/lib/chart/bar';
  // import 'echarts/lib/chart/line';
  // import 'echarts/lib/chart/pie';
  // import 'echarts/lib/component/title';
  // import 'echarts/lib/component/grid';
  // import 'echarts/lib/component/dataZoom';
  // import 'echarts/lib/component/legend';
  // import 'echarts/lib/component/tooltip';
  // import 'echarts/lib/component/toolbox';
  // import 'echarts/lib/component/markPoint';
  export default {
    //  asyncData({ store, route }) {
    //   return store.dispatch(LODA_ARTICLES_ASYNC)
    // },
    name: 'app',
    components: {
      NavBar,
      Footer
    },
    data () {
      return {
        version: process.env.VERSION
      }
    },
    created () {
      try {
        document.body.removeChild(document.getElementById('app-loader'))
      } catch (e) {
      }
    },
    mounted () {
      this.getWebsiteConfig()
    },
    methods: {
      ...mapActions(['getWebsiteConfig', 'changeDomTitle'])
    },
    computed: {
      ...mapState(['website'])
    },
    watch: {
      'website' () {
        this.changeDomTitle()
      },
      '$route' () {
        this.changeDomTitle()
      }
    }
  }
</script>

<style >
 @import '../../assets/css/reset.css';
 @import '../../assets/css/media_grid.css';
 @import '../../assets/css/code.css';
 @import 'element-ui/lib/theme-chalk/index.css';
 @import 'iview/dist/styles/iview.css';
 @import 'echarts/lib/chart/bar';
 @import 'echarts/lib/chart/line';
 @import 'echarts/lib/chart/pie';
 @import 'echarts/lib/component/title';
 @import 'echarts/lib/component/grid';
 @import 'echarts/lib/component/dataZoom';
 @import 'echarts/lib/component/legend';
 @import 'echarts/lib/component/tooltip';
 @import 'echarts/lib/component/toolbox';
 @import 'echarts/lib/component/markPoint';
 @import 'katex/dist/katex.min.css';
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    background-color: transparent;
    /* &:active, &:hover {
      outline-width: 0;
    } */
  }

  .content{
    padding: 0 2%;
  }
  .content-app {
    background:#ffffff;
    padding-top: 107px;
  }

  .footer {
    margin-top: 108px;
    padding-bottom: 10px;
    text-align: center;
    font-size: small;
  }

  .fadeInUp-enter-active {
    animation: fadeInUp .8s;
  }


</style>
