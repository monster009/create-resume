import { createStore } from 'vuex'
import { nanoid } from 'nanoid'
// import { EluiChinaAreaDht } from 'elui-china-area-dht'
// // const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
// // const getChinaData = (arr) => {
// //   if (Array.isArray(arr) && arr.length > 0) {
// //     return arr.map(item => chinaData[item])
// //   }
// // }

export default createStore({
  state: {
    id: nanoid(),
    step1Data: {
      name: '',
      sex: '',
      birthday: '',
      phoneNumber: '',
      email: '',
      wechat: '',
      address: [],
      currentState: '',
      avatar: '',
    },
    step2Data: '',
    step3Data: [],
    step4Data: [],
    step5Data: [],
    step6Data: []
  },
  getters: {
  },
  mutations: {
    commitStep1Data (state, payload) {
      state.step1Data = payload
    },
    commitStep2Data (state, payload) {
      state.step2Data = payload
    },
    commitStep3Data (state, payload) {
      state.step3Data = payload
    },
    commitStep4Data (state, payload) {
      state.step4Data = payload
    },
    commitStep5Data (state, payload) {
      state.step5Data = payload
    },
    commitStep6Data (state, payload) {
      state.step6Data = payload
    },
    commitAllData (state, payload) {
      Object.keys(state).forEach(i=>{state[i] = payload[i] || state[i]})
    },
    resetData (state) {
      Object.keys(state).forEach(i=>{state[i] = ''})
    }
  },
  actions: {
  },
  modules: {
  }
})
