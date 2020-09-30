<template>
  <v-container>
    <h1>ABC</h1>
    <v-btn @click="scanner">
      <span>Scanner</span>

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
      scanner() {
        window.location = 'http://192.168.100.3:8080/scanner'
      },
    },
  }
</script>