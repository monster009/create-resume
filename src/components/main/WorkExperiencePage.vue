<template>
  <div class="container">
    <step :msg="'step3'"></step>
    <el-form :model="form" size="large">
      <div v-for="item,index in form" :key="item.id">
        <h2 style="margin-bottom: 16px;">工作经历{{index + 1}}</h2>
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
</template>

<script>
  import { onMounted, ref } from 'vue'
  import Step from '../ui/Step.vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import AddWork from '../function/AddWork.vue'
  import { nanoid } from 'nanoid'

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
      const addWorkWindow = ref()

      const addWorkExperience = () => {
        const formObj = {
          id: nanoid(),
          company: '',
          job: '',
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
              store.commit('commitStep3Data', form.value)
              router.push('/edit/step4')
            } else {
              emit('formError')
              return
            }
          }).catch(() => {
            emit('formError')
            return
          })
        } else {
          router.push('/edit/step4')
        }
      }

      const goBack = () => {
        router.push('/edit/step2')
      }

      onMounted(() => {
        if (store.state.step3Data.length >= 1) {
          // 结构深拷贝第一层，不影响store.state.step3Data
          form.value = [...store.state.step3Data]
        }
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
  .container {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>