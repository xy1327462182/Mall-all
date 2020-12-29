<template>
  <div class="nav">
    <div class="nav_list">
      <router-link
        class="nav_item"
        v-for="item in navList"
        :key="item._id"
        :to="'/category?pid=' + item._id"
      >
        <img :src="item.icon" alt="" />
        <p>{{ item.mobileName }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { GET_CATEGORIES } from "./store/types";

export default {
  name: "Nav",
  computed: {
    ...mapState({
      navList: (state) => state.nav.navList,
    }),
  },
  methods: {
    ...mapActions([GET_CATEGORIES]),
  },
  mounted() {
    this[GET_CATEGORIES]();
  },
};
</script>

<style lang="less" scoped>
.nav {
  padding: 0 8px;
  background: linear-gradient(#52c41a; #efefef);
  .nav_list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    background-color: #fff;
    padding: 10px 0;
    border-radius: 10px;
    .nav_item {
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 12px;
      img {
        width: 70%;
        border: 2px solid #eee;
        border-radius: 50%;
      }
      p {
        margin-top: 4px;
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>