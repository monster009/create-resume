<template>
  <el-header :class="route.name === 'showResume' ? 'dark' : 'default'">
    <div class="header-container">
      <router-link class="logo" to="/">
        <svg viewBox="0 0 1024 1024" width="50" height="50" style="display: inline-block;"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M797.77 743.444c44.262-45.924 43.364-118.9-2.01-163.728-45.377-44.822-118.365-44.822-163.743 0-45.37 44.827-46.269 117.804-2.008 163.728-55.809 30.538-90.614 88.992-90.865 152.61a29.126 29.126 0 0 0 8.533 20.596 29.09 29.09 0 0 0 20.59 8.528h291.246a29.116 29.116 0 0 0 29.124-29.125c-.249-63.617-35.058-122.07-90.867-152.609zm-83.882-138.63c32.17 0 58.25 26.076 58.25 58.248 0 32.168-26.08 58.248-58.25 58.248-32.167 0-58.247-26.08-58.247-58.248 0-32.172 26.08-58.248 58.247-58.248zM600.885 866.931c13.303-51.508 59.805-87.463 113.003-87.37 53.202-.093 99.704 35.862 113.006 87.37H600.885z"
            fill="#67C23A" />
          <path
            d="M729.219 104.182H169.593c-25.964 0-47.199 20.13-48.989 45.592V844.03a49.045 49.045 0 0 0 48.935 45.61H493.75c1.964-60.971 29.087-117.734 73.749-157.467-10.512-22.073-15.913-46.43-15.605-71.562.527-42.893 17.62-83.12 48.137-113.27 30.524-30.15 70.959-46.752 113.859-46.752 22.504 0 44.327 4.576 64.4 13.272V153.253c0-27.143-21.986-49.071-49.071-49.071zM435.726 582.004H267.457a27.411 27.411 0 0 1-23.736-13.708 27.402 27.402 0 0 1 0-27.414 27.402 27.402 0 0 1 23.736-13.706h168.269c15.143 0 27.413 12.27 27.413 27.413 0 15.14-12.27 27.415-27.413 27.415zm102.088-167.773H267.517c-15.142 0-27.415-12.272-27.415-27.414 0-15.138 12.273-27.413 27.415-27.413h270.297c15.143 0 27.414 12.275 27.414 27.413 0 15.142-12.271 27.414-27.414 27.414zm0-145.565H267.517c-15.142 0-27.415-12.276-27.415-27.418 0-15.137 12.273-27.413 27.415-27.413h270.297c15.143 0 27.414 12.276 27.414 27.413 0 15.142-12.271 27.418-27.414 27.418z"
            fill="#1D92FF" /></svg><strong class="logo-name">创建个人简历</strong>
      </router-link>
      <el-upload
        v-if="route.name === 'home' && !hasData"
        ref="upload"
        :limit="1"
        :auto-upload="false"
        :show-file-list="false"
        @change="handleChange"
        accept="application/json"
      >
        <template #trigger>
          <el-button type="primary">导入数据</el-button>
        </template>
      </el-upload>
      <el-button v-if="route.name === 'home' && hasData" type="danger" @click="resetting()">重置数据</el-button>
    </div>
  </el-header>
</template>

<script>
  import { decrypt } from '@/hooks/crypto'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { useStore } from 'vuex'
  import { computed, ref } from 'vue'

  export default {
    name: 'GlobalHeader',
    props: ['route'],
    setup () {
      const store = useStore()
      const upload  = ref()
      const hasData = computed(() => {
        return store.state.step1Data.name && store.state.step1Data.sex
      })

      const resetting = () => {
        store.commit('resetData')
      }
      const handleChange = (e) => {
        const file = e.raw
        if (file.type !== 'application/json') {
          ElMessage.error('文件必须是json格式')
          return
        }

        const reader= new FileReader()
        reader.readAsText(file, "utf-8")
        reader.onload = function () {
          const key1 = Object.keys(store.state)
          let key2, data
          try {
            const decryptData = decrypt(reader.result)
            data = JSON.parse(decryptData)
            key2 = Object.keys(data)

            if (key1.length === key2.length && key1.sort().toString() === key2.sort().toString()) {
              store.commit('commitAllData', data)
              ElMessage.success('导入成功')
            } else {
              ElMessageBox.alert('Error：该json文件不是此网站导出的数据文件，或采用其他编辑软件进行了错误的修改。','错误',{
                type:'error'
              })
            }
          } catch (err) {
            ElMessageBox.alert('Error：该json文件不是此网站导出的数据文件，或采用其他编辑软件进行了错误的修改。','错误',{
              type:'error'
            })
          }
        };
      }
      return {
        hasData,
        upload,
        resetting,
        handleChange,
      }
    }
  }
</script>

<style scoped>
 .el-header {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0;
    box-shadow: 0 0.5rem 1rem rgba(15, 18, 32, 0.07);
    background-color: #fff;
    z-index: 10;
  }
  .header-container {
    display: flex;
    max-width: 1400px;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding: var(--el-header-padding);
    text-align: left;
  }
  .el-header.dark {
    background-color: #323639;
    box-shadow: 0 0.5rem 1rem rgba(15, 18, 32, .4);
    color: #fff;
  }
  .logo {
    display: flex;
    align-items: center;
  }
</style>
