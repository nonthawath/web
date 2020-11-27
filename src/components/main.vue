<template>
  <v-container>
      <v-btn @click="dashboard">
      <span>Recents</span>

      <v-icon>mdi-history</v-icon>
    </v-btn>
    
  </v-container>
</template>

<script>
  export default {
    created () {
    },
    destroyed () {
    },
    methods: {
      dashboard() {
        // this.$barcodeScanner.init(this.onBarcodeScanned)
        window.location = 'http://192.168.100.3:8080/dashboard'
      },
      scanner() {
        // this.$barcodeScanner.init(this.onBarcodeScanned)
        window.location = 'http://192.168.100.3:8080/scanner'
      },
    },
  }
</script>
