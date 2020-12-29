<template>
  <div class="home">
    <Search :current="current" />
    <Swiper />
    <Nav />
    <Floor />
    <van-icon
      id="back_top"
      name="back-top"
      v-show="backTopShow"
      @click.stop="backToTop"
    />
  </div>
</template>

<script>
import Search from "components/search";
import Swiper from "components/home/swiper";
import Nav from "components/home/nav";
import Floor from "components/home/floor";

export default {
  name: "Home",
  data() {
    return {
      backTopShow: false,
      current: {
        page: 'home',
        color: '#52c41a'
      }
    };
  },
  components: {
    Search,
    Swiper,
    Nav,
    Floor,
  },
  methods: {
    handleScroll() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 240) {
        that.backTopShow = true;
      } else {
        that.backTopShow = false;
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
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
.home {
  margin-bottom: 55px;
  #back_top {
    position: fixed;
    right: 8px;
    bottom: 100px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
    border: 1px solid #666;
    border-radius: 50%;
  }
}
</style>
