import SvgIcon from '@/components/SvgIcon/index.vue'

const requireContext = require.context('./svg', false, /\.svg$/)

requireContext.keys().forEach(svg => requireContext(svg))
export default (app) => {
  app.component('SvgIcon', SvgIcon)
}
