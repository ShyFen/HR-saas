<template>
  <!-- 添加部门的弹出层 -->
  <el-dialog title="新增部门" :visible="isShow" @close="canBtn">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="addRules"
      label-width="120px"
    >
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
          @focus="getEmployeesSimple"
          style="width: 80%"
          placeholder="请选择"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
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
      <el-button @click="canBtn">取 消</el-button>
      <el-button type="primary" @click="addBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { getDepartments, addDepartments } from "@/api/departments";
  import { getEmployees } from "@/api/employees";
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
        // 负责人信息
        peoples: [],
      };
    },
    methods: {
      async getEmployeesSimple() {
        const res = await getEmployees();

        this.peoples = res;
        console.log("this.peoples", this.peoples);
      },
      addBtn() {
        this.$refs.formRef.validate(async (item) => {
          if (item) {
            // 校验通过
            await addDepartments({ ...this.formData, pid: this.treeNode.id });
            this.$emit("addDept");
            // 修改弹出层隐藏,语法糖
            this.$emit("update:isShow", false);
          }
        });
      },
      canBtn() {
        // 关闭弹出层
        this.$emit("update:isShow", false);
        // 清除之前的校验结果
        this.$refs.formRef.resetFields();
      },
    },
  };
</script>

<style>
</style>