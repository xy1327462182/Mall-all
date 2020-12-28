<template>
  <div id="app">
    <TabBar></TabBar>
    <router-view></router-view>
  </div>
</template>

<script>
import TabBar from 'components/tab-bar'

export default {
  components: {
    TabBar
  }
}
</script>

<style lang="less">

</style>
