<template>
  <div class="category">
    <Search :current="current" />

    <van-row>
      <van-col span="6">
        <div class="parent_cate_container">
          <CategoriesList></CategoriesList>
        </div>
      </van-col>
      <van-col span="18">span: 8</van-col>
    </van-row>
  </div>
</template>

<script>
import Search from "components/search";
import CategoriesList from "components/category/categoriesList";
export default {
  name: "Category",
  data() {
    return {
      current: {
        page: "category",
        color: "#fff",
      },
    };
  },
  components: {
    Search,
    CategoriesList,
  },
};
</script>

<style lang="less" scoped>
.category {
  .parent_cate_container{
    height: auto;
  }
}
</style>
