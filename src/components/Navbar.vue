<template>
    <nav>
     
        
            <v-toolbar color="#2ECC71">
            
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">
            
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
        
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title" style="text-align:left">
            {{ role }}
          </v-list-item-title>
          <v-list-item-subtitle style="text-align:left">
            Email : {{ name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
        <v-flex class="mt5">
        
                <div color="#292929" @click="getsubject" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer">
                  เลือกรายวิชา
                </div>
                 <div color="#292929" v-if=" role  !== 'Student'" @click="CreateSubject" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer">
                  สร้างรายวิชา
                </div>
                <div color="#292929" v-if=" role  !== 'Student'" @click="EditSubject" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer">
                  แก้ไขรายวิชา
                </div>
                <div color="#292929" v-if=" role  !== 'Student'"  @click="borrowpage" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer">
                  ยืมอุปกรณ์
                </div>
                <div v-if=" role  !== 'Student'"  @click="table" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer">สถานะอุปกรณ์</div>
                <div v-if=" role  !== 'Student'" @click="history" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer">ประวัติการยืม</div>
                <div v-if=" role  !== 'Student'" @click="historyNoneTA" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer">ประวัติการยืม( None TA)</div>
                <div v-if=" role  !== 'Student'" @click="createBox" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer">
                จัดชุดอุปกรณ์
                </div>
                <div v-if=" role  !== 'Student'" @click="queue" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer"> กำหนดเวลาการจอง </div>
                <div v-if=" role  !== 'Student'" @click="upload" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer"> อัพโหลดรูปภาพ </div>
                <div @click="showq" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer"> แสดงเวลาการจอง </div>
                <div @click="qstudent" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer"> แสดงตารางการจอง </div>
                <div @click="logout" style="background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);border-radius: 10px;margin:10px;cursor:pointer"> logout </div>
        </v-flex>
        

        
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
            role: data.role
        }

    },
    async created () {
      console.log('Role :=> in nav bar' ,data.role)
        this.role = data.role
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
      },
      historyNoneTA(){
        this.$router.push('/Histtoryborrow?token=' + data.token)
      },
      getsubject(){
        this.$router.push('/GetSubject?token=' + data.token)
      },
      CreateSubject(){
        this.$router.push('/CreateSubject?token=' + data.token)
      },
      EditSubject(){
        this.$router.push('/EditSubject?token=' + data.token)
      }
    },
    mounted() {
      // console.log('Role :=> in nav bar' ,data.role)
      this.role = data.role
      EventBus.$on('update_nav',  ( payLoad ) => {
          this.role = data.role
          this.name = payLoad

          
          console.log( 'update Event ', this.role , this.name )
      });
    },
}
</script>

<style>
.navbarmenu {
  "background-color" : red
}
</style>