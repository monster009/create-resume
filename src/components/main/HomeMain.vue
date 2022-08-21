<template>
  <div class="container" ref="btnGroup">
    <el-button :type="hasResume ? 'warning' : 'primary'" @click="newResume" @mouseleave="removeClass">{{hasResume?'编辑':'新建'}}简历</el-button>
    <el-button type="success" v-loading.fullscreen.lock="fullscreenLoading" @click="exResume" @mouseleave="removeClass">导出简历</el-button>
  </div>
  <a href="mailto:32413082@qq.com" style="position: absolute;right: 12px;bottom: 8px;color: #409eff;text-decoration: underline;">feedback:<span>32413082@qq.com</span></a>
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
        if (!localStorage.getItem('hiddenAppTips') && !sessionStorage.getItem('tHiddenAppTips')) {
          ElMessageBox.confirm(
            '本网站为为个人性质的简历编辑导出网站，没有任何网络接口请求，页面加载完成后断网也可继续操作，绝对安全私密，尽可放心使用。<br><strong>桌面端：</strong>可使用该网站全部功能。<br><strong>移动端：</strong>只能使用编辑页面的功能，不太兼容导出pdf的功能，(移动端可使用编辑页面导出您的简历数据之后,再在桌面端导入数据再导出pdf。)<br>如有建议或反馈请联系我：<a style="color: #409EFF;text-decoration: underline;" href="mailto:32413082@qq.com">32413082@qq.com</a>',
            '小提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '不再提示',
              draggable: true,
              dangerouslyUseHTMLString: true,
              distinguishCancelAndClose: true
            }
          ).catch((status) => {
            if(status === 'cancel') {
              localStorage.setItem('hiddenAppTips', 'true')
            }
          }).finally(() => {
            sessionStorage.setItem('tHiddenAppTips', 'true')
          })
        }

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
