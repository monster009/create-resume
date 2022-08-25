<template>
  <div class="a4-main">
    <el-button @click="downloadPdf()" v-loading.fullscreen.lock="fullscreenLoading" class="downloadBtn downloadBtn-black">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" opacity=".8" class="bi-cloud-download">
        <path
          d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
        <path
          d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
        </svg>
    </el-button>
    <div class="a4" ref="a4Dom" :style="`padding: ${form.ptpb}px ${form.prpl}px;`" >
      <div class="a4-container" id="a4Container" ref="a4Container">
        <div class="step" style="display: flex;justify-content: space-between;align-items: center;">
          <div>
            <div style="display: flex;align-items: flex-end;">
              <h1 class="name" :style="`font-size: ${form.nameSize}px`">{{state.step1Data.name}}</h1>
              <strong v-if="state.step1Data.JobObjective" class="Job-objective" :style="`font-size: ${form.h2Size}px; margin-left: 12px;`">{{state.step1Data.JobObjective}}</strong>
              <p class="sex" style="margin-left: 12px;">{{state.step1Data.sex}}</p>
              <p v-if="state.step1Data.birthday" class="birthday" style="margin-left: 12px;">
                {{form.showAge ? `${age}岁` : state.step1Data.birthday.substr(0,7)}}
              </p>
            </div>
            <div class="basic-info">
              <p v-if="state.step1Data.phoneNumber" class="phoneNumber" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`">电话：{{state.step1Data.phoneNumber}}</p>
              <p v-if="state.step1Data.email" class="email" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`">邮箱：{{state.step1Data.email}}</p>
              <p v-if="state.step1Data.wechat" class="wechat" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`">微信：{{state.step1Data.wechat}}</p>
              <p v-if="state.step1Data.address.length > 0" class="address" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`">居住：{{address}}</p>
              <p v-if="state.step1Data.github" class="github" :style="`font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`">博客：<a :href="state.step1Data.github" target="_blank">{{state.step1Data.github}}</a></p>
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
            <div :style="`display: flex; margin-bottom: 8px; justify-content: space-between; align-items: center; font-size: ${form.fontSize}px; line-height: ${form.lineHeight / 10};`" >
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
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
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
  </div>
  <canvas id="enlargeCanvas" :width="enlargeCanvasWidth" :height="enlargeCanvasHeight"></canvas>
</template>

<script>
  import { computed, watch, ref } from 'vue'
  import { EluiChinaAreaDht } from 'elui-china-area-dht'
  import html2canvas from 'html2canvas'
  import { jsPDF } from "jspdf"
  import { ElMessage } from 'element-plus'

  export default {
    name: 'DefaultStyle',
    props: [
      'state',
      'form',
      'changeIndex'
    ],
    setup (props) {
      const fullscreenLoading = ref(false)

      const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
      const address = props.state.step1Data.address.map(item => chinaData[item].label).join('')

      const age = computed(() => {
        return Math.floor((new Date().valueOf() - Date.parse(props.state.step1Data.birthday))/31536000000)
      })
      
      const a4Dom = ref()
      const a4Container = ref()

      watch(() => props.changeIndex, (newValue) => {
        const a4ContainerNode = document.getElementById('a4Container')
        let arr = a4ContainerNode.children
        const [ oldIndex, newIndex ] = [...newValue]
        const newA4 = a4ContainerNode.cloneNode(false)

        const newArr = [...arr]
        newArr.splice(oldIndex, 1)
        newArr.splice(newIndex, 0, arr[oldIndex])
        // arr = newArr
        for (let index = 0; index < newArr.length; index++) {
          const element = newArr[index];
          newA4.appendChild(element)
        }

        a4ContainerNode.remove()
        a4Dom.value.append(newA4)
      })

      /**
       * @description: css v-bind的数据
       * @return {css value}
       */
      const fontSize = computed(() => props.form.fontSize + 'px')
      const lineHeight = computed(() => props.form.lineHeight / 10 * props.form.fontSize  + 'px')
      
      const h2cOptions = {
        dpi: window.devicePixelRatio,
        backgroundColor: "#FFFFFF",
        useCORS: true,
        scale: 2,
        width: 694,
        height: 0
      }
      const enlargeCanvasWidth = computed(() => {
        return h2cOptions.width * h2cOptions.scale + (props.form.prpl * 2 * h2cOptions.scale)
      })
      const enlargeCanvasHeight = computed(() => {
        return enlargeCanvasWidth.value * 297 / 210
      })
      const ecContentHeight = computed(() => {
        return enlargeCanvasHeight.value - (props.form.ptpb * 2 * h2cOptions.scale)
      })
      
      const downloadPdf = () => {
        fullscreenLoading.value = true
        h2cOptions.width = a4Container.value.offsetWidth
        h2cOptions.height = a4Container.value.offsetHeight
        html2canvas(a4Container.value,h2cOptions).then(canvas => {
          try {
            //未生成pdf的html页面高度
            let leftHeight = canvas.height
            //针对单个页面偏移
            let position = 0

            const pdfOptions = {
              orientation: 'p',
              unit: 'mm',
              format: 'a4'
            }

            let pdf = new jsPDF(pdfOptions)
            const pdfAddPage = () => {
              const ctx = document.getElementById('enlargeCanvas').getContext('2d')
              ctx.fillStyle = '#ffffff'
              ctx.fillRect(0, 0, enlargeCanvasWidth.value, enlargeCanvasHeight.value)
              ctx.drawImage(canvas, 0, position, canvas.width, ecContentHeight.value, props.form.prpl * h2cOptions.scale, props.form.ptpb * h2cOptions.scale, canvas.width, ecContentHeight.value)
              pdf.addImage(document.getElementById('enlargeCanvas'), 'JPEG', 0, 0, 210, 297)
            }
            if (leftHeight < enlargeCanvasHeight.value) {
              pdfAddPage()
            } else {
              while (leftHeight > 0) {
                pdfAddPage()
                leftHeight -= ecContentHeight.value
                position += ecContentHeight.value
                //避免添加空白页
                if (leftHeight > 0) {
                  pdf.addPage();
                }
              }
            }

            const downloadPDF = (blobData, fileName) => {
              if (!blobData) return
              let blob = new Blob([blobData], {
                type: 'application/pdf'
              })
              const blobUrl = window.URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.download = fileName
              a.href = blobUrl
              a.target = '_blank'
              a.click()
              window.URL.revokeObjectURL(blobUrl)
            }
            downloadPDF(pdf.output('blob'), `${props.state.step1Data.name}的个人简历.pdf`)
          } catch (e) {
            ElMessage.error('失败了')
            console.log(e);
          } finally {
            fullscreenLoading.value = false
          }
        }).catch(() => {
          fullscreenLoading.value = false
        });
      }
      return {
        fullscreenLoading,
        a4Dom,
        address,
        age,
        fontSize,
        lineHeight,
        a4Container,
        enlargeCanvasWidth,
        enlargeCanvasHeight,
        downloadPdf
      }
    }
  }
</script>

<style scoped>
  .a4-main {
    max-width: 1620px;
    margin-bottom: 40px;
  }
  .a4-container {
    font-size: 16px;
    line-height: 1.3;
  }
  .avatar {
    margin-left: 40px;  
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
  .a4-container ul,
  .a4-container ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .a4-container li {
    position: relative;
    margin: 0;
    padding: 0 0 0 28px;
  }
  .a4-container p,
  .a4-container strong {
    font-size: v-bind(fontSize);
  }
  .a4-container ul>li::before {
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
  .a4-container ol {
    counter-reset: li;
  }
  .a4-container ol>li::before {
    content: counter(li)'.';
    counter-increment: li;
    position: absolute;
    top: calc(v-bind(lineHeight) / 2);
    left: 14px;
    font-size: v-bind(fontSize);
    transform: translate(-50%, -50%);
  }
</style>
