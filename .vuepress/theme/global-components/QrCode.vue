<template>
    <div>
      <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'QrCode',

  components: {QrcodeVue},

  props: {
    value: {
      type: String,
      default: 'https://example.com',
    },
    size: {
      type: String,
      default: 300,
    },
  },
}
</script>

