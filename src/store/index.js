import { createStore } from 'vuex'
import { nanoid } from 'nanoid'

const defaultData = {
  id: nanoid(),
  step1Data: {
    id: '',
    name: '',
    sex: '',
    birthday: '',
    phoneNumber: '',
    email: '',
    JobObjective: '',
    currentState: '',
    wechat: '',
    github: '',
    address: [],
    avatar: ''
  },
  step2Data: {
    id: '',
    title: '个人简介',
    text: ''
  },
  step3Data: {
    id: '',
    title: '工作经历',
    data: []
  },
  step4Data: {
    id: '',
    title: '教育背景',
    data: []
  },
  step5Data: {
    id: '',
    title: '项目经历',
    data: []
  },
  step6Data: []
}

export default createStore({
  state: {
    id: defaultData.id,
    step1Data: {
      id: '',
      name: '',
      sex: '',
      birthday: '',
      phoneNumber: '',
      email: '',
      JobObjective: '',
      currentState: '',
      wechat: '',
      github: '',
      address: [],
      avatar: ''
    },
    step2Data: {
      id: '',
      title: '个人简介',
      text: ''
    },
    step3Data: {
      id: '',
      title: '工作经历',
      data: []
    },
    step4Data: {
      id: '',
      title: '教育背景',
      data: []
    },
    step5Data: {
      id: '',
      title: '项目经历',
      data: []
    },
    step6Data: []
  },
  getters: {
    getResumeData: (state) => (sortNum) => {
      const sortData = new Array(state.step2Data, state.step3Data, state.step4Data, state.step5Data, ...state.step6Data)
      if (sortNum) {
        const oldSortData = [...sortData]
        const newSortData = sortNum.split(',').map(item => oldSortData[item - 1])
        return newSortData
      } else return sortData
    },
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
      Object.keys(state).forEach(i=>{state[i] = defaultData[i] || state[i]})
    }
  },
  actions: {
  },
  modules: {
  }
})
