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


  /**
   * @description: fadeIn style
   * @return {*}
   */
   [data-fadeIn] {
    opacity: 0;
   }
  .fade-in {
    animation-fill-mode: forwards;
    animation: fadeInUp 1s 0.2s ease both;
  }
  .fade-in[fade-in-up] {
    animation-name: fadeInUp;
  }
  .fade-in[fade-in-down] {
    animation-name: fadeInDown;
  }
  .fade-in[fade-in-right] {
    animation-name: fadeInRight;
  }
  .fade-in[fade-in-left] {
    animation-name: fadeInLeft;
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translateY(-40px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeInRight {
    0% {
      opacity: 0;
      transform: translateX(-40px);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: translateX(40px);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>