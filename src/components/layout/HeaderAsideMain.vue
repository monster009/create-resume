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
              <el-form-item label="名字字号">
                <el-slider v-model="form.nameSize" :max="50" />
              </el-form-item>
              <el-form-item label="文本字号">
                <el-slider v-model="form.fontSize" :max="50" />
              </el-form-item>
              <el-form-item label="文本行高">
                <el-slider v-model="form.lineHeight" :max="100"/>
              </el-form-item>
              <el-form-item label="模块间距">
                <el-slider v-model="form.moduleMt" :max="100" />
              </el-form-item>
              <el-form-item label="节点间距">
                <el-slider v-model="form.nodeMt" :max="100" />
              </el-form-item>
              <el-form-item label="标题字号">
                <el-slider v-model="form.h2Size" :max="100" />
              </el-form-item>
              <el-form-item label="标题间距">
                <el-slider v-model="form.h2Mb" :max="100" />
              </el-form-item>
              <el-form-item label="重要文本字号">
                <el-slider v-model="form.h3Size" :max="50" />
              </el-form-item>
              <el-form-item label="加粗文本字号">
                <el-slider v-model="form.h4Size" :max="50" />
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
        ptpb: 30,
        prpl: 50,
        showAge: false,
        nameSize: 32,
        fontSize: 16,
        lineHeight: 16,
        h2Size: 24,
        moduleMt: 12,
        nodeMt: 16,
        h2Mb: 20,
        h3Size: 20,
        h4Size: 18
      })
      console.log({...form})
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
