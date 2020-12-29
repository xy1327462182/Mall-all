<template>
    <router-link
      class="product_item"
      :to="'/detail?id=' + product._id"
    >
      <div class="product_pic">
        <img :src="product.mainImage" alt="" />
      </div>
      <div class="product_title">
        {{ product.name }}
      </div>
      <div class="product_info">
        <p class="product_price">
          <span class="price_icon">￥</span>{{ product.price }}
        </p>
        <van-icon 
          name="cart-o" 
          class="add_cart"
          @click.stop.prevent="add_cart(product._id)"
        />
      </div>
    </router-link>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: Object
  },
  methods:{
    add_cart(id) {
      console.log('add_cart',id);
    }
  }
};
</script>

<style lang="less" scoped>
.product_item {
  width: 46vw;
  margin-bottom: 10px;
  background-color: #fff;
  padding-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  .product_pic {
    width: 100%;
    height: 46vw;
  }
  .product_title {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #1a1a1a;
    font-size: 14px;
    margin: 5px;
  }
  .product_info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px 6px;
    .product_price {
      font-size: 17px;
      font-weight: 550;
      color: #f01;
      .price_icon {
        font-size: 15px;
        font-weight: 540;
      }
    }
    .add_cart {
      color: #52c41a;
    }
  }
}
</style>