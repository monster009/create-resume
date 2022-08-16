<template>
  <div class="common-layout">
    <el-container direction="vertical">
      <global-header :route="route"></global-header>
      <el-container class="main-container">
        <div class="container">
          <el-aside width="300px">
            <strong style="margin: 10px auto;">样式修改</strong>
            <el-form :model="form">
              <el-form-item label="上下间距">
                <el-slider v-model="form.ptpb" :max="200"/>
              </el-form-item>
              <el-form-item label="左右间距">
                <el-slider v-model="form.prpl" :max="200" />
              </el-form-item>
              <el-form-item :label="form.showAge ? '显示年龄' : '显示生日'">
                <el-switch v-model="form.showAge" />
              </el-form-item>
            </el-form>
          </el-aside>
          <el-main>
            <show-resume :form="form"></show-resume>
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import 'element-plus/es/components/message-box/style/css'
  import { ElMessageBox } from 'element-plus'
  import ShowResume from '../main/ShowResume.vue'

  import { useRoute } from 'vue-router'
import { reactive } from 'vue-demi'
  export default {
    name: 'HeaderMain',
    components: {
      ShowResume,
    },
    setup() {
      const route = useRoute()
      const form = reactive({
        ptpb: 10,
        prpl: 10,
        showAge: false
      })
      console.log(form);
      const formError = () => {
        ElMessageBox.alert('请检查是否有必填项为空，并且格式正确', '提交失败', {
          confirmButtonText: '确定'
        })
      }

      return {
        route,
        form,
        formError
      }
    }
  }
</script>

<style scoped>
  .main-container {
    position: relative;
    max-width: 1880px;
    width: 100%;
    margin: 0 auto;
    padding: var(--el-main-padding);
    overflow-x: hidden;
  }
  .container {
    display: flex;
  }
  .el-aside {
    position: sticky;
    left: 0;
    height: 100%;
    padding: 12px;
    background-color: #323639;
    color: #ffffff;
    overflow-y: auto;
  }
  .el-aside {
    --el-text-color-regular: #ffffff;
  }
  .el-main {
    position: relative;
    width: 100%;
    height: calc(100vh - 60px);
    background-color: #525659;
    padding: 0;
    overflow-y: auto;
  }
  @media (min-width: 576px) {
    .el-main {
      width: calc(100vw - 300px);
    }
  }
</style>
