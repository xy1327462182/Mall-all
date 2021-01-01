<template>
  <div class="category">
    <Search :current="current" />
    <div class="parent_cate">
      <Scroll>
        <ul class="content">
          <li>
            <van-sidebar v-model="activeKey" @change="onChange">
              <van-sidebar-item
                v-for="item in parent_cate_list"
                :key="item._id"
                :title="item.mobileName"
              />
            </van-sidebar>
          </li>
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
    onChange() {
      console.log("onChange...");
    },
  },
  mounted() {
    this[LOAD_PARENT_CATEGORIES]();
  },
};
</script>

<style lang="less" scoped>
.parent_cate {
  .parent_cate_item {
    width: 89px;
    height: 46px;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 15px;
  }
}
</style>
