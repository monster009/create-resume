<template>
  <div class="radius" style="margin-bottom: 24px;padding: 32px 20px 32px 12px;box-shadow: var(--el-box-shadow-light);border-radius: var(--el-border-radius-round);">
    <el-form :model="form" ref="formRef" :rules="rules" size="large" >
      <el-form-item label="高校名称" prop="college" >
        <el-input v-model="form.college" placeholder="请输入高校名称" clearable />
      </el-form-item>
      <el-form-item label="主修专业" prop="major" >
        <el-input v-model="form.major" placeholder="请输入专业名称" clearable />
      </el-form-item>
      <el-form-item label="学历" prop="college" >
        <el-select v-model="form.education" placeholder="选择学历">
          <el-option label="博士" value="博士" />
          <el-option label="硕士" value="硕士" />
          <el-option label="本科" value="本科" />
          <el-option label="MBA" value="MBA" />
          <el-option label="EMBA" value="EMBA" />
          <el-option label="MPA" value="MPA" />
          <el-option label="大专" value="大专" />
          <el-option label="专科" value="专科" />
          <el-option label="中专" value="中专" />
          <el-option label="中技" value="中技" />
          <el-option label="高中" value="高中" />
          <el-option label="初中" value="初中" />
          <el-option label="小学" value="小学" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label="入学时间" prop="inDate">
          <el-date-picker v-model="form.inDate" type="month" value-format="YYYY-MM" placeholder="选择入学时间" />
        </el-form-item>
        <el-form-item label="毕业时间" prop="outDate">
          <el-date-picker v-model="form.outDate" type="month" value-format="YYYY-MM" placeholder="选择毕业时间" />
        </el-form-item>
      </div>
      <el-form-item label=" ">
        <el-button @click="removeEducation" type="danger">删除当前教育背景</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { reactive, ref } from 'vue'

  export default {
    name: 'AddEducation',
    props: [ 'data' ],
    setup (props, { emit }) {
      const formRef = ref()

      const form = ref({ ...props.data })

      const rules = reactive({
        college: [{ required: true, message: '不能为空', trigger: 'blur' }],
        inDate: [{ required: true, message: '请选择您的入学时间' }],
        outDate: [{ required: true, message: '请选择您的毕业时间' }]
      })

      const removeEducation = () => {
        emit('removeEducation')
      }

      const isRulesTrue = () => {
        if (!formRef.value) return
        return formRef.value.validate((valid) => {
          return valid ? true : false
        })
      }

      return {
        formRef,
        form,
        rules,
        removeEducation,
        isRulesTrue
      }
    }
  }
</script>

<style scoped>

</style>
