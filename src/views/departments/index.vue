<template>
  <div>
    <!-- 组织架构 -->
    <el-card class="card">
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        style="height: 40px , width: 100%"
      >
        <el-col>
          <!-- 左边 -->
          <span>ShyFen公司管理平台</span>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="end">
            <el-col>负责人</el-col>
            <!-- 下拉菜单 -->
            <el-col>
              <el-dropdown>
                <span>操作<i class="el-icon-arrow-down"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>选项一</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-tree :data="data" :props="defaultProps" :default-expand-all="true">
        <el-row
          slot-scope="{ data }"
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px; width: 100%"
        >
          <el-col>
            <!-- 左边 -->
            <span>{{ data.name }}</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>{{ data.manager }}</el-col>
              <!-- 下拉菜单 -->
              <el-col>
                <el-dropdown>
                  <span>操作<i class="el-icon-arrow-down"></i></span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>选项一</el-dropdown-item>
                    <el-dropdown-item>选项二</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
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
      };
    },
  };
</script>

<style scoped>
  .card {
    padding: 30px 140px;
    font-size: 14px;
  }
</style>