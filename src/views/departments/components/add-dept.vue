<template>
  <!-- 添加部门的弹出层 -->
  <el-dialog title="新增部门" :visible="isShow">
    <el-form :model="formData" :rules="addRules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          placeholder="1-50字符"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          style="width: 80%"
          placeholder="1-50字符"
          v-model="formData.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          v-model="formData.manager"
        ></el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          type="textarea"
          :rows="3"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { getDepartments } from "@/api/departments";
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false,
      },
      treeNode: {
        type: Object,
        default: null,
      },
    },
    data() {
      // 检查新增的部门名称是否重复
      const checkNameRepeat = async (rule, value, callback) => {
        const { depts } = await getDepartments();
        const res = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value);
        res ? callback(new Error("同级部门已经有这个部门了")) : callback();
      };
      return {
        formData: {
          name: "",
          code: "",
          manager: "",
          introduce: "",
        },
        addRules: {
          name: [
            { required: true, trigger: "blur", message: "部门名称不能为空" },
            { min: 1, max: 50, message: "部门名称长度为1-50", trigger: "blur" },
            { trigger: "blur", validator: checkNameRepeat },
          ],
          code: [
            { required: true, trigger: "blur", message: "部门编码不能为空" },
          ],
          manager: [
            { required: true, trigger: "blur", message: "部门负责人不能为空" },
          ],
          introduce: [
            { required: true, trigger: "blur", message: "部门介绍不能为空" },
          ],
        },
      };
    },
  };
</script>

<style>
</style>