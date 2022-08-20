<template>
  <div ref="container" class="a4-container">
    <el-button class="downloadBtn downloadBtn-black">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" opacity=".8" class="bi-cloud-download">
        <path
          d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
        <path
          d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
        </svg>
    </el-button>
    <div class="a4" id="a4Dom" :style="`padding: ${form.ptpb}px ${form.prpl}px;`" >
      <div class="step" style="display: flex;justify-content: space-between;align-items: center;">
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
      <div class="step" name="moveStepDom" :style="`margin-top: ${form.moduleMt}px;`" v-if="state.step2Data.text">
        <h2 :style="`font-size: ${form.h2Size}px; margin-bottom: ${form.h2Mb}px;`">{{state.step2Data.title}}</h2>
        <div v-html="state.step2Data.text" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`"></div>
      </div>
      <div class="step" name="moveStepDom" :style="`margin-top: ${form.moduleMt}px;`" v-if="state.step3Data.data.length > 0">
        <h2 :style="`font-size: ${form.h2Size}px; margin-bottom: ${form.h2Mb}px;`">{{state.step3Data.title}}</h2>
        <div v-for="item,index in state.step3Data.data" :key="item.id" :style="`margin-top: ${index ? form.nodeMt : 0}px;`">
          <div :style="`display: flex; justify-content: space-between; align-items: center; font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`" >
            <div><h3 :style="`display: inline-block; font-size: ${form.h3Size}px;`">{{item.company}}</h3>&emsp;<span v-if="item.department">{{item.department}} | </span><span>{{item.job}}</span></div>
            <div style="flex-shrink: 0; margin-left: 16px;">{{item.inJob}} {{item.outJob ? `至 ${item.outJob}` : '至今'}}</div>
          </div>
          <div v-if="item.text" v-html="item.text" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`"></div>
        </div>
      </div>
      <div class="step" name="moveStepDom" :style="`margin-top: ${form.moduleMt}px;`" v-if="state.step4Data.data.length > 0">
        <h2 :style="`font-size: ${form.h2Size}px; margin-bottom: ${form.h2Mb}px;`">{{state.step4Data.title}}</h2>
        <div v-for="item,index in state.step4Data.data" :key="item.id" :style="`display: flex; justify-content: space-between; align-items: center; font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10}; margin-top: ${index ? form.nodeMt : 0}px;`" >
          <div>
            <h3 :style="`display: inline-block; font-size: ${form.h3Size}px;`">{{item.college}}</h3><span v-if="item.major">-{{item.major}}</span><span>-{{item.education}}</span>
          </div>
          <div style="flex-shrink: 0; margin-left: 16px;">{{item.inDate}} 至 {{item.outDate}}</div>
        </div>
      </div>
      <div class="step" name="moveStepDom" :style="`margin-top: ${form.moduleMt}px;`" v-if="state.step5Data.data.length > 0">
        <h2 :style="`font-size: ${form.h2Size}px; margin-bottom: ${form.h2Mb}px;`">{{state.step5Data.title}}</h2>
        <div v-for="item,index in state.step5Data.data" :key="item.id" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10}; margin-top: ${index ? form.nodeMt : 0}px;`" >
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 :style="`font-size: ${form.h3Size}px;`">{{item.project}}</h3>
            <div style="flex-shrink: 0; margin-left: 16px;">{{item.inProject}} 至 {{item.outProject}}</div>
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
      <div v-for="item,index in state.step6Data" :id="`step${index + 6}`" class="step" name="moveStepDom" :style="`margin-top: ${form.moduleMt}px;`" :key="item.id">
        <h2 :style="`font-size: ${form.h2Size}px; margin-bottom: ${form.h2Mb}px;`">{{item.title}}</h2>
        <div v-if="item.text" v-html="item.text" :style="`display: flex; justify-content: space-between; font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`" ></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { computed, watch, ref } from 'vue'
  import { EluiChinaAreaDht } from 'elui-china-area-dht'
  // import createDom from '@/hooks/createDom'
  // import { decrypt } from '@/hooks/crypto'
  export default {
    name: 'ShowResume',
    props: [
      'state',
      'form',
      'changeIndex'
    ],
    setup (props) {
      const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
      const address = props.state.step1Data.address.map(item => chinaData[item].label).join('')
      const age = computed(() => {
        return Math.floor((new Date().valueOf() - Date.parse(props.state.step1Data.birthday))/31536000000)
      })
      const container = ref()

      watch(() => props.changeIndex, (newValue) => {
        const a4Dom = document.getElementById('a4Dom')
        let arr = a4Dom.children
        const [ oldIndex, newIndex ] = [...newValue]
        const newA4 = a4Dom.cloneNode(false)

        const newArr = [...arr]
        newArr.splice(oldIndex, 1)
        newArr.splice(newIndex, 0, arr[oldIndex])
        // arr = newArr
        for (let index = 0; index < newArr.length; index++) {
          const element = newArr[index];
          newA4.appendChild(element)
        }

        a4Dom.remove()
        container.value.append(newA4)
      })

      /**
       * @description: css v-bind的数据
       * @return {css value}
       */
      const fontSize = computed(() => props.form.fontSize + 'px')
      const lineHeight = computed(() => props.form.lineHeight / 10 * props.form.fontSize  + 'px')

      return {
        container,
        address,
        age,
        fontSize,
        lineHeight
      }
    }
  }
</script>

<style scoped>
  .a4-container {
    max-width: 1620px;
    margin-bottom: 40px;
  }
  .a4 {
    font-size: 16px;
    line-height: 1.3;
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
  /**
   * @description: 按钮样式
   */
  .downloadBtn {
    position: fixed;
    display: flex;
    top: 12.5px;
    right: 20px;
    width: 40px;
    height: 40px;
    border: none;
    outline: none;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #ffffff;
    z-index: 11;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  .downloadBtn .bi-cloud-download {
    width: 24px;
    height: 24px;
    color: #323639;
  }
  .downloadBtn:link,
  .downloadBtn:visited {
    text-transform: uppercase;
    text-decoration: none;
    padding: 40px;
    display: inline-block;
    border-radius: 50%;
    transition: all .2s;
    position: absolute;
  }

  .downloadBtn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .downloadBtn:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  .downloadBtn-black {
    background-color: #ffffff;
    color: #323639;
  }

  .downloadBtn::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all .4s;
  }

  .downloadBtn-black::after {
    background-color: #ffffff;
  }

  .downloadBtn:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
  }

  .downloadBtn-animated {
    animation: moveInBottom 5s ease-out;
    animation-fill-mode: backwards;
  }

  @keyframes moveInBottom {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }


  @media (min-width: 1140px) {
    .downloadBtn {
      top: unset;
      right: 40px;
      bottom: 40px;
      width: 60px;
      height: 60px;
      background-color: #323639;
    }
    .downloadBtn .bi-cloud-download {
      width: 32px;
      height: 32px;
      color: #ffffff;
    }
    .downloadBtn-black {
      background-color: #323639;
      color: #fff;
    }
    .downloadBtn-black::after {
      background-color: #323639;
    }
  }
</style>
<style>
  .a4 ul,
  .a4 ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .a4 li {
    position: relative;
    margin: 0;
    padding: 0 0 0 28px;
  }
  .a4 p {
    font-size: inherit;
  }
  .a4 ul>li::before {
    content: '';
    position: absolute;
    width: calc(v-bind(fontSize) / 3);
    height: calc(v-bind(fontSize) / 3);
    left: 14px;
    top: calc(v-bind(lineHeight) / 2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: #000000;
  }
  .a4 ol {
    counter-reset: li;
  }
  .a4 ol>li::before {
    content: counter(li)'.';
    counter-increment: li;
    position: absolute;
    top: calc(v-bind(lineHeight) / 2);
    left: 14px;
    font-size: v-bind(fontSize);
    transform: translate(-50%, -50%);
  }
</style>
