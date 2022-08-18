<template>
  <div ref="container" class="container">
    <div class="a4" :style="`padding: ${form.ptpb}px ${form.prpl}px;`">
      <div id="step1" class="step" >
        <div>
          <div style="display: flex;align-items: flex-end;">
            <h1 class="name" :style="`font-size: ${form.nameSize}px`">{{state.step1Data.name}}</h1>
            <p class="sex" style="margin-left: 16px;">{{state.step1Data.sex}}</p>
            <p v-if="state.step1Data.birthday" class="birthday" style="margin-left: 16px;">
              {{form.showAge ? `${age}岁` : state.step1Data.birthday.substr(0,7)}}
            </p>
          </div>
          <div class="basic-info">
            <p v-if="state.step1Data.phoneNumber" class="phoneNumber" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`">电话：{{state.step1Data.phoneNumber}}</p>
            <p v-if="state.step1Data.email" class="email" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`">邮箱：{{state.step1Data.email}}</p>
            <p v-if="state.step1Data.wechat" class="wechat" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`">微信：{{state.step1Data.wechat}}</p>
            <p v-if="state.step1Data.address.length > 0" class="address" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`">居住：{{address}}</p>
            <p v-if="state.step1Data.currentState" class="address" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`">当前状态：{{state.step1Data.currentState}}</p>
          </div>
        </div>
        <img  v-if="state.step1Data.avatar" :src="state.step1Data.avatar" class="avatar" width="120" alt="avatar">
      </div>
      <div id="step2" class="step" :style="`margin-top: ${form.moduleMt}px;`" v-if="state.step2Data">
        <h2 :style="`font-size: ${form.h2Size}px; margin-bottom: ${form.h2Mb}px;`">个人简介</h2>
        <div v-html="state.step2Data" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`"></div>
      </div>
      <div id="step3" class="step" :style="`margin-top: ${form.moduleMt}px;`" v-if="state.step3Data.length > 0">
        <h2 :style="`font-size: ${form.h2Size}px; margin-bottom: ${form.h2Mb}px;`">工作经历</h2>
        <div v-for="item,index in state.step3Data" :key="item.id" :style="`margin-top: ${index ? form.nodeMt : 0}px;`">
          <div :style="`display: flex; justify-content: space-between; align-items: center; font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`" >
            <div><h3 :style="`display: inline-block; font-size: ${form.h3Size}px;`">{{item.company}}</h3>&emsp;<span v-if="item.department">{{item.department}} | </span><span>{{item.job}}</span></div>
            <div>{{item.inJob}} {{item.outJob ? `至 ${item.outJob}` : '至今'}}</div>
          </div>
          <div v-if="item.text" v-html="item.text" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`"></div>
        </div>
      </div>
      <div id="step4" class="step" :style="`margin-top: ${form.moduleMt}px;`" v-if="state.step4Data.length > 0">
        <h2 :style="`font-size: ${form.h2Size}px; margin-bottom: ${form.h2Mb}px;`">教育背景</h2>
        <div v-for="item,index in state.step4Data" :key="item.id" :style="`display: flex; justify-content: space-between; align-items: center; font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10}; margin-top: ${index ? form.nodeMt : 0}px;`" >
          <div>
            <h3 :style="`display: inline-block; font-size: ${form.h3Size}px;`">{{item.college}}</h3><span v-if="item.major">-{{item.major}}</span><span>-{{item.education}}</span>
          </div>
          <div>{{item.inDate}} 至 {{item.outDate}}</div>
        </div>
      </div>
      <div id="step5" class="step" :style="`margin-top: ${form.moduleMt}px;`" v-if="state.step5Data.length > 0">
        <h2 :style="`font-size: ${form.h2Size}px; margin-bottom: ${form.h2Mb}px;`">项目经历</h2>
        <div v-for="item,index in state.step5Data" :key="item.id" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10}; margin-top: ${index ? form.nodeMt : 0}px;`" >
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 :style="`font-size: ${form.h3Size}px;`">{{item.project}}</h3>
            <div>{{item.inProject}} 至 {{item.outProject}}</div>
          </div>
          <div v-if="item.text">
            <h4 :style="`font-size: ${form.h4Size}px;`">项目详情：</h4>
            <p v-html="item.text"></p>
          </div>
          <div v-if="item.link">
            <h4 :style="`display: inline-block; font-size: ${form.h4Size}px;`">项目链接：</h4><a :href="item.link" target="_blank">{{item.link}}</a>
          </div>
        </div>
      </div>
      <div v-if="state.step6Data.length > 0">
        <div v-for="item,index in state.step6Data" :id="`step${index + 6}`" class="step" :style="`margin-top: ${form.moduleMt}px;`" :key="item.id">
          <h2 :style="`font-size: ${form.h2Size}px; margin-bottom: ${form.h2Mb}px;`">{{item.title}}</h2>
          <div v-if="item.text" v-html="item.text" :style="`display: flex; justify-content: space-between; font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`" ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { computed, onMounted, onUpdated, ref } from 'vue'
  import { EluiChinaAreaDht } from 'elui-china-area-dht'
  // import createDom from '@/hooks/createDom'
  // import { decrypt } from '@/hooks/crypto'
  export default {
    name: 'ShowResume',
    props: [
      'state',
      'form'
    ],
    setup (props) {
      const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
      const address = props.state.step1Data.address.map(item => chinaData[item].label).join('')
      const age = computed(() => {
        return Math.floor((new Date().valueOf() - Date.parse(props.state.step1Data.birthday))/31536000000)
      })
      const container = ref()
      onMounted(() => {
        // a4
        // createDom(container.value, 'div', '', 'a4', `padding: ${props.form.ptpb}px ${props.form.prpl}px;`)
      })
      onUpdated(() => {
        // console.log('aaa');
      })
      // watch(props.form.fontMb, (newValue) => {
        
      // })
      // container.
      return {
        container,
        address,
        age
      }
    }
  }
</script>

<style scoped>
  .a4 {
    font-size: 16px;
    line-height: 1.3;
  }
  #step1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .avatar {
    margin-left: 100px;  
  }
  .basic-info {
    display: flex;
    flex-wrap: wrap;
  }
  .basic-info>p {
    margin-right: 24px;
    margin-top: 6px;
  }
  .step>h2 {
    padding-bottom: 8px;
    border-bottom: 2px solid #000000;
  }
</style>
<style>
  .a4 ul,
  .a4 ol {
    margin: 0;
    padding: 0 0 0 24px;
  }
  .a4 li {
    margin: 0;
    padding: 0;
  }
</style>
