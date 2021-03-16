<template>
<v-app class="grey lighten-4">
  
   <Navbar v-if="!['Home'].includes($route.name)"/>
  <div id="app">
    <div id="nav">
    </div>
    

    <v-main>
    <router-view/>
    </v-main>
    
  </div>
  
</v-app>

</template>



<script>
// v-if="renderComponent"
// v-if="!['Home'].includes($route.name)"
// import EventBus from './event-bus.js';
import Navbar from '@/components/Navbar'
import data from './data/borrow.js'
export default {
  name:'App',
  components: { Navbar },
  data() {
    return {
      renderComponent: true,
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }
 
  },
  // mounted() {
  //     EventBus.$on('update_nav', function (payLoad) {
  //         this.forceRerender
  //         console.log(payLoad)
  //     });
  //   },
  // methods: {
  //   forceRerender() {
  //       // Remove my-component from the DOM
  //       this.renderComponent = false;

  //       this.$nextTick(() => {
  //         // Add the component back in
  //         this.renderComponent = true;
  //       });
  //     }
  // },
      methods: {
        async borrowpage(){
        // window.location = 'http://localhost:8080/Borrow&token=' + data.token
        // await this.$nextTick();
        this.$router.push('/Borrow&token=' + data.token )
      },
      },
  
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
