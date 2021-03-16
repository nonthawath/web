<template>
    <nav>
     
        
            <v-toolbar color="#2ECC71">
            
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">
            <v-avatar size="50">
                <img src="/lausanne-metro-logo.png" alt="">
            </v-avatar>
            </v-app-bar-nav-icon>
            <v-col>
            <v-toolbar-title class="text-uppercase black--text" style="text-align:left">
                <span class="font-weight-black" >Inventory</span>
                <span> Management System</span>
            </v-toolbar-title>
            </v-col>
            
            
            
            
            
            
        </v-toolbar>

        <v-navigation-drawer app color="#2ECC71" :stateless="dialog" temporary v-model="drawer">
        <v-layout column align-center>
        <v-flex class="mt5">
            <v-avatar size="200">
                <img src="/ted.png" alt="">
            </v-avatar>
                <div color="#292929" @click="borrowpage" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer">
                  ยืมอุปกรณ์
                </div>
                <div  @click="table" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer">สถานะอุปกรณ์</div>
                <div  @click="history" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer">ประวัติการยืม</div>
                <div @click="createBox" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer">
                จัดชุดอุปกรณ์
                </div>
                <div @click="queue" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer"> กำหนดเวลาการจอง </div>
                <div @click="upload" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer"> อัพโหลดรูปภาพ </div>
                <div @click="showq" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer"> แสดงเวลาการจอง </div>
                <div @click="qstudent" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer"> แสดงตารางการจอง </div>
                <div @click="logout" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer"> logout </div>
        </v-flex>
        <p class="white--text subheading mt-1" >
            {{ name }}
        </p>

        
        </v-layout>
        <v-dialog v-if="drawer" v-model="dialog" lazy absolute>
        </v-dialog>
    
    </v-navigation-drawer>

        
        
        
    </nav>
    

</template>


<script>
import data from '../data/borrow.js'
import EventBus from '../event-bus.js';
export default {
    data() {
        return{
            drawer: false,
            dialog: false,
            name: '',
        }

    },
    async created () {
        console.log( this.pathcreatebox)
        // let result = await this.axios.post( 'http://localhost:3000/users/checktoken' , { token : data.token }) 
        this.name = data.email  
    },
    destroyed () {
    },
    methods: {
      scanner() {
        // window.location = 'http://localhost:8080/scanner'
        this.$router.push('/scanner?token=' + data.token )
      },
      borrowpage(){
        // window.location = 'http://localhost:8080/Borrow&token=' + data.token
        // await this.$nextTick();
        this.$router.push('/Borrow?token=' + data.token )
      },
      createBox(){
        this.$router.push('/createBox?token=' + data.token )
        // window.location = 'http://localhost:8080/Borrow'
      },
      table(){
        this.$router.push('/table' )
        // window.location = 'http://localhost:8080/Borrow'
      },
      history(){
        this.$router.push('/tablehistory' )
        // window.location = 'http://localhost:8080/Borrow'
      },
      logout(){
        // this.$router.push('/' )
        window.location = 'http://localhost:8080/'
      },
      queue(){
        // this.$router.push('/' )
        this.$router.push('/Queue?token=' + data.token)
      },
      upload(){
        // this.$router.push('/' )
        this.$router.push('/Upload?token=' + data.token)
      },
      showq(){
        // this.$router.push('/' )
        this.$router.push('/ShowQueue?token=' + data.token)
      },
      qstudent(){
        // this.$router.push('/' )
        this.$router.push('/QueueStudent?token=' + data.token)
      }
    },
    mounted() {
      EventBus.$on('update_nav', function (payLoad) {
          this.name = payLoad
          console.log(payLoad)
      });
    },
    
}
</script>

<style>
.navbarmenu {
  "background-color" : red
}
</style>