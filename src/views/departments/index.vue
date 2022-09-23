<template>
  <div>
    <!-- 组织架构 -->
    <el-card class="card">
      <tree-tools :treeData="company" :isRoot="true"></tree-tools>

      <el-tree
        style="width: 100%"
        :data="data"
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

  export default {
    data() {
      return {
        data: [
          {
            name: "总裁办",
            manager: "张大",
            children: [{ name: "董事会", manager: "张二" }],
          },
          { name: "行政部", manager: "李大" },
          { name: "人事部", manager: "王大" },
        ],
        defaultProps: {
          label: "name",
          children: "children",
        },
        company: {
          name: "shyfen公司管理平台",
          manager: "负责人",
        },
      };
    },
    components: {
      TreeTools,
    },
  };
</script>

<style scoped>
  .card {
    padding: 30px 140px;
    font-size: 14px;
  }
</style>