<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  methods: {
    init_Scroll() {
      this.$nextTick(() => {
        if (!this.Scroll) {
          this.Scroll = new BScroll(this.$refs.wrapper, {
            click: true, // 配置允许点击事件
            scrollY: true, // 开启纵向滚动
          });
        } else {
          this.Scroll.refresh(); // 重新计算 better-scroll，当 DOM 结构发生变化的时确保滚动效果正常
        }
      });
    },
  },
  mounted() {
    this.init_Scroll();
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  position: absolute;
  top: 50px;
  bottom: 50px;
  overflow: hidden;
}
</style>