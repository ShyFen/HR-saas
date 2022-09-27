<template>
  <div>
    <!-- 组织架构 -->
    <el-card class="card">
      <tree-tools
        :treeData="company"
        :isRoot="true"
        @addDepts="fatherAddDepts"
      ></tree-tools>

      <el-tree
        style="width: 100%"
        :data="resData"
        :props="defaultProps"
        :default-expand-all="true"
      >
        <tree-tools
          slot-scope="{ data }"
          :treeData="data"
          @delDepart="getData"
          @addDepts="fatherAddDepts"
        ></tree-tools>
      </el-tree>
    </el-card>
    <add-dept :isShow="isShowAdd" :treeNode="nodeData"></add-dept>
  </div>
</template>

<script>
  import TreeTools from "./components/tree-tools.vue";
  import AddDept from "./components/add-dept.vue";
  import { getDepartments } from "@/api/departments";

  export default {
    data() {
      return {
        resData: [],
        defaultProps: {
          label: "name",
          children: "children",
        },
        company: {}, //保存组织构架的信息
        isShowAdd: false, //新增部门的弹出层默认不显示
        nodeData: null,
      };
    },
    components: {
      TreeTools,
      AddDept,
    },
    created() {
      this.getData();
    },
    methods: {
      // 组织构架的信息
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
      // 监听tree-tool中点击添加新部门
      fatherAddDepts(data) {
        this.isShowAdd = true;
        this.nodeData = data;
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