<template>
  <el-scrollbar>
    <default-style :state="state" :form="form" :changeIndex="changeIndex"></default-style>
  </el-scrollbar>
</template>

<script>
  import { useStore } from 'vuex'
  import DefaultStyle from '@/components/resume-style/DefaultStyle'
  import { computed } from 'vue'
  export default {
    name: 'ExportResumeMain',
    components: {
      DefaultStyle
    },
    props: [
      'form',
      'changeIndex'
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

<style>
  .a4 {
    box-sizing: border-box;
    width: 100%;
    max-width: 794px;
    min-height: calc(794px * (297/210));
    margin: 0 auto;
    text-align: left;
    background-color: #ffffff;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, .3);
  }
  #ampn, canvas {
    position: absolute;
    right: 9999px;
    bottom: 9999px;
  }
  #ampn .a4 {
    /* 宽度过高ios会失效 */  
    width: 1050px;
    max-width: unset;
    box-shadow: unset;
  }
</style>
