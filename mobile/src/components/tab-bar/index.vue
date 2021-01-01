<template>
  <div class="tab-bar">
    <van-tabbar 
      fixed
      border
      route
      v-model="active"
      active-color="#1DA57A" 
      @change="onChange"
      @click.stop="handleClick"
    >
			<van-tabbar-item 
        icon="wap-home-o"
        to="/home"
      >
        首页
      </van-tabbar-item>
			<van-tabbar-item 
        icon="apps-o"
        to="/category"
      >
        分类
      </van-tabbar-item>
			<van-tabbar-item 
        icon="shopping-cart-o"
        badge="20"
        to="/cart"
      >
        购物车
      </van-tabbar-item>
			<van-tabbar-item 
        icon="user-o"
        to="/user"
      >
        个人中心
      </van-tabbar-item>
		</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      active: 0
    }
  },
  methods:{
    onChange(index){
      
    },
    handleClick() {

    }
  },
}
</script>