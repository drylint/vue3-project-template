
import { Toast } from 'vant'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: Toast
  }
}
