# create-resume

## 项目说明
本网站为为个人性质的简历编辑导出网站，没有任何网络接口请求，不会获取到用户的任何数据，页面加载完成后断网也可继续操作，绝对安全私密，尽可放心使用。

**桌面端：**可使用该网站全部功能（包括但不限于：编辑简历文本、保存个人简历数据到本地、修改简历字号行高间距排序、简历导出pdf文件）。

**移动端：**只能使用编辑页面的功能，不太兼容导出pdf的功能，(移动端可使用编辑页面导出您的简历数据之后,再在桌面端导入数据再导出pdf。)

如有建议或反馈请联系我：<a style="color: #409EFF;text-decoration: underline;" href="mailto:32413082@qq.com">32413082@qq.com</a>

## 项目设置
```
yarn install
```

### 调试
```
yarn serve
```

### 打包
```
yarn build
```

## 项目依赖

### tiptap

富文本编辑器，详见（https://tiptap.dev/installation/vue3）

### crypto-js

数据加密解密，详见（https://www.npmjs.com/package/crypto-js）

### element-plus

UI框架，详见（https://element-plus.gitee.io/zh-CN/component/button.html）

### elui-china-area-dht

基于vue3和element-plus的省市区级联组件，详见（https://www.npmjs.com/package/elui-china-area-dht）

### html2canvas

HTML Dom转canvas画布，搭配jspdf导出pdf文件，详见（https://html2canvas.hertzen.com/documentation）

### jspdf

一个用 JavaScript 生成 PDF 的库，详见（https://www.npmjs.com/package/jspdf）

### nanoid

唯一的 JavaScript 字符串ID生成器，详见（https://github.com/ai/nanoid/blob/HEAD/README.zh-CN.md）

### Vue Router/Vuex

Vue全家桶，详见（https://v3.cn.vuejs.org/）

