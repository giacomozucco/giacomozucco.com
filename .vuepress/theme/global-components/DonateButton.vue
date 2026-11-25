<template>
  <div>
    <div class="block w-full flex flex-col items-center my-8">
      <span v-if="showText" class="mb-2 px-4 text-lg">🔥 If you enjoyed this content, please consider donating</span>
      <button @click="show = true" class="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white text-sm leading-4 font-bold whitespace-nowrap">
        Donate
      </button>
    </div>
    <div v-if="show">
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <transition name="fade" appear>
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transform transition-opacity" />
        </transition>

        <div class="fixed z-10 inset-0 overflow-y-auto" @click="show = false">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <Transition name="slide" appear>
              <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" @click.stop="show = true">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col items-center">
                  <h1 class="text-3xl flex items-center mb-2">
                    Every contribution matters ⚡️
                  </h1>
                  <span class="mb-8 text-sm">Please use this 👇🏻 lightning address to donate. Thank you!</span>

                  <div class="cursor-pointer flex items-center break-all border-2 border-dashed border-gray-200 rounded" @click="copyToClipboard">
                    <p class="text-gray-700 text-sm m-1">{{ lnurl }}</p>
                     <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" viewBox="0 0 115.77 122.88"><path :class="copiedColor" d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z" /></svg>
                  </div>
                  <span v-if="copied" class="text-green-600 text-sm uppercase tracking-wide">Copied!</span>

                  <a :href="linkLnurl" target="_blank" class="mt-8 flex flex-col items-center">
                    <qr-code :value="lnurl" size="260" />
                    <span class="mt-4 bg-gray-200 text-xs text-gray-600">Click the QR to send this address to your wallet 🚀</span>
                  </a>
                </div>
              </div>

            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QrCode from "./QrCode";
import Icon from "./Icon";

export default {
  components: {QrCode, Icon},

  props: {
    showText: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      show: false,
      copied: false,
      lnurl: 'giacomozucco@getalby.com',
    }
  },

  computed: {
    copiedColor() {
      return this.copied ? 'fill-green-500' : 'fill-gray-500'
    },
    linkLnurl () {
      return `lightning:${this.lnurl}`
    }
  },

  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.lnurl)
      this.copied = true
    },
  },
}
</script>
