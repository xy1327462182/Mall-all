<template>
  <van-sticky>
    <div class="search" :style="'background:' + color">
      <van-icon :name="iconName" class="search_icon" @click="goLink" />
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        shape="round"
        class="search_ipt"
        :background="color"
        @focus="$router.push('/search')"
      />
      <div class="empty"></div>
    </div>
  </van-sticky>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      value: "",
    };
  },
  props: {
    current: {
      type: Object,
    },
  },
  computed: {
    iconName() {
      return this.current.page == "home" ? "wap-nav" : "arrow-left";
    },
    color() {
      return this.current.page == "home" ? "#52c41a" : "#fff";
    },
  },
  methods: {
    goLink() {
      const link = this.current.page == "home" ? "/category" : "/home";
      this.$router.push(link);
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 50px;
  border-bottom: 0.5px solid #ccc;
  .search_icon {
    width: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
  }
  .search_ipt {
    width: 76%;
  }
  .empty {
    width: 12%;
  }
  .van-search .van-cell {
    padding-left: 0.4rem;
  }
}
</style>