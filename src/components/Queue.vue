<template>

    <v-container>
        <div>
          <p style="font-size: 25px;font-weigth:bold">{{ "วิชา " + SubjectName + " รหัสวิชา " + SubjectID + " Sec " + Sec}}</p>
        </div>
        <v-row>
            <v-col>
                <v-date-picker v-model="picker" locale="th" :min="Mindate"
                ></v-date-picker>
            </v-col>
           <v-col>
            <v-btn
                class="mx-2"
                fab
                dark
                color="indigo"
                @click="Addtime"
                >
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>
            <VueTimepicker format="HH:mm" @change="onChangeTime" ></VueTimepicker>
            
           </v-col>
        </v-row>
        <div style="overflow: auto;max-height:200px;">
          <div v-for="(item, index) in queue" :key="index">
            <li>
              {{ "ลำดับที่ "+ (index + 1)+ " วันที่ " + item.date + " เวลา " + item.time }}
            </li>
          </div>
        </div>
        <v-btn
          class="ma-2"
          color="green"
          @click="deletetime"
          >
           clear
          </v-btn>
          <v-btn
        class="ma-2"
      
        color="green"
        @click="Submit"
        >
        Accept Terms
        </v-btn>
        
    </v-container>
</template>

<script>

import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import data from '../data/borrow.js'

export default {
    components: { VueTimepicker },

    data () {
        return {
            time: '',
            SubjectName:data.SubjectName,
            SubjectID:data.SubjectID,
            Sec:data.Sec,
            picker: new Date().toISOString().substr(0, 10),
            Mindate: new Date().toISOString().substr(0, 10),
            queue: [],
            inq: '',
            items: [ "EmbededSystem" , "ComputerScience" , "AbstractData" ],
            select : 'Subject'
        }
    },

    methods: {
      Addtime (){
        //   console.log( this.t )
        this.queue.push({ date: this.picker , time : this.time})
        // console.log( this.queue )
        this.inq = this.queue[0]
      },
      deletetime(){
        this.queue = []
        // this.queue.pop()
      },
      onChangeTime (e) {
        // console.log( " display ",e.displayTime)
        // console.log(  "t" , this.t)
        //console.log(e)
        this.time = e.displayTime
        //   
      },
     async Submit (){
        let res = await this.axios.post('http://localhost:3000/q' , {  SubjectName: this.SubjectName, Time: this.queue ,SubjectID: this.SubjectID ,Sec: this.Sec} )
        console.log(res)

      },
      async onChangeSubject(e){
        console.log(e)
        this.select = e
      }
    },
   async created() {
       console.log(this.picker)
    //    let res = await this.axios.get('http://localhost:3000/getuser/kong')
  
    //let res = await this.axios.post('http://localhost:3000/users/create' , body )
    //console.log(res)
        // console.log( new Date().toISOString().substr(0, 10) )
        // this.t = "ASDASD"
        // console.log( this.t)
        // console.log(this.Mindate)
    },
  }
</script>


