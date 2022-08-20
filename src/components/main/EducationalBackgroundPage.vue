<template>
  <div class="container">
    <step :msg="'step4'"></step>
    <el-form :model="form" size="large">
      <div v-for="item,index in form" :key="item.id">
        <h2 style="margin-bottom: 16px;">教育背景{{index + 1}}{{item.college ? `--${item.college}/${item.education}` : ''}}</h2>
        <add-education ref="addEducationWindow" :data="item" @removeEducation="removeEducation(index)"></add-education>
      </div>
      <el-button type="primary" size="large" style="width: 100%" @click="addEducationalBackground">
        <h2>新增一个教育背景</h2>
      </el-button>
      <el-form-item style="margin-top: 24px">
        <el-button type="primary" @click="onSubmit()">下一步</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import Step from '../ui/Step.vue'
  import AddEducation from '../function/AddEducation.vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { nanoid } from 'nanoid'

  export default {
    name: 'EducationalBackgroundPage',
    components: {
      Step,
      AddEducation
    },
    setup(props, { emit }) {
      const router = useRouter()
      const store = useStore()
      const formRef = ref()
      const form = ref([])
      const addEducationWindow = ref()

      const addEducationalBackground = () => {
        const formObj = {
          id: nanoid(),
          college: '',
          major: '',
          education: '',
          inDate: '',
          outDate: ''
        }
        form.value.push(formObj)
      }

      const removeEducation = (val) => {
        form.value.splice(val, 1)
      }

      const onSubmit = () => {
        if (addEducationWindow.value && addEducationWindow.value.length > 0) {
          Promise.all(addEducationWindow.value.map(item => item.isRulesTrue())).then((result) => {
            if (result.every(value => value)) {
              form.value = []
              addEducationWindow.value.forEach((element, index) => {
                form.value[index] = element.form
              });
              const commitFormObj = {
                id: store.state.step4Data.id,
                title: '教育背景',
                data: form.value
              }
              if (!commitFormObj.id) commitFormObj.id = nanoid()
              store.commit('commitStep4Data', commitFormObj)
              router.push('/edit/step5')
            } else {
              emit('formError')
              return
            }
          }).catch(() => {
            emit('formError')
            return
          })
        } else if (addEducationWindow.value.length === 0 && store.state.step4Data.length > 0) {
          store.commit('commitStep4Data', {
            id: store.state.step4Data.id,
            title: '教育背景',
            data: []
          })
        } else {
          router.push('/edit/step5')
        }
      }

      const goBack = () => {
        router.push('/edit/step3')
      }
      
      onMounted(() => {
        if (store.state.step4Data.data.length >= 1) {
          form.value = [ ...store.state.step4Data.data ]
        }
      })

      return {
        formRef,
        form,
        addEducationWindow,
        addEducationalBackground,
        removeEducation,
        onSubmit,
        goBack
      }
    }
  }
</script>

<style scoped>
</style>
