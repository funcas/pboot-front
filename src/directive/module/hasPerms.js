import { oneOf } from '@/libs/tools'
import store from '@/store'

export default {
  inserted: (el, binding, vnode) => {
    let code = binding.value.code
    let perms = store.state.user.access
    if (!oneOf(code, perms)) {
      el.parentNode.removeChild(el)
    }
  }
}
