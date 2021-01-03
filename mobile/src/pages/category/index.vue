<template>
  <div class="category">
    <Search :current="current" />
    <div class="categories_content">
      <Scroll class="wrapper parent_cate">
        <van-sidebar v-model="activeKey" @change="onChange" class="content">
          <van-sidebar-item title="热门推荐" />
          <van-sidebar-item
            v-for="item in parent_cate_list"
            :key="item._id"
            :title="item.mobileName"
          />
        </van-sidebar>
      </Scroll>
      <Scroll class="wrapper child_cate">
        <ul>
          <li>1213</li>
          <li>1213</li>
          <li>1213</li>
          <li>1213</li>
          <li>1213</li>
          <li>1213</li>
          <li>1213</li>
          <li>1213</li>
        </ul>
      </Scroll>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { LOAD_PARENT_CATEGORIES } from "./store/types";
import Scroll from "components/scroll";
import Search from "components/search";

export default {
  name: "Category",
  data() {
    return {
      current: {
        page: "category",
        color: "#fff",
      },
      activeKey: 0,
    };
  },
  computed: {
    ...mapState({
      parent_cate_list: (state) => state.category.parent_cate_list,
    }),
  },
  components: {
    Search,
    Scroll,
  },
  methods: {
    ...mapActions([LOAD_PARENT_CATEGORIES]),
    getChildCategories(pid) {
      console.log(pid);
    },
    onChange(index) {
      console.log("onChange...", index);
    },
  },
  mounted() {
    this[LOAD_PARENT_CATEGORIES]();
  },
};
</script>

<style lang="less" scoped>
.category {
  .categories_content {
    display: flex;
    flex-flow: row nowrap;
    position: fixed;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 50px;
    .parent_cate {
      flex: 2.5;
      overflow: hidden;
    }
    .child_cate {
      flex: 7.5;
      overflow: hidden;
    }
    .content{
      width: 100%;
    }
  }
}
</style>
