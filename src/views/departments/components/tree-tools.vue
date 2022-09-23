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
          <el-dropdown>
            <span>操作<i class="el-icon-arrow-down"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
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
  };
</script>

<style scoped>
  .card {
    padding: 30px 140px;
    font-size: 14px;
  }
</style>