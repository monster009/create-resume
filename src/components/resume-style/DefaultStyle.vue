<template>
  <div ref="container" class="container">
    <div class="a4" :style="`padding: ${form.ptpb}px ${form.prpl}px;`">
      <div id="step1">
        <h1 class="name">{{state.step1Data.name}}</h1>
        <div class="sex">{{state.step1Data.sex}}</div>
        <div v-if="state.step1Data.birthday" class="birthday">
          {{form.showAge ? `${age}岁` : state.step1Data.birthday.substr(0,7)}}
        </div>
        <div v-if="state.step1Data.phoneNumber" class="phoneNumber">电话：{{state.step1Data.phoneNumber}}</div>
        <div v-if="state.step1Data.email" class="email">邮箱：{{state.step1Data.email}}</div>
        <div v-if="state.step1Data.wechat" class="wechat">微信：{{state.step1Data.wechat}}</div>
        <div v-if="state.step1Data.address.length > 0" class="address">居住：{{address}}</div>
        <div v-if="state.step1Data.currentState" class="address">当前状态：{{state.step1Data.currentState}}</div>
        <picture v-if="state.step1Data.avatar">
          <img :src="state.step1Data.avatar" width="120" alt="avatar">
        </picture>
        <div></div>
      </div>
      <div id="step2" v-if="state.step2Data">
        <h2>个人简介</h2>
        <div v-html="state.step2Data"></div>
      </div>
      <div id="step3" v-if="state.step3Data.length > 0">
        <h2>工作经历</h2>
        <div v-for="item in state.step3Data" :key="item.id">
          <div style="display: flex;justify-content:space-between;">
            <div><strong>{{item.company}}</strong><span v-if="item.department">{{item.department}}</span><span>{{item.job}}</span></div>
            <div>{{item.inJob}} {{item.outJob ? `至 ${item.outJob}` : '至今'}}</div>
          </div>
          <div v-if="item.text" v-html="item.text"></div>
        </div>
      </div>
      <div id="step4" v-if="state.step4Data.length > 0">
        <h2>教育背景</h2>
        <div v-for="item in state.step4Data" :key="item.id" style="display: flex;justify-content:space-between;">
          <div>
            <strong>{{item.college}}</strong><span v-if="item.major">-{{item.major}}</span><span>-{{item.education}}</span>
          </div>
          <div>{{item.inDate}} 至 {{item.outDate}}</div>
        </div>
      </div>
      <div id="step5" v-if="state.step5Data.length > 0">
        <h2>项目经历</h2>
        <div v-for="item in state.step5Data" :key="item.id">
          <div style="display: flex; justify-content:space-between;">
            <h3>{{item.project}}</h3>
            <div>{{item.inProject}} 至 {{item.outProject}}</div>
          </div>
          <div v-if="item.text" v-html="item.text"></div>
          <div v-if="item.link">项目链接：{{item.link}}</div>
        </div>
      </div>
      <div v-if="state.step6Data.length > 0">
        <div v-for="item,index in state.step6Data" :id="`step${index + 6}`" :key="item.id">
          <h2>{{item.title}}</h2>
          <div v-if="item.text" v-html="item.text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { onMounted, onUpdated, ref } from 'vue'
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
      console.log(props.state);
      const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
      const address = props.state.step1Data.address.map(item => chinaData[item].label).join('')
      const age = ref()
      age.value = Math.floor((new Date().valueOf() - Date.parse(props.state.step1Data.birthday))/31536000000)
      const container = ref()
      onMounted(() => {
        // a4
        // createDom(container.value, 'div', '', 'a4', `padding: ${props.form.ptpb}px ${props.form.prpl}px;`)
      })
      onUpdated(() => {
        console.log('aaa');
      })
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

</style>
