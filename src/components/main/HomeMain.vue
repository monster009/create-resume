<template>
  <div class="container" ref="btnGroup">
    <el-button :type="hasResume ? 'warning' : 'primary'" @click="newResume" @mouseleave="removeClass">{{hasResume?'编辑':'新建'}}简历</el-button>
    <el-button type="success" v-loading.fullscreen.lock="fullscreenLoading" @click="exResume" @mouseleave="removeClass">查看简历</el-button>
  </div>
</template>

<script>
  import { computed, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { ElMessageBox } from 'element-plus'
  
  export default {
    name: 'HomeMain',
    setup () {
      const router = useRouter()
      const store = useStore()
      const hasResume = computed(() => {
        return store.state.step1Data.name ? true : false
      })
      const btnGroup = ref()
      const removeClass = () => {
        for (let index = 0; index < btnGroup.value.children.length; index++) {
          const element = btnGroup.value.children[index];
          element.classList.remove("active")
          element.classList.remove("inactive")
        }
      }

      onMounted(() => {
        for (let i = 0; i < btnGroup.value.children.length; i++) {
          const element = btnGroup.value.children[i]
          element.addEventListener("mouseenter", () => {
            element.classList.add("active")
            for (let j = 0; j < btnGroup.value.children.length; j++) {
              const element1 = btnGroup.value.children[j];
              if (i !== j) {
                element1.classList.add("inactive")
              }
            }
          })
        }
      })

      const newResume = () => {
        router.push('/edit/step1')
      }
      const fullscreenLoading = ref(false)
      const exResume = () => {
        fullscreenLoading.value = true
        setTimeout(() => {
          fullscreenLoading.value = false
          if (hasResume.value) {
            router.push('/showResume')
          } else {
            ElMessageBox.confirm('暂无本地简历缓存，请跳转到新建简历页面新建简历。', '提示', {
              confirmButtonText: '跳转',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              router.push('/edit/step1')
            }).catch(() => {
              
            })
          }
        }, 1000)
      }

      return {
        btnGroup,
        hasResume,
        removeClass,
        newResume,
        fullscreenLoading,
        exResume
      }
    }
  }

</script>

<style scoped>
  .container {
    display: flex;
    height: calc(100vh - 60px - var(--el-main-padding)*2);
    align-items: center;
    justify-content: center;
  }
  .container>.el-button {
    width: 80%;
    /* height: 100%; */
    font-size: 24px;
  }

  .el-button.active {
    transform: scale(1.5);
  }
  .el-button.inactive {
    transform: scale(.5);
    opacity: .5;
  }

  @media (min-width: 576px) {
    .container>.el-button {
      width: 200px;
      height: 200px;
      font-size: 30px;
    }
  }
  @media (max-width: 575.98px) {
    .container>.el-button {
      height: auto;
    }
    .el-button+.el-button {
      margin-left: 0;
      margin-top: 12px;
    }
    .container {
      flex-direction: column;
    }
  }
</style>
