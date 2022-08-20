<template>
  <div class="common-layout">
    <el-container direction="vertical">
      <global-header :route="route"></global-header>
      <el-container class="main-container">
        <el-scrollbar>
          <div class="container">
            <el-aside :class="{'hidden': hiddenAside}">
              <div class="bi-triangle-fill" @click="hiddenAside = !hiddenAside">
                <strong >样式修改</strong>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" :style="{ 'transform' : !hiddenAside ? 'rotateX(180deg)' : 'rotateX(0)'}" fill="currentColor"
                  class="triangle-svg">
                  <path fill-rule="evenodd"
                    d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" />
                </svg>
              </div>
              <el-scrollbar>
                <strong class="aside-title" style="margin: 10px auto;">样式修改</strong>
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
                  <el-form-item label="模块排序">
                    <div class="module-sort" style="display: flex; flex-direction: column; flex: 1;">
                      <transition-group type="transition" name="sort">
                        <el-button v-for="item,index in dragData" :key='item.id' type="primary"
                            :draggable="true"
                            @dragstart="dragstart(item)"
                            @dragenter="dragenter(item,$event)"
                            @dragend="dragend()"
                            @dragover="dragover($event)"
                          >
                            {{index + 1 + '.' + item.title}}
                        </el-button>
                      </transition-group>
                    </div>
                  </el-form-item>
                </el-form>
              </el-scrollbar>
            </el-aside>
            <el-main>
              <show-resume :form="form" :changeIndex="changeIndex"></show-resume>
            </el-main>
          </div>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import 'element-plus/es/components/message-box/style/css'
  import { ElMessageBox } from 'element-plus'
  import ShowResume from '../main/ShowResume.vue'

  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  import { ref, reactive, toRefs } from 'vue'
  export default {
    name: 'HeaderMain',
    components: {
      ShowResume,
    },
    setup() {
      const route = useRoute()
      const store = useStore()
      let dragData = ref(store.getters.getResumeData())
      const hiddenAside = ref(false)
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
      const formError = () => {
        ElMessageBox.alert('请检查是否有必填项为空，并且格式正确', '提交失败', {
          confirmButtonText: '确定'
        })
      }

      const dragEvent = reactive({
        oldData: null,
        newData: null,
        changeIndex: [],
        dragstart: (value) => {
          dragEvent.oldData = value
        },
        dragenter: (value, e) => {
          dragEvent.newData = value
          e.preventDefault()
        },
        dragend: () => {
          if (dragEvent.oldData !== dragEvent.newData) {
            let oldIndex = dragData.value.indexOf(dragEvent.oldData)
            let newIndex = dragData.value.indexOf(dragEvent.newData)
            dragEvent.changeIndex = [oldIndex + 1, newIndex + 1]
            let newItems = [...dragData.value]
            newItems.splice(oldIndex, 1)
            newItems.splice(newIndex, 0, dragEvent.oldData)
            dragData.value = [...newItems]
          }
        },
        dragover: (e) => {
          e.preventDefault()
        }
      })
      const refDrageEvent = toRefs(dragEvent)

      return {
        route,
        form,
        dragData,
        hiddenAside,
        formError,
        ...refDrageEvent
      }
    }
  }
</script>

<style scoped>
  .sort-move {
    transition: transform .3s;
  }
  .module-sort .el-button {
    width: 100%;
    margin-left: 0;
    border-bottom: 1px solid #323639;
  }
  .module-sort .el-button:hover {
    cursor: grab;
  }
  .main-container {
    position: relative;
    max-width: 1920px;
    width: 100%;
    margin: 0 auto;
    padding: var(--el-main-padding);
    overflow-x: hidden;
  }
  .container {
    position: relative;
    display: flex;
    min-width: 820px;
  }
  .el-aside {
    position: fixed;
    width: 100vw;
    height: 20vh;
    min-height: 96px;
    padding: 0 12px 12px;
    bottom: 0;
    background-color: #323639;
    color: #ffffff;
    overflow: unset;
    --el-text-color-regular: #ffffff;
    z-index: 1;
    transition: all .5s ease;
    will-change: height, min-height;
  }
  .el-aside.hidden {
    height: 0;
    min-height: 0;
  }
  .el-aside .el-form {
    overflow-y: auto;
  }
  .el-aside .el-form-item {
    margin-bottom: 0;
    overflow: hidden;
  }
  .bi-triangle-fill {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 50%;
    padding: 2px 8px;
    border-radius: 10px 10px 0 0;
    transform: translate( -50% , -100%);
    background-color: #323639;
  }
  .bi-triangle-fill>strong{
    font-size: 12px;
    vertical-align: middle;
  }
  .triangle-svg {
    vertical-align: middle;
    margin-left: 4px;
  }
  .aside-title {
    display: none;
  }
  .el-main {
    position: relative;
    width: 100vw;
    height: calc(100vh - 60px);
    background-color: #525659;
    padding: 0;
    overflow-y: auto;
  }
  @media (min-width: 1140px) {
    .el-aside {
      position: relative;
      width: 300px;
      min-height: auto;
      bottom: unset;
      height: calc(100vh - 60px);
      padding: 12px;
      transition: unset;
    }
    .el-aside.hidden {
      height: calc(100vh - 60px);
      min-height: auto;
    }
    .el-aside .el-form-item {
      margin-bottom: 18px;
    }
    .bi-triangle-fill {
      display: none;
    }
    .aside-title {
      display: block;
    }
    .el-main {
      width: calc(100vw - 300px);
    }
  }
  @media (min-width: 1920px) {
    .container {
      overflow-y: auto;
    }
  }
</style>
