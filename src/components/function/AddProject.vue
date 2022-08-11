<template>
  <div class="radius" style="margin-bottom: 24px;padding: 32px 20px 32px 12px;box-shadow: var(--el-box-shadow-light);border-radius: var(--el-border-radius-round);">
    <el-form :model="form" ref="formRef" :rules="rules" size="large" >
      <el-form-item label="项目名称" prop="project" >
        <el-input v-model="form.project" placeholder="请输入项目名称" clearable />
      </el-form-item>
      <div>
        <el-form-item label="开始时间" prop="inProject">
          <el-date-picker v-model="form.inProject" type="month" value-format="YYYY-MM" placeholder="选择开始时间" />
        </el-form-item>
        <el-form-item label="结项时间" prop="outProject">
          <el-date-picker v-model="form.outProject" type="month" value-format="YYYY-MM" placeholder="选择结项时间" />
        </el-form-item>
      </div>
      <el-form-item label="详细描述">
        <tip-tap :text="form.text" :color="'success'" @changeText="changeText"></tip-tap>
      </el-form-item>
      <el-form-item label="项目链接" prop="link" >
        <el-input v-model="form.link" placeholder="请输入项目链接（选填）" clearable />
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="removeProject" type="danger">删除当前项目经历</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { reactive, ref } from 'vue'

  export default {
    name: 'AddProject',
    props: [ 'data' ],
    setup (props, { emit }) {
      const formRef = ref()

      const form = ref({ ...props.data })

      const changeText = (val) => {
        form.value.text = val
      }

      const rules = reactive({
        project: [{ required: true, message: '不能为空', trigger: 'blur' }],
        inProject: [{ required: true, message: '请选择您的项目开始时间' }],
        outProject: [{ required: true, message: '请选择您的项目结束时间' }]
      })

      const removeProject = () => {
        emit('removeProject')
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
        removeProject,
        isRulesTrue
      }
    }
  }
</script>

<style scoped>

</style>
