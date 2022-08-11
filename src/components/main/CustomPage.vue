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

      const onSubmit = () => {
        fullscreenLoading.value = true
        if (addModelWindow.value && addModelWindow.value.length > 0) {
          Promise.all(addModelWindow.value.map(item => item.isRulesTrue())).then((result) => {
            if (result.every(value => value)) {
              form.value = []
              addModelWindow.value.forEach((element, index) => {
                form.value[index] = element.form
              });
              store.commit('commitStep6Data', form.value)
              setTimeout(() => {
                fullscreenLoading.value = false
                router.push('/showResume')
              }, 1500)
            } else {
              fullscreenLoading.value = false
              emit('formError')
              return
            }
          }).catch(() => {
            fullscreenLoading.value = false
            emit('formError')
            return
          })
        } else {
          router.push('/showResume')
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
  .container {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>