<template>
  <div class="common-layout">
    <el-container direction="vertical">
      <global-header :route="route"></global-header>
      <el-main>
        <div class="main-container">
          <basic-page v-if="route.params.id === 'step1'" @formError="formError"></basic-page>
          <profile-page v-else-if="route.params.id === 'step2'" ></profile-page>
          <work-experience-page v-else-if="route.params.id === 'step3'" @formError="formError"></work-experience-page>
          <educational-background-page v-else-if="route.params.id === 'step4'" @formError="formError"></educational-background-page>
          <projects-page v-else-if="route.params.id === 'step5'" @formError="formError"></projects-page>
          <custom-page v-else-if="route.params.id === 'step6'" @formError="formError"></custom-page>
          <home-main v-else></home-main>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import 'element-plus/es/components/message-box/style/css'
  import { ElMessageBox } from 'element-plus'
  import HomeMain from '../main/HomeMain.vue'
  import GlobalHeader from '../ui/GlobalHeader.vue'
  import BasicPage from '../main/BasicPage.vue'
  import ProfilePage from '../main/ProfilePage.vue'
  import WorkExperiencePage from '../main/WorkExperiencePage.vue'
  import EducationalBackgroundPage from '../main/EducationalBackgroundPage.vue'
  import ProjectsPage from '../main/ProjectsPage.vue'
  import CustomPage from '../main/CustomPage.vue'

  import { useRoute } from 'vue-router'
  export default {
    name: 'HeaderMain',
    components: {
      HomeMain,
      GlobalHeader,
      BasicPage,
      ProfilePage,
      WorkExperiencePage,
      EducationalBackgroundPage,
      ProjectsPage,
      CustomPage
    },
    setup() {
      const route = useRoute()

      const formError = () => {
        ElMessageBox.alert('请检查是否有必填项为空，并且格式正确', '提交失败', {
          confirmButtonText: '确定'
        })
      }

      return {
        route,
        formError
      }
    }
  }
</script>

<style scoped>
  .el-main {
    width: 100%;
    height: calc(100vh - 60px);
    padding: 0;
    overflow-y: auto;
  }
  .main-container {
    position: relative;
    max-width: 1400px;
    width: calc(100% - var(--el-main-padding) * 2);
    margin: 0 auto;
    padding: var(--el-main-padding);
    overflow-x: hidden;
  }
  .container {
    max-width: 1024px;
    width: 100%;
    margin: auto;
  }
</style>
<style>
  .el-message-box {
    border: none;
  }
  </style>
