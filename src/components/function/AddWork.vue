<template>
  <div class="radius" style="margin-bottom: 24px;padding: 32px 20px 32px 12px;box-shadow: var(--el-box-shadow-light);border-radius: var(--el-border-radius-round);">
    <el-form :model="form" ref="formRef" :rules="rules" size="large" >
      <el-form-item label="公司名称" prop="company" >
        <el-input v-model="form.company" placeholder="请输入公司名称" clearable />
      </el-form-item>
      <el-form-item label="职位名称" prop="company" >
        <el-input v-model="form.job" placeholder="请输入职位名称" clearable />
      </el-form-item>
      <div>
        <el-form-item label="在职时间" prop="inJob">
          <el-date-picker v-model="form.inJob" type="month" value-format="YYYY-MM" placeholder="选择入职时间" />
        </el-form-item>
        <el-form-item label="离职时间">
          <el-date-picker v-model="form.outJob" type="month" value-format="YYYY-MM" placeholder="选择离职时间不填则是至今" />
        </el-form-item>
      </div>
      <el-form-item label="详细内容">
        <tip-tap :text="form.text" :color="'warning'" @changeText="changeText"></tip-tap>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="removeWork" type="danger">删除当前经历</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { reactive, ref } from 'vue'

  export default {
    name: 'AddWork',
    props: [ 'data' ],
    setup (props, { emit }) {
      const formRef = ref()

      const form = ref({ ...props.data })

      const changeText = (val) => {
        form.value.text = val
      }

      const rules = reactive({
        company: [{ required: true, message: '不能为空', trigger: 'blur' }],
        inJob: [{ required: true, message: '请选择您的入职时间' }]
      })

      const removeWork = () => {
        emit('removeWork')
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
        changeText,
        removeWork,
        isRulesTrue
      }
    }
  }
</script>

<style scoped>

</style>
