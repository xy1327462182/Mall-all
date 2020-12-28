<template>
  <div class="tab-bar">
    <van-tabbar 
      v-model="active"
      active-color="#1DA57A" 
      @change="onChange"
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
      sessionStorage.setItem('tabBar-active-index', index)
    }
  },
  mounted() {
    let active = sessionStorage.getItem('tabBar-active-index')
    if (active) {
      this.active = parseInt(active)
    }
  }
}
</script>