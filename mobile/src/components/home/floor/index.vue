<template>
  <div class="home_floor">
    <div class="floor_item" v-for="floor in floors" :key="floor.id">
      <h2 class="floor_title">{{ floor.title }}</h2>
      <div class="floor_content">
        <Product
          v-for="product in floor.products"
          :key="product._id"
          :product="product"
        ></Product>
      </div>
    </div>
  </div>
</template>

<script>
import Product from 'components/product'

export default {
  name: "Floor",
  components:{
    Product
  },
  props:{
    floors:{
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="less" scoped>
.home_floor {
  padding: 14px 8px 0;
  background-color: #efefef;
  .floor_item {
    margin: 10px 0;
    .floor_title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
    .floor_content {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }
  }
}
</style>