<template>
  <div class="home">
    <van-overlay :show="maskShow">
      <div class="mask_wrapper" @click.stop>
        <div class="mask_block">
          <van-loading size="48px" vertical>拼命加载中...</van-loading>
        </div>
      </div>
    </van-overlay>
    <Search :current="current" />
    <Swiper :banners="banners" />
    <Nav :navList="navList" />
    <Floor :floors="floors" />
    <van-icon
      id="back_top"
      name="back-top"
      v-show="backTopShow"
      @click.stop="backToTop"
    />
  </div>
</template>

<script>
import { BACK_TOP_SHOW,
 BACK_TOP_HIDE, 
 GET_ADS, 
 GET_CATEGORIES,
 GET_FLOORS,
} from "./store/types";

import { mapState, mapActions, mapMutations } from "vuex";

import Search from "components/search";
import Swiper from "components/home/swiper";
import Nav from "components/home/nav";
import Floor from "components/home/floor";

export default {
  name: "Home",
  components: {
    Search,
    Swiper,
    Nav,
    Floor,
  },
  computed: {
    ...mapState({
      ajaxTimes: (state) => state.home.ajaxTimes,
      backTopShow: (state) => state.home.backTopShow,
      current: (state) => state.home.current,
      banners: (state) => state.home.banners,
      navList: (state) => state.home.navList,
      floors: (state) => state.home.floors,
    }),
    maskShow() {
      return this.ajaxTimes != 0
    }
  },
  methods: {
    ...mapActions([GET_ADS, GET_CATEGORIES, GET_FLOORS]),
    ...mapMutations([BACK_TOP_SHOW, BACK_TOP_HIDE]),
    handleScroll() {
      const _this = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      _this.scrollTop = scrollTop;
      if (_this.scrollTop > 240) {
        _this[BACK_TOP_SHOW]();
      } else {
        _this[BACK_TOP_HIDE]();
      }
    },
    backToTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
  },
  mounted() {
    //监听滚动事件
    window.addEventListener("scroll", this.handleScroll, true);
    //派发action
    //加载轮播图广告
    this[GET_ADS]();
    //获取导航分类数据
    this[GET_CATEGORIES]();
    //获取首页楼层数据
    this[GET_FLOORS]();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
.home {
  margin-bottom: 55px;
  .van-overlay {
    z-index: 999;
    .mask_wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .mask_block {
        width: 120px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #dedede;
      }
    }
  }
  #back_top {
    position: fixed;
    right: 8px;
    bottom: 100px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
    border: 1px solid #666;
    border-radius: 50%;
  }
}
</style>
