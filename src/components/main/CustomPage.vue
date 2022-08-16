<template>
  <div class="container">
    <step :msg="'step6'"></step>
    <el-form :model="form" size="large">
      <div v-for="item,index in form" :key="item.id">
        <h2 style="margin-bottom: 16px;">自定义模块{{index + 1}}{{item.title ? '--' + item.title : ''}}</h2>
        <add-custom-model ref="addModelWindow" :data="item" @removeModel="removeModel(index)"></add-custom-model>
      </div>
      <el-button type="warning" size="large" style="width: 100%" @click="addModel">
        <h2>新增一个自定义模块</h2>
      </el-button>
      <el-form-item style="margin-top: 24px">
        <el-button type="warning" v-loading.fullscreen.lock="fullscreenLoading" @click="onSubmit()">完成</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import Step from '../ui/Step.vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import AddCustomModel from '../function/AddCustomModel.vue'
  import { nanoid } from 'nanoid'
  import saveJSON from '@/hooks/saveJSON'
  import { ElMessageBox } from 'element-plus'
  import { encrypt } from '@/hooks/crypto'
  export default {
    name: 'CustomPage',
    components: {
      Step,
      AddCustomModel
    },
    setup(props, { emit }) {
      const router = useRouter()
      const store = useStore()
      const formRef = ref()
      const form = ref([])
      const fullscreenLoading = ref(false)
      const addModelWindow = ref()

      const addModel = () => {
        const formObj = {
          id: nanoid(),
          title: '',
          text: ''
        }
        form.value.push(formObj)
      }

      const removeModel = (val) => {
        form.value.splice(val, 1)
      }

      const exportMessage = () => {
        ElMessageBox.confirm('是否导出简历数据供下次使用？（导出或不导出都会跳转到查看简历页面）', '导出数据', {
          confirmButtonText: '导出',
          cancelButtonText: '不导出',
          type: 'info',
        }).then((status) => {
          if(status == 'confirm') {
            fullscreenLoading.value = true
            const encryptData = encrypt({...store.state})
            saveJSON(encryptData, `${store.state.step1Data.name}的简历数据${store.state.id}`)
            setTimeout(() => {
              fullscreenLoading.value = false
              router.push('/showResume')
            }, 2000)
          }
        }).catch((status) => {
          if(status == 'cancel') {
            fullscreenLoading.value = true
            setTimeout(() => {
              fullscreenLoading.value = false
              router.push('/showResume')
            }, 2000)
          }
        })
      }

      const onSubmit = () => {
        if (addModelWindow.value && addModelWindow.value.length > 0) {
          Promise.all(addModelWindow.value.map(item => item.isRulesTrue())).then((result) => {
            if (result.every(value => value)) {
              form.value = []
              addModelWindow.value.forEach((element, index) => {
                form.value[index] = element.form
              });
              store.commit('commitStep6Data', form.value)
              exportMessage()
            } else {
              emit('formError')
              return
            }
          }).catch(() => {
            emit('formError')
            return
          })
        } else {
          exportMessage()
        }
      }

      const goBack = () => {
        router.push('/edit/step5')
      }

      onMounted(() => {
        if (store.state.step6Data.length >= 1) {
          form.value = [ ...store.state.step6Data ]
        }
      })

      return {
        formRef,
        form,
        addModelWindow,
        fullscreenLoading,
        addModel,
        removeModel,
        onSubmit,
        goBack
      }
    }
  }
</script>

<style scoped>
</style>
