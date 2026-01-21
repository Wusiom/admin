<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="form"
      :rules="rules"
      ref="formRef"
      @keyup.enter="handleLogin"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select" effect="light"></lang-select>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <SvgIcon icon="user" />
        </span>
        <el-input
          v-model="form.username"
          placeholder="username"
          name="username"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <SvgIcon icon="password" />
        </span>
        <el-input
          v-model="form.password"
          placeholder="password"
          name="password"
          :type="pswType"
        />
        <span class="show-pwd" @click="changePswType">
          <SvgIcon :icon="pswType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validatePassword } from './rules'
import useUserStore from '@/store/user'
import router from '@/router'
import LangSelect from '@/components/LangSelect/index.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const userStore = useUserStore()
const form = ref({
  username: '',
  password: ''
})
const rules = ref({
  username: [
    { required: true, message: t('msg.login.usernameRule'), trigger: 'blur' }
  ],
  password: [{ required: true, validator: validatePassword(), trigger: 'blur' }]
})
const formRef = ref(null)

const pswType = ref('password')
const changePswType = () => {
  if (pswType.value === 'password') {
    pswType.value = 'text'
  } else {
    pswType.value = 'password'
  }
}
const loading = ref(false)
const handleLogin = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    userStore
      .login(form.value)
      .then((res) => {
        loading.value = false
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      .el-input__wrapper {
        width: 100%;
        background: transparent;
        border: 0px;
        box-shadow: none !important;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        .el-input__inner {
          color: #fff;
        }
      }

      .el-input__wrapper.is-focus {
        box-shadow: none !important;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
