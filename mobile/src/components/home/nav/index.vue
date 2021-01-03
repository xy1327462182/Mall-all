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
export default {
  name: "Nav",
  props:{
    navList:{
      type: Array,
      default: []
    }
  }
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