<template>
	<div class="home">
		<Search />
    <Swiper />
	</div>
</template>

<script>
import Search from 'components/search'
import Swiper from 'components/swiper'
export default {
  name: 'Home',
  components:{
    Search,
    Swiper
  }
}
</script>

<style lang="less" scoped>

</style>
