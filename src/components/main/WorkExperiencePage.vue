<template>
  <transition>
    <div class="container" data-fadeIn fade-in-left>
      <step :msg="'step3'"></step>
      <el-form :model="form" size="large">
        <div v-for="item,index in form" :key="item.id">
          <h2 style="margin-bottom: 16px;">工作经历{{index + 1}}{{item.company ? '--' + item.company : ''}}</h2>
          <add-work ref="addWorkWindow" :data="item" @removeWork="removeWork(index)"></add-work>
        </div>
        <el-button type="warning" size="large" style="width: 100%" @click="addWorkExperience">
          <h2>新增一份工作经历</h2>
        </el-button>
        <el-form-item style="margin-top: 24px">
          <el-button type="warning" @click="onSubmit()">下一步</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import Step from '../ui/Step.vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import AddWork from '../function/AddWork.vue'
  import { nanoid } from 'nanoid'
  import fadeIn from '@/hooks/fadeIn'

  export default {
    name: 'WorkExperiencePage',
    components: {
      Step,
      AddWork
    },
    setup(props, { emit }) {
      const router = useRouter()
      const store = useStore()
      const formRef = ref()
      const form = ref([])
      const addWorkWindow = ref([])

      const addWorkExperience = () => {
        const formObj = {
          id: nanoid(),
          company: '',
          job: '',
          department: '',
          inJob: '',
          outJob: '',
          text: ''
        }
        form.value.push(formObj)
      }

      const removeWork = (val) => {
        form.value.splice(val, 1)
      }

      const onSubmit = () => {
        if (addWorkWindow.value && addWorkWindow.value.length > 0) {
          Promise.all(addWorkWindow.value.map(item => item.isRulesTrue())).then((result) => {
            if (result.every(value => value)) {
              const newArr = [ ...addWorkWindow.value ]
              form.value = []
              newArr.forEach((element, index) => {
                form.value[index] = element.form
              });
              const commitFormObj = {
                id: store.state.step3Data.id,
                title: '工作经历',
                data: form.value
              }
              if (!commitFormObj.id) commitFormObj.id = nanoid()
              store.commit('commitStep3Data', commitFormObj)
              router.push('/edit/step4')
            } else {
              emit('formError')
              return
            }
          }).catch(() => {
            emit('formError')
            return
          })
        } else if (addWorkWindow.value.length === 0 && store.state.step3Data.data && store.state.step3Data.data.length > 0) {
          store.commit('commitStep3Data', {
            id: store.state.step3Data.id,
            title: '工作经历',
            data: []
          })
        } else {
          router.push('/edit/step4')
        }
      }

      const goBack = () => {
        router.push('/edit/step2')
      }

      onMounted(() => {
        if (store.state.step3Data.data.length >= 1) {
          // 结构深拷贝第一层，不影响store.state.step3Data
          form.value = [...store.state.step3Data.data]
        }
        fadeIn()
      })

      return {
        formRef,
        form,
        addWorkWindow,
        addWorkExperience,
        removeWork,
        onSubmit,
        goBack
      }
    }
  }
</script>

<style scoped>
</style>