<template>
	<div v-swiper:mySwiper="swiperOption">
		<div class="swiper-wrapper">
			<div class="swiper-slide" :key="banner" v-for="banner in banners">
				<img :src="banner" />
			</div>
		</div>
		<div class="swiper-pagination"></div>
    <p>{{banners}}</p>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

export default {
	data() {
		return {
			//banners: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2507195917,1660144022&fm=26&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3193641795,689207363&fm=26&gp=0.jpg'],
			swiperOption: {
				pagination: {
					el: '.swiper-pagination',
				},
				// ...
			},
		}
  },
  computed:{
    ...mapState(['banners'])
  },
	components: {
		Swiper,
		SwiperSlide,
	},
	directives: {
		swiper: directive,
	},
	mounted() {
		this.mySwiper.slideTo(3, 1000, false)
	},
}
</script>
