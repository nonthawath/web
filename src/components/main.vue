<template >
  <v-container>
    <v-row>
      <v-container
        
      >
        <img
          src="/KUSRC.png"
          width='500'
        height='500'
          />
      </v-container>
      
    </v-row>
    <v-row>
      <v-container>
        <v-btn @click="login">
            <span>Login</span>
          </v-btn>
      </v-container>
        
    </v-row>
    
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
      login() {
        window.location = 'http://localhost:3000/login/google'
      }
    },
  }
</script>
