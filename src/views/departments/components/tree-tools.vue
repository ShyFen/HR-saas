<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <!-- 左边 -->
      <span>{{ treeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeData.manager }}</el-col>
        <!-- 下拉菜单 -->
        <el-col>
          <el-dropdown @command="handleCommand">
            <span>操作<i class="el-icon-arrow-down"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add"
                >添加子部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" command="edit"
                >编辑部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" command="del"
                >删除部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import { delDepartments  } from "@/api/departments";

  export default {
    props: {
      treeData: {
        type: Object,
      },
      isRoot: {
        type: Boolean,
        default: false, //默认不传值是false 也就是默认不是根节点
      },
    },
    methods: {
      // element下拉框自带的点击事件
      handleCommand(type) {
        if (type === "add") {
          // 添加
          this.$emit("addDepts", this.treeData) //给父组件传值，是否显示弹出层，添加新部门
        } else if (type === "edit") {
          // 编辑
        } else {
          // 删除
          delDepartments(this.treeData.id);
          this.$emit("delDepart");
          this.$message.success("删除部门成功！");
        }
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