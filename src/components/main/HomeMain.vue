<template>
  <div class="container" ref="btnGroup">
    <el-button type="primary" @click="newResume" @mouseleave="removeClass">{{hasResume?'编辑':'新建'}}简历</el-button>
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
        const testData = {
            "step1Data": {
                "name": "刘显明",
                "sex": "男",
                "birthday": "1996-12-08T16:00:00.000Z",
                "phoneNumber": 15626380399,
                "email": "32413082@qq.com",
                "wechat": "TallRichHandsomeLxm",
                "address": [
                    "440000",
                    "440300",
                    "440306"
                ],
                "avatar": "data:image/jpeg;base64,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"
            },
            "step2Data": "<p>TallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxm</p>",
            "step3Data": [{
                    "id": "ySJKOjKpYcR_DKjvgzDSf",
                    "company": "TallRichHandsomeLxm",
                    "job": "TallRichHandsomeLxm",
                    "inJob": "2022-02",
                    "outJob": "2022-02",
                    "text": "<p><strong>TallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxm</strong></p>"
                },
                {
                    "id": "GKp2I5DXKg1t3ElN0-Z9V",
                    "company": "TallRichHandsomeLxmTallRichHandsomeLxm",
                    "job": "TallRichHandsomeLxm",
                    "inJob": "2022-02",
                    "outJob": "",
                    "text": "<ul><li><p>TallRichHandsomeLxm</p></li><li><p>TallRichHandsomeLxm</p></li><li><p>TallRichHandsomeLxm</p></li></ul>"
                },
                {
                    "id": "dA0kkCufuE75_trn-3Vkd",
                    "company": "TallRichHandsomeLxma",
                    "job": "TallRichHandsomeLxm",
                    "inJob": "2022-06",
                    "outJob": "2022-07",
                    "text": "<p>TallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxm</p>"
                },
                {
                    "id": "TMCRWAwcfgu6xTSVNuGgb",
                    "company": "TallRichHandsomeLxmb",
                    "job": "TallRichHandsomeLxmb",
                    "inJob": "2022-06",
                    "outJob": "2022-11",
                    "text": "<ol><li><p>TallRichHandsomeLxm</p></li><li><p>TallRichHandsomeLxm</p></li><li><p>TallRichHandsomeLxm</p></li></ol>"
                },
                {
                    "id": "0-_QzqRH1gW6AQx3hLMwp",
                    "company": "TallRichHandsomeLxmc",
                    "job": "TallRichHandsomeLxm",
                    "inJob": "2022-01",
                    "outJob": "",
                    "text": "<ul><li><p><em>a</em></p></li><li><p>bv</p></li><li><p>c</p></li></ul>"
                }
            ],
            "step4Data": [{
                    "id": "qEo8MmblNDqUOHAFhBhWA",
                    "college": "TallRichHandsomeLxm",
                    "major": "TallRichHandsomeLxm",
                    "education": "大专",
                    "inDate": "2022-02",
                    "outDate": "2022-02"
                },
                {
                    "id": "J2TDVylfnPJZpLDVw_6Bc",
                    "college": "TallRichHandsomeLxm",
                    "major": "TallRichHandsomeLxm",
                    "education": "硕士",
                    "inDate": "2022-02",
                    "outDate": "2022-11"
                },
                {
                    "id": "pH1Vj3SYpLPrv6kiF9UEt",
                    "college": "TallRichHandsomeLxm",
                    "major": "TallRichHandsomeLxm",
                    "education": "硕士",
                    "inDate": "2022-02",
                    "outDate": "2022-07"
                }
            ],
            "step5Data": [{
                    "id": "ycEQ2u-iQ_z6R4katd0LA",
                    "project": "TallRichHandsomeLxmaaa",
                    "inProject": "2022-02",
                    "outProject": "2022-11",
                    "text": "<ol><li><p>TallRichHandsomeLxm</p></li><li><p>TallRichHandsomeLxm</p></li><li><p>TallRichHandsomeLxm</p></li></ol>",
                    "link": "TallRichHandsomeLxm"
                },
                {   
                    "id": "6kJHifAB3dtWpQEWVViVw",
                    "project": "TallRichHandsomeLxmbbb",
                    "inProject": "2022-03",
                    "outProject": "2022-12",
                    "text": "<p><strong>aaaaaaaaaa</strong></p>",
                    "link": "TallRichHandsomeLxm"
                },
                {
                    "id": "XKCwuuLCt86vcNaKM_Rhr",
                    "project": "TallRichHandsomeLxmccc",
                    "inProject": "2022-01",
                    "outProject": "2022-03",
                    "text": "<ol><li><p>TallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p></li><li><p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p></li></ol>",
                    "link": "TallRichHandsomeLxm"
                },
                {
                    "id": "oEzPDr_t9Y9uWhh6g1W6r",
                    "project": "TallRichHandsomeLxmddd",
                    "inProject": "2022-07",
                    "outProject": "2022-03",
                    "text": "<p>TallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxm</p>",
                    "link": "TallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxmTallRichHandsomeLxm"
                }
            ],
            "step6Data": [
                {   
                    "id": "Es_0yWkmm0U1_u9A1SReF",
                    "title": "aa",
                    "text": "<p>aa</p>"
                },
                {
                    "id": "iKVQAxve7ORHuF1W9hzi2",
                    "title": "bb",
                    "text": "<p><em>bb</em></p>"
                },
                {
                    "id": "T8MlIuxcovP3uPTsYOGeG",
                    "title": "cc",
                    "text": "<p><strong>cc</strong></p>"
                },
                {
                    "id": "YT0N54C0yzOMGV87ke877",
                    "title": "dd",
                    "text": "<ul><li><p>a</p></li><li><p>b</p></li><li><p>c</p></li><li><p>d</p></li></ul>"
                }
            ]
        }
        store.commit('commitAllData', testData)
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
