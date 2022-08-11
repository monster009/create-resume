<template>
  <h1 v-if="msg === 'step1'" style="color: #409eff;">Step1：基本信息</h1>
  <h1 v-else-if="msg === 'step2'" style="color: #67C23A;margin-left: 0;">Step2：个人简介</h1>
  <h1 v-else-if="msg === 'step3'" style="color: #E6A23C;margin-left: 0;">Step3：工作经历</h1>
  <h1 v-else-if="msg === 'step4'" style="color: #409eff;margin-left: 0;">Step4：教育背景</h1>
  <h1 v-else-if="msg === 'step5'" style="color: #67C23A;margin-left: 0;">Step5：项目经历</h1>
  <h1 v-else-if="msg === 'step6'" style="color: #E6A23C;margin-left: 0;">Step6：自定义模块</h1>
</template>

<script>
  export default {
    name: 'STEP',
    props: [
      "msg"
    ],
    setup () {
      return {
      }
    }
  }
</script>

<style scoped>
 h1 {
  margin: 12px 0 32px 88px;
  text-align: left;
 }
 @media (max-width: 767.98px) {
  h1 {
    margin-left: 72px;
  }
 }
</style>
