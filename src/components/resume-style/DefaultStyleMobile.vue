<template>
  <div class="a4-container show" id="a4Container" ref="a4Container">
    <div class="step step1">
      <div>
        <div class="nameLine" >
          <h1 class="name">{{state.step1Data.name}}</h1>
          <strong v-if="state.step1Data.JobObjective" class="Job-objective">{{state.step1Data.JobObjective}}</strong>
          <p class="sex">{{state.step1Data.sex}}</p>
          <p v-if="state.step1Data.birthday" class="birthday">
            {{`${Math.floor((new Date().valueOf() - Date.parse(state.step1Data.birthday))/31536000000)}岁`}}
          </p>
        </div>
        <div class="basic-info">
          <p v-if="state.step1Data.phoneNumber" class="phoneNumber" >电话：{{state.step1Data.phoneNumber}}</p>
          <p v-if="state.step1Data.email" class="email" >邮箱：{{state.step1Data.email}}</p>
          <p v-if="state.step1Data.wechat" class="wechat" >微信：{{state.step1Data.wechat}}</p>
          <p v-if="state.step1Data.address.length > 0" class="address" >居住：{{address}}</p>
          <p v-if="state.step1Data.github" class="github" >博客：<a :href="state.step1Data.github" target="_blank">{{state.step1Data.github}}</a></p>
          <p v-if="state.step1Data.currentState" class="address" >当前状态：{{state.step1Data.currentState}}</p>
        </div>
      </div>
      <img  v-if="state.step1Data.avatar" :src="state.step1Data.avatar" class="avatar" width="120" alt="avatar">
    </div>
    <div class="step" name="moveStepDom" v-if="state.step2Data.text">
      <h2>
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
          <path
            d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 160c70.4 0 128 57.6 128 128s-57.6 128-128 128-128-57.6-128-128 57.6-128 128-128zM748.8 742.4c-23.467 32-117.333 100.267-236.8 100.267S298.667 774.4 275.2 742.4c-8.533-10.667-10.667-21.333-8.533-32C296.533 599.467 396.8 522.667 512 522.667s215.467 76.8 245.333 187.733c2.134 10.667 0 21.333-8.533 32z" />
          </svg>
        {{state.step2Data.title}}</h2>
      <div v-html="state.step2Data.text" ></div>
    </div>
    <div class="step" name="moveStepDom" v-if="state.step3Data.data.length > 0">
      <h2>
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
          <path
            d="M885.333 256h-160v-57.6c-2.133-40.533-36.266-70.4-76.8-70.4H349.867c-40.534 2.133-72.534 34.133-72.534 74.667V256H138.667C98.133 256 64 290.133 64 330.667V448h896V330.667C960 290.133 925.867 256 885.333 256zm-544-53.333c2.134-6.4 6.4-10.667 12.8-10.667h296.534c6.4 0 10.666 6.4 10.666 10.667V256h-320v-53.333zM672 576c0 40.533-34.133 74.667-74.667 74.667H426.667C386.133 650.667 352 616.533 352 576v-64H64v309.333C64 861.867 98.133 896 138.667 896h746.666C925.867 896 960 861.867 960 821.333V512H672v64z" />
        </svg>
        {{state.step3Data.title}}</h2>
      <div v-for="item in state.step3Data.data" :key="item.id" class="section">
        <div class="work-section">
          <div><h3>{{item.company}}</h3>&emsp;<span v-if="item.department">{{item.department}} | </span><span>{{item.job}}</span></div>
          <div style="flex-shrink: 0; margin-left: 16px; text-align: right;">{{item.inJob}} {{item.outJob ? `至 ${item.outJob}` : '至今'}}</div>
        </div>
        <div v-if="item.text" v-html="item.text" ></div>
      </div>
    </div>
    <div class="step" name="moveStepDom" v-if="state.step4Data.data.length > 0">
      <h2>
        <svg class="icon" viewBox="0 0 1026 1024" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
          <path
            d="M981.567 373.726v169.537l35.69 35.7-74.415 77.443-75.337-75.159 51.59-46.91V400.49C700.193 490.747 630.02 518.8 581.472 540.701c-48.548 21.9-83.506 21.79-131.652 3.647-48.154-18.147-277.364-101.8-391.179-156.27-75.948-36.34-80.837-59.388 1.305-90.231 107.2-40.726 284.385-105.946 378.305-141.542 55.594-22.49 84.996-34.768 136.027-9.121 91.12 37.626 299.33 115.758 402.863 158.506 90.125 39.33 29.536 52.268 4.425 68.036zM592.031 607.81c52.936-21.842 124.314-57.958 202.141-91.3v267.7S693.52 891.284 516.573 891.284c-190.558 0-293.49-107.074-293.49-107.074V534.337c60.068 24.473 127.521 45.53 209.152 73.473 50.312 17.9 114.154 24.09 159.796 0zm0 0" />
          </svg>
        {{state.step4Data.title}}</h2>
      <div v-for="item in state.step4Data.data" :key="item.id" class="section education-section">
        <div>
          <h3 style="display: inline-block;">{{item.college}}</h3><span v-if="item.major">-{{item.major}}</span><span>-{{item.education}}</span>
        </div>
        <div style="flex-shrink: 0; margin-left: 16px; text-align: right;">{{item.inDate}} 至 {{item.outDate}}</div>
      </div>
    </div>
    <div class="step" name="moveStepDom" v-if="state.step5Data.data.length > 0">
      <h2>
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
          <path
            d="M760.32 524.8h-307.2c-25.6 0-46.08-20.48-46.08-46.08s20.48-46.08 46.08-46.08h307.2c25.6 0 46.08 20.48 46.08 46.08s-20.48 46.08-46.08 46.08zm-524.8 135.68c0 28.16 20.48 48.64 48.64 48.64s48.64-23.04 48.64-48.64-20.48-48.64-48.64-48.64-48.64 20.48-48.64 48.64zm0-181.76c0 28.16 20.48 48.64 48.64 48.64s48.64-23.04 48.64-48.64-20.48-48.64-48.64-48.64-48.64 23.04-48.64 48.64zm524.8 227.84h-307.2c-25.6 0-46.08-20.48-46.08-46.08s20.48-46.08 46.08-46.08h307.2c25.6 0 46.08 20.48 46.08 46.08s-20.48 46.08-46.08 46.08zm209.92 148.48v-576c0-69.12-64-64-64-64H545.28c-20.48 0-33.28-10.24-33.28-10.24s-15.36-25.6-43.52-66.56c-25.6-46.08-58.88-38.4-58.88-38.4H130.56c-79.36 0-79.36 74.24-79.36 74.24v675.84c0 84.48 64 74.24 64 74.24h798.72c66.56 0 56.32-69.12 56.32-69.12z" />
          </svg>
        {{state.step5Data.title}}</h2>
      <div v-for="item in state.step5Data.data" :key="item.id" class="section">
        <div class="project-section">
          <h3>{{item.project}}</h3>
          <div style="flex-shrink: 0; margin-left: 16px; text-align: right;">{{item.inProject}} 至 {{item.outProject}}</div>
        </div>
        <div v-if="item.text">
          <!-- <h4>项目详情：</h4> -->
          <p v-html="item.text"></p>
        </div>
        <div v-if="item.link">
          <h4 style="display: inline-block;">项目链接：</h4><a :href="item.link" target="_blank">{{item.link}}</a>
        </div>
      </div>
    </div>
    <div v-for="item,index in state.step6Data" :id="`step${index + 6}`" class="step" name="moveStepDom" :key="item.id">
      <h2>
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
          <path
            d="M192 192v64h640v-64H192zm-64-64h768v192H128V128zm64 640v64h640v-64H192zm-64-64h768v192H128V704zm0-320h768v256H128V384z" />
          </svg>
        {{item.title}}</h2>
      <div v-if="item.text" v-html="item.text" style="display: flex; justify-content: space-between;" ></div>
    </div>
  </div>
</template>

<script>
  // import { computed, watch, ref } from 'vue'
  import EluiChinaAreaDht from 'elui-china-area-dht'

  export default {
    name: 'DefaultStyleMobile',
    props: [
      'state'
    ],
    setup (props) {
      const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
      const address = props.state.step1Data.address.map(item => chinaData[item].label).join('')
      return {
        address
      }
    }
  }
</script>

<style scoped>
  .a4-container.show {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
    text-align: left;
    font-size: 1rem;
    background-color: #fdfdfd;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    display: flex;
    align-items: center;
    font-size: 1.75rem;
    padding-bottom: .5rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #000;
  }
  h2>svg {
    margin-right: .5rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.2rem;
  }
  .step:not(:first-child) {
    margin-top: 1rem;
  }
  .section:not(:last-child) {
    margin-bottom: 1rem;
  }
  .step1 {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;
  }
  .name {
    width: 100%;
    text-align: center;
  }
  .nameLine {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: .5rem;
  }

  .nameLine>p {
    margin-left: .75rem;
  }

  .education-section>div:first-child {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 576px) {
    .a4-container.show {
      line-height: 1.5;
      font-size: 1.2rem;
    }
    .step:not(:first-child) {
      margin-top: 2rem;
    }
    .step1 {
      justify-content: space-between;
      flex-direction: row;
    }
    .nameLine {
      justify-content: flex-start;
    }
    .nameLine>* {
      line-height: 1;
    }
    .nameLine>:not(:first-child) {
      margin-left: .75rem;
    }
    .name {
      width: auto;
      text-align: left;
    }
    .basic-info {
      display: flex;
      flex-wrap: wrap;
    }
    .basic-info>p {
      margin-right: 1.5rem;
      margin-top: .375rem;
    }
    .education-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .project-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: .5rem;
    }
    h1 {
      font-size: 3rem;
    }
    h2 {
      font-size: 2rem;
    }
    h2>svg {
      margin-right: .75rem;
    }
    h3 {
      font-size: 1.75rem;
    }
    h4 {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 768px) {
    .a4-container.show {
      padding: 1.5rem;
      background-color: #ffffff;
    }
    .education-section>div:first-child {
      display: block;
    }
  }

  @media (min-width: 992px) {
    .a4-container.show {
      padding: 1rem 1.5rem;
      background-color: #ffffff;
    }
    .work-section {
      display: flex;
      margin-bottom: .5rem;
      justify-content: space-between;
      align-items: center;
    }
    .work-section h3 {
      display: inline-block;
    }
  }
</style>
<style>
  
  .a4-container.show p,
  .a4-container.show strong {
    font-size: 1rem;
  }
  .a4-container.show ul>li::before {
    width: calc(1rem / 3);
    height: calc(1rem / 3);
  }
  .a4-container.show ul>li::before,
  .a4-container.show ol>li::before {
    top: .65rem;
  }
  /* .a4-container.show li:not(:last-child) {
    margin-bottom: .25rem;
  } */
  @media (min-width: 576px) {
    .a4-container.show p,
    .a4-container.show strong {
      font-size: 1.2rem;
    }
    .a4-container.show ul>li::before {
      width: calc(1.2rem / 3);
      height: calc(1.2rem / 3);
    }
    .a4-container.show ul>li::before,
    .a4-container.show ol>li::before {
      top: .875rem;
    }
    .a4-container.show li:not(:last-child) {
      margin-bottom: 0;
    }
  }
</style>
