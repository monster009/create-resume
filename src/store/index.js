import { createStore } from 'vuex'
// import { EluiChinaAreaDht } from 'elui-china-area-dht'
// // const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
// // const getChinaData = (arr) => {
// //   if (Array.isArray(arr) && arr.length > 0) {
// //     return arr.map(item => chinaData[item])
// //   }
// // }

export default createStore({
  state: {
    step1Data: {
      name: '',
      sex: '',
      birthday: '',
      showAge: false,
      phoneNumber: '',
      email: '',
      wechat: '',
      address: [],
      avatar: ''
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
      Object.keys(state).forEach(i=>{state[i] = payload[i] || state[i]});
    }
  },
  actions: {
  },
  modules: {
  }
})
