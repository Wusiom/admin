import { useI18n } from 'vue-i18n'
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      const { t } = useI18n()
      callback(new Error(t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
