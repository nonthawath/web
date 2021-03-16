<template>

    <v-container>
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
            <div class="text-center">
        <v-select
          :items="items"
          label="รายวิชา"
          @change="onChangeSubject"
        ></v-select>
  </div>
           </v-col>
        </v-row>
        <v-text-field
            label="ครั้งที่ 1"
            :value="this.queue[0]"
          ></v-text-field>
        <v-text-field
            label="ครั้งที่ 2"
            :value="this.queue[1]"
          ></v-text-field>
        <v-text-field
            label="ครั้งที่ 3"
            :value="this.queue[2]"
          ></v-text-field>

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

export default {
    components: { VueTimepicker },

    data () {
        return {
            time: '',
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
        this.queue.push(this.time)
        console.log( this.queue )
        this.inq = this.queue[0]
        
      },
      onChangeTime (e) {
        // console.log( " display ",e.displayTime)
        // console.log(  "t" , this.t)
        //console.log(e)
        this.time = e.displayTime
        //   
      },
     async Submit (){
        let res = await this.axios.post('http://localhost:3000/q' , {  SubjectName: this.select, Time: this.queue , Date: this.picker } )
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


