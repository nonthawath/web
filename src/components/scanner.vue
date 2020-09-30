<template>
  <StreamBarcodeReader
    @decode="onDecode"
    @loaded="onLoaded"
></StreamBarcodeReader>
</template>
<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
export default {
    components:{
        StreamBarcodeReader
    },

    methods: {
        onDecode (result) {
     alert(result)
     console.log(result)
    },
    onLoaded (){

    }
    }
  }
</script>