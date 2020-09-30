<template>
  <v-container>
      <v-btn @click="dashboard">
      <span>Recents</span>

      <v-icon>mdi-history</v-icon>
    </v-btn>
    <v-btn @click="scanner">
      <span>Scanner</span>

      <v-icon>mdi-history</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  export default {
    created () {
      this.$barcodeScanner.init(this.onBarcodeScanned)
    },
    destroyed () {
      // Remove listener when component is destroyed
      this.$barcodeScanner.destroy()
    },
    methods: {
      dashboard() {
        this.$barcodeScanner.init(this.onBarcodeScanned)
        // window.location = 'http://192.168.100.3:8080/dashboard'
      },
      scanner() {
        // this.$barcodeScanner.init(this.onBarcodeScanned)
        window.location = 'http://192.168.100.3:8080/scanner'
      },
       onBarcodeScanned (barcode) {
        console.log(barcode)
        // do something...
      },
      // Reset to the last barcode before hitting enter (whatever anything in the input box)
      resetBarcode () {
        let barcode = this.$barcodeScanner.getPreviousCode()
        console.log(barcode)
        // do something...
      }
    },
  }
</script>
