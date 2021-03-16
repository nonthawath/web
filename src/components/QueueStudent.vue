<template>
    <v-container>
        <div class="text-center">
            <v-select
            :items="Subjects"
            label="รายวิชา"
            @change="onChangeSubject"
            ></v-select>
        </div>
        <div class="text-center">
            <v-select
            :items="Times"
            label="เวลาจอง"
            @change="onChangeTimes"
            ></v-select>
        </div>
        <div class="text-center">
            <v-btn
                class="ma-2"
                color="green"
                @click="Submit"
                >
                Accept Terms
                </v-btn>
        </div>
    </v-container>
</template>

<script>
import data from '../data/borrow.js'
export default {
    data (){
        return{
            SubjectSelected : '',
            TimeSelected : '' ,
            Times: [],
            Bookings : [],
            Date : '',
            Subjects: [ "EmbededSystem" , "ComputerScience" , "AbstractData" ]
        }
    },
    methods: {
        async onChangeSubject(e){
            let res = await this.axios.get('http://localhost:3000/q/' + e)
            console.log( res )
            let ListTimes = []
            res.data.Time.forEach( e => {
                ListTimes.push(e.Time)
            })
            this.Times = ListTimes
            this.Date = res.data.Date
            this.SubjectSelected = e
        },
        async Submit(){
            let res = await this.axios.post('http://localhost:3000/q/Booking' , { indexTime : this.Times.indexOf(this.TimeSelected) , email : data.email , SubjectName: this.SubjectSelected })
            console.log( res )
        },
        onChangeTimes(e){
            this.TimeSelected = e
        }
    },
    async created() {
        // let res = await this.axios.get('http://localhost:3000/q/')
        // console.log(res)
        // this.Times =
    },
}
</script>