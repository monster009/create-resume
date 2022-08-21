<template>
  <div class="container">
    <step :msg="'step1'"></step>
    <el-form :model="form" ref="formRef" :rules="rules" size="large" >
      <div class="formRow">
        <el-form-item label="姓名" prop="name" >
          <el-input v-model="form.name" placeholder="姓名" clearable />
        </el-form-item>
        <el-form-item label="性别" prop="sex" >
          <el-select v-model="form.sex" placeholder="性别">
            <el-option value="男" />
            <el-option value="女" />
          </el-select>
        </el-form-item>
      </div>
      <div class="formRow">
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input v-model.number="form.phoneNumber" placeholder="手机号码" clearable />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="邮箱" clearable />
        </el-form-item>
      </div>
      <div class="formRow">
        <el-form-item label="微信" prop="wechat">
          <el-input v-model="form.wechat" placeholder="微信" clearable />
        </el-form-item>
        <el-form-item label="出生日期">
          <!-- 这个标签有2个警告 -->
          <el-date-picker v-model="form.birthday" type="date" placeholder="出生日期" />
        </el-form-item>
      </div>
      <el-form-item label="博客链接">
          <el-input v-model="form.github" placeholder="github / 掘金 / csdn ..." clearable />
        </el-form-item>
      <el-form-item label="居住地">
        <elui-china-area-dht v-model="form.address" placeholder="详细地址" clearable ></elui-china-area-dht>
      </el-form-item>
      <el-form-item label="当前状态">
        <el-select v-model="form.currentState" placeholder="在职/离职" clearable>
          <el-option value="在职-一个月内到岗" />
          <el-option value="在职-两周内到岗" />
          <el-option value="在职-一周内到岗" />
          <el-option value="在职-随时到岗" />
          <el-option value="离职-一个月内到岗" />
          <el-option value="离职-两周内到岗" />
          <el-option value="离职-一周内到岗" />
          <el-option value="离职-随时到岗" />
        </el-select>
      </el-form-item>
      <el-form-item label="个人照片">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :limit="1"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor"
                d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z">
              </path>
            </svg>
          </el-icon>
          <i class="remove-avatar-icon" v-if="form.avatar" @click.stop="removeAvata" style="position: absolute;width：24px;height:24px; top:0;right:0;transform: translate(50%,-50%)">
            <svg viewBox="0 0 1024 1024" width="24" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor"
                d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z">
              </path>
              <path fill="currentColor"
                d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z">
              </path>
            </svg>
          </i>
        </el-upload>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="onSubmit(formRef)">下一步</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { onMounted, reactive, ref } from 'vue'
  import Step from '../ui/Step.vue'
  import 'element-plus/es/components/message/style/css'
  import 'element-plus/es/components/cascader/style/css'
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { EluiChinaAreaDht } from 'elui-china-area-dht'
  import { nanoid } from 'nanoid'
  // const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat

  export default {
    name: 'BasicPage',
    components: {
        Step,
        EluiChinaAreaDht
    },
    setup (props, { emit }) {
      const router = useRouter()
      const store = useStore()
      const step1Data = store.state.step1Data
      const formRef = ref()

      const form = reactive({
        id: '',
        name: '',
        sex: '',
        birthday: '',
        phoneNumber: '',
        email: '',
        wechat: '',
        github: '',
        address: [],
        currentState: '',
        avatar:  ''
      })

      onMounted(() => {
        Object.keys(form).forEach(i=>{form[i] = step1Data[i] || form[i]})
        if (!form.id) form.id = nanoid()
      })


      const rules = reactive({
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择您的性别' }],
        phoneNumber: [
          { pattern: /^1[3-9]\d{9}$/, message: '手机号为11位阿拉伯数字'}
        ],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        wechat: [{ pattern: /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/, message: '微信号格式不正确' }]
      })

      const handleAvatarSuccess = (response) => {
        if ((response.raw.type === 'image/jpeg' || response.raw.type === 'image/png') && response.raw.size / 1024 / 1024 <= 1) {
          // 文件转base64
          const reader = new FileReader()
          reader.readAsDataURL(response.raw)
          reader.onload = (e) => {
            form.avatar = e.target.result
          }
          // form.avatar = URL.createObjectURL(response.raw)
        }
      }

      const beforeAvatarUpload = (rawFile) => {
        if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
          ElMessage.error('照片必须是jpg/png格式的')
          return false
        } else if (rawFile.size / 1024 / 1024 > 2) {
          ElMessage.error('照片不能超过2Mb，请更换图片或压缩图片')
          return false
        }
        return true
      }

      const removeAvata = () => {
        form.avatar = ''
      }

      const onSubmit = (formEl) => {
        if (!formEl) return
        formEl.validate((valid) => {
          if (valid) {
            store.commit('commitStep1Data', form)
            router.push('/edit/step2')
          } else {
            emit('formError')
            return false
          }
        })
      }

      const goBack = () => {
        router.push('/')
      }

      return {
        formRef,
        form,
        rules,
        handleAvatarSuccess,
        beforeAvatarUpload,
        removeAvata,
        onSubmit,
        goBack
      }
    }
  }
</script>

<style scoped>
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    transition: var(--el-transition-duration-fast);
  }
  .avatar-uploader .el-upload .avatar {
    width: 178px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }

  .remove-avatar-icon svg {
    color: var(--el-border-color-darker);
  }

  .remove-avatar-icon:hover svg {
    color: var(--el-color-primary);
  }

  .el-form-item--large .el-form-item__label {
    width: 88px;
  }
  
  .el-select--large, .el-cascader--large, .el-date-editor.el-input {
    width: 100%;
  }
  .el-input--large .el-input__wrapper {
    width: calc(100% - 30px);
  }
  
  @media (max-width: 767.98px) {
    .el-form-item--large .el-form-item__label {
      width: 80px;
    }
  }
  @media (min-width: 768px) {
    .formRow {
      display: flex;
      align-items: center;
    }
    .formRow>.el-form-item {
      width: 50%;
    }
  }
</style>
