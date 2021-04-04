<template>
  <v-container>
    <v-select
        :items="Listsubject"
        label="เลือกรายวิชา"
        v-model="selectedSubject"
    ></v-select>

    <div>
        <v-btn color="#2ECC71" @click="GetSubject" style="margin-top: 10px;"> ยืนยัน </v-btn>
    </div>
  </v-container>
</template>



<script>
  import data from '../data/borrow.js'
  import EventBus from '../event-bus.js';
  export default {
    data() {
        return {
            Listsubject: [],
            iditem: '',
            selectedSubject: ''
        }
    },
    async created () {
      if(this.$route.query.token) {
       let result = await this.axios.post( 'http://localhost:3000/users/checktoken' , { token : this.$route.query.token })
       //console.log(result.data)
    //    alert(result.data.role)
       if(!result.data.login){
         alert('Not have Token in Session')
         this.$router.push('/')
       }else{
         this.email = result.data.email
         data.token = this.$route.query.token
         data.email = result.data.email
         data.role = result.data.role
         EventBus.$emit('update_nav', result.data.email)
         let response
         if(data.role == 'Professor' ){
            response = await this.axios.get( 'http://localhost:3000/Subjects/' +  data.email )
         }else{
            response = await this.axios.get( 'http://localhost:3000/Subjects/all')
         }
         
         if(response.data.error){
            alert(response.data.msg)
         }else{
            // console.log(response.data.data)
            // alert(response.data.data)
            let list = response.data.data
            list = list.map( e => {
                return  e.SubjectName + " : " + e.SubjectID + " : " + e.Sec 
            })
            this.Listsubject = list
         }
       }
      }else{
        alert('input your token')
        this.$router.push('/')
      }
    },
    destroyed () {
    },
    methods: {
      scannerID() {
        this.$router.push('/scanner?id=true&token=' + this.$route.query.token )
        // window.location = 'http://localhost:8080/scanner?id=true'
      },
      async GetSubject(){

        data.SubjectName = this.selectedSubject.split(" : ")[0]
        data.SubjectID = this.selectedSubject.split(" : ")[1]
        data.Sec = this.selectedSubject.split(" : ")[2]
        let res = await this.axios.post( 'http://localhost:3000/Subjects/CheckPermission' , { Student : data.email , SubjectName : data.SubjectName , SubjectID : data.SubjectID , Sec: data.Sec } )
        if(!res.data.check && data.role == 'Student' ){
            alert('ไม่มีรายชื่อนิสิตในวิชานี้')
        }else{
            this.$router.push('/borrow?id=true&token=' + this.$route.query.token ) 
        }
      }
    },
  }
</script>