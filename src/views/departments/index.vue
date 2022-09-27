<template>
  <div>
    <!-- 组织架构 -->
    <el-card class="card">
      <tree-tools :treeData="company" :isRoot="true"></tree-tools>

      <el-tree
        style="width: 100%"
        :data="resData"
        :props="defaultProps"
        :default-expand-all="true"
      >
        <tree-tools slot-scope="{ data }" :treeData="data"></tree-tools>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
  import TreeTools from "./components/tree-tools.vue";
  import { getDepartments } from "@/api/departments";

  export default {
    data() {
      return {
        resData: [],
        defaultProps: {
          label: "name",
          children: "children",
        },
        company: {},
      };
    },
    components: {
      TreeTools,
    },
    created() {
      this.getData();
    },
    methods: {
      async getData() {
        const res = await getDepartments();
        this.company = { name: res.companyName, manager: "负责人" };
        res.depts.forEach((item) => {
          if (!item.pid) {
            let children = [];
            res.depts.forEach((m) => {
              if (m.pid === item.id) {
                children.push(m);
              }
            });
            this.$set(item, "children", children);
          }
        });
        this.resData = res.depts;
        console.log(this.resData);
      },
    },
  };
</script>

<style scoped>
  .card {
    padding: 30px 140px;
    font-size: 14px;
  }
</style>