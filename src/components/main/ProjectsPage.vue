<template>
  <div class="container">
    <step :msg="'step5'"></step>
    <el-form :model="form" size="large">
      <div v-for="item,index in form" :key="item.id">
        <h2 style="margin-bottom: 16px;">项目经历{{index + 1}}{{item.project ? '--' + item.project : ''}}</h2>
        <add-project ref="addProjectWindow" :data="item" @removeProject="removeProject(index)"></add-project>
      </div>
      <el-button type="success" size="large" style="width: 100%" @click="addProject">
        <h2>新增一个项目经历</h2>
      </el-button>
      <el-form-item style="margin-top: 24px">
        <el-button type="success" @click="onSubmit()">下一步</el-button>
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
  import AddProject from '../function/AddProject.vue'
  import { nanoid } from 'nanoid'

  export default {
    name: 'ProjectPage',
    components: {
      Step,
      AddProject
    },
    setup(props, { emit }) {
      const router = useRouter()
      const store = useStore()
      const formRef = ref()
      const form = ref([])
      const addProjectWindow = ref([])

      const addProject = () => {
        const formObj = {
          id: nanoid(),
          project: '',
          inProject: '',
          outProject: '',
          text: '',
          link : ''
        }
        form.value.push(formObj)
      }

      const removeProject = (val) => {
        form.value.splice(val, 1)
      }

      const onSubmit = () => {
        if (addProjectWindow.value && addProjectWindow.value.length > 0) {
          Promise.all(addProjectWindow.value.map(item => item.isRulesTrue())).then((result) => {
            if (result.every(value => value)) {
              form.value = []
              addProjectWindow.value.forEach((element, index) => {
                form.value[index] = element.form
              });
              const commitFormObj = {
                id: store.state.step5Data.id,
                title: '项目经历',
                data: form.value
              }
              if (!commitFormObj.id) commitFormObj.id = nanoid()
              store.commit('commitStep5Data', commitFormObj)
              router.push('/edit/step6')
            } else {
              emit('formError')
              return
            }
          }).catch(() => {
            emit('formError')
            return
          })
        } else if (addProjectWindow.value.length === 0 && store.state.step5Data.data && store.state.step5Data.data.length > 0) {
          store.commit('commitStep5Data', {
            id: store.state.step5Data.id,
            title: '项目经历',
            data: []
          })
        } else {
          router.push('/edit/step6')
        }
      }

      const goBack = () => {
        router.push('/edit/step4')
      }

      onMounted(() => {
        if (store.state.step5Data.data.length >= 1) {
          form.value = [ ...store.state.step5Data.data ]
        }
      })

      return {
        formRef,
        form,
        addProjectWindow,
        addProject,
        removeProject,
        onSubmit,
        goBack
      }
    }
  }
</script>

<style scoped>
</style>
