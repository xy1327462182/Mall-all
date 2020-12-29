<template>
  <div class="search">
    <van-search 
      v-model="value" 
      placeholder="请输入搜索关键词" 
      shape="round"
      background="#52c41a"
      @focus="$router.push('/search')"
    />
  </div>
</template>

<script>
export default {
  name: 'Search',
  data(){
    return {
      value:''
    }
  }
}
</script>