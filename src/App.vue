<!--
 * @Author: monster009 32413082@qq.com
 * @Date: 2022-07-08 16:55:57
 * @LastEditors: monster009 32413082@qq.com
 * @LastEditTime: 2022-08-19 22:36:06
 * @FilePath: \create-resume\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  mounted: () => {
    document.getElementById('app-cockpit-loading').remove();
  }
}
</script>

<style>
  #app {
    font-family: '微软雅黑', var(--el-font-family);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--el-text-color-primary);
    /* background-color: var(--el-color-primary); */
  }

  @media (max-width: 575.98px) {
    main.el-main {
      --el-main-padding: 12px;
    }
  }
</style>