<template>
  <div class="container">
    <step :msg="'step2'"></step>
    <el-form ref="formRef" size="large">
      <tip-tap :text="text" :color="'success'" @changeText="changeTextFn"></tip-tap>
      <div style="text-align: left; margin-top: 12px">
        <el-button type="success" @click="onSubmit()">下一步</el-button>
        <el-button @click="goBack">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import Step from '../ui/Step.vue'
  import TipTap from '../function/TipTap.vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  export default {
    name: 'ProfilePage',
    components: {
        Step,
        TipTap
    },
    setup () {
      const router = useRouter()
      const store = useStore()
      const formRef = ref()

      const text = ref('')

      onMounted(() => {
        text.value = store.state.step2Data ? store.state.step2Data : ''
      })

      const changeTextFn = (val) => {
        text.value = val
      }

      const onSubmit = () => {
        store.commit('commitStep2Data', text.value)
        router.push('/edit/step3')
      }

      const goBack = () => {
        router.push('/edit/step1')
      }

      return {
        formRef,
        text,
        changeTextFn,
        onSubmit,
        goBack
      }
    }
  }
</script>

<style>
  .container {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
