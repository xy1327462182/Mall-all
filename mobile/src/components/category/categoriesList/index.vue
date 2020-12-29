<template>
  <ul class="categories_list">
    <li v-for="i in 40" :key="i">{{i}}</li>
  </ul>
</template>

<script>
export default {
  name: 'CategoriesList'
}
</script>

<style lang="less" scoped>
.categories_list{
  height: auto;
}
</style>