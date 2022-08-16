<template>
  <default-style :state="state" :form="form"></default-style>
</template>

<script>
  // import { ref } from 'vue'
  // import { decrypt } from '@/hooks/crypto'
  // import store from '@/store/index'
  import { useStore } from 'vuex'
  import DefaultStyle from '@/components/resume-style/DefaultStyle'
  import { computed } from 'vue-demi'
  export default {
    name: 'ShowResume',
    components: {
      DefaultStyle
    },
    props: [
      'form'
    ],
    setup () {
      const store = useStore()
      const state = computed(() => store.state)
      // const { state } = store
      // fetch('/刘显明的简历数据-ySJKO2JpYcR_DKjvgzDSf.json').then((response)=> {
      //   response.text().then((jsonContent) => {
      //       console.log(JSON.parse(decrypt(jsonContent)))
      //   })
      // })
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
    max-width: var(--a4-width);
    height: calc(var(--a4-width) * (297/210));
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    background-color: white;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, .3);
    word-break: break-all;
  }
  .a4:not(:last-child) {
    margin-bottom: 40px;
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
    height: 1492px;
  }
  @media (min-width: 576px) {
    .container {
      --a4-width: 420px !important;
    }
  }
  @media (min-width: 768px) {
    .container {
      --a4-width: 630px !important;
    }
  }
  @media (min-width: 992px) {
    .container {
      --a4-width: 840px !important;
    }
  }
</style>
