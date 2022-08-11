<template>
  <div class="radius" style="margin-bottom: 24px;padding: 32px 20px 32px 12px;box-shadow: var(--el-box-shadow-light);border-radius: var(--el-border-radius-round);">
    <el-form :model="form" ref="formRef" :rules="rules" size="large">
      <el-form-item label="模块标题" prop="title" >
        <el-input v-model="form.title" placeholder="请输入自定义模块标题" clearable />
      </el-form-item>
      <el-form-item label="详细内容">
        <tip-tap :text="form.text" :color="'warning'" @changeText="changeText"></tip-tap>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="removeModel" type="danger">删除当前自定义模块</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { reactive, ref } from 'vue'

  export default {
    name: 'AddCustomModel',
    props: [ 'data' ],
    setup (props, { emit }) {
      const formRef = ref()

      const form = ref({ ...props.data })

      const changeText = (val) => {
        form.value.text = val
      }

      const rules = reactive({
        title: [{ required: true, message: '不能为空', trigger: 'blur' }]
      })

      const removeModel = () => {
        emit('removeModel')
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
        removeModel,
        isRulesTrue
      }
    }
  }
</script>

<style scoped>

</style>
