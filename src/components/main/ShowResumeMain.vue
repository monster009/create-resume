<template>
  <el-scrollbar>
    <default-style-mobile :state="state"></default-style-mobile>
  </el-scrollbar>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed } from 'vue'
  import DefaultStyleMobile from '../resume-style/DefaultStyleMobile.vue'

  export default {
    name: 'showResumeMain',
    components: {
      DefaultStyleMobile
    },
    props: [
      'form'
    ],
    setup () {
      const store = useStore()
      const state = computed(() => store.state)
      return {
        state
      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px;
    --a4-width: 210px;
  }
</style>

