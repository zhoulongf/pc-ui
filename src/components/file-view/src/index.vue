<template>
  <div class="container">
    <div v-show="loading" class="well loading">正在加载中，请耐心等待...</div>
    <div v-show="!loading" class="well" ref="output"></div>
  </div>
</template>
<script>
import { renderBuffer } from "./utils"
export default {
  name: 'CmFileView',
  props: {
    fileType: {
      type: String,
      default: ''
    },
    fileSrc: {
      type: String,
      default: ''
    },
    fileBlob: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      // 上个渲染实例
      last: null,
      loading: false
    }
  },
  mounted() {
    this.getFile(this.fileSrc, this.fileBlob)
  },
  methods: {
    displayResult(buffer) {
      // if (!this.fileSrc && Object.keys(this.fileBlob) === 0) {
      //   console.log('警告！警告！');
      //   return false
      // }
      console.log('[ buffer ] >', buffer)
      // 输出目的地
      const { output } = this.$refs;
      // 生成新的dom
      const node = document.createElement("div");
      // 添加孩子，防止vue实例替换dom元素
      if (this.last) {
        output.removeChild(this.last.$el);
        this.last.$destroy();
      }
      const child = output.appendChild(node);
      // 调用渲染方法进行渲染
      return new Promise((resolve, reject) => {
          renderBuffer(buffer, this.fileType, child).then(resolve).catch(reject)
        }
      );
    },
    getFile(src, blob) {
      const that = this
      console.log('[ src ] >', src)
      if (src) {
        const xhr = new XMLHttpRequest()
        xhr.open('get', src, true)
        xhr.responseType = 'arraybuffer'
        xhr.onload = async function () {
          if (xhr.status === 200 || xhr.status === 304) {
            // const arrbuff = new Uint8Array(xhr.response)
            this.last = await that.displayResult(xhr.response);
          }
        }
        xhr.onerror = function (e) {
          console.log('[ e ] >', e)
          alert('pdf')
        }
        console.log('[ xhr ] >', xhr)
        xhr.ontimeout = function(event){
          alert('请求超时！');
        }
        xhr.send()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pptx-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}
</style>