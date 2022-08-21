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