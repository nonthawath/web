<template>
  <v-container>
    <v-row> 
      <v-container>
        <h1>จัดชุดอุปกรณ์</h1>
      </v-container>

    </v-row>
   
    <v-row>
      <v-card width="400" class="mx-auto my-6">
        <v-container>
                <v-textarea
            v-model="boxname"
              no-resize
              rows="1"
              label="ชื่อชุดอุปกรณ์"
              :value="boxname"
            ></v-textarea>
        <v-textarea
            v-model="boxid"
              no-resize
              rows="1"
              label="ID อุปกรณ์"
              :value="boxid"
            ></v-textarea>
        
        <v-btn color="#2ECC71" @click="submit">ยืนยันข้อมูล</v-btn>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>



<script>
  import data from '../data/borrow.js'
  import EventBus from '../event-bus.js';
  export default {
    data() {
        return {
            boxname: '',
            boxid: '',
        }
    },
    async created () {
      console.log('this CREATE')
      if(this.$route.query.token) {
       let result = await this.axios.post( 'http://localhost:3000/users/checktoken' , { token : this.$route.query.token })
       console.log(result.data)
       if(!result.data.login){
         alert('Not have Token in Session')
         this.$router.push('/')
       }else{
         data.token = this.$route.query.token
         data.email = result.data.email
         EventBus.$emit('update_nav', result.data.email)
       }
      }else{
        alert('input your token')
        this.$router.push('/')
      }
      console.log(data)
        // this.idcard = data.idcard
        // this.iditem = data.item.id
        // this.iditem = borrow.item.id
    },
    destroyed () {
    },
    methods: {
      scannerID() {
        this.$router.push('/scanner?id=true&token=' + this.$route.query.token )
        // window.location = 'http://localhost:8080/scanner?id=true'
      },
      scannerItem() {
        this.$router.push('/scanner?item=true&token=' + this.$route.query.token)
        // window.location = 'http://localhost:8080/scanner?item=true'
      },
      async submit(){
        let re = await this.axios.post( 'http://localhost:3000/inventory/createbox' , {  boxid: this.boxid  , boxname: this.boxname  } )
        // console.log(re)
        alert(re.data.msg)
      }
    },
  }
</script>