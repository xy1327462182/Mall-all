<template>
  <div class="home_swiper">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="banner._id" v-for="banner in banners">
          <img :src="banner.image" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false, // 手动切换之后继续自动轮播
        },
        loop: true,
      },
    };
  },
  props:{
    banners:{
      type: Array,
      default: []
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  mounted() {
    this.mySwiper.slideTo(1, 1000, true);
  },
};
</script>

<style lang="less" scoped>
.home_swiper {
  width: 100%;
  height: 160px;
  padding: 5px 8px 5px;
  background-color: #52c41a;
  box-sizing: border-box;
}
.swiper-container {
  border-radius: 10px;
  overflow: hidden;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>
