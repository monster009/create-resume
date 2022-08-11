<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  p,
  blockquote,
  /* structural elements 结构元素 */

  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  /* list elements 列表元素 */

  pre,
  /* text formatting elements 文本格式元素 */
  fieldset,
  lengend,
  button,
  input,
  textarea,
  /* form elements 表单元素 */

  th,
  td {
    /* table elements 表格元素 */
    margin: 0;
    padding: 0;
  }

  a:-webkit-any-link {
    color: inherit;
    text-decoration: none;
  }

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