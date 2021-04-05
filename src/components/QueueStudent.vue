<template>
    <v-container>
        <div>
          <p style="font-size: 25px;font-weigth:bold">{{ "วิชา " + SubjectName + " รหัสวิชา " + SubjectID + " Sec " + Sec}}</p>
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
            SubjectName:data.SubjectName,
            SubjectID:data.SubjectID,
            Sec:data.Sec,
            TimeSelected : '' ,
            Times: [],
            Bookings : [],
            Date : '',
        }
    },
    async created() {
        let res = await this.axios.get(`http://localhost:3000/q/${this.SubjectName}/${this.SubjectID}/${this.Sec}`  )
        if(res.data){
            this.Bookings = res.data.Time
            res.data.Time.forEach( (e , index) => {
                this.Times.push(`วันที่ ${e.date} เวลา ${e.time} Index:${index}`)
            })
        }
        console.log( "response ", res.data )

    },
    methods: {
        onChangeTimes(e){
            console.log(e.split("Index:")[1])
            this.TimeSelected = e.split("Index:")[1]
            if(this.Bookings[this.TimeSelected].Booking.includes(data.email)){
                alert( data.email + " คุณเคยจองเวลานี้ไปแล้ว")
            }
        },
        async Submit(){
            let res = await this.axios.post(`http://localhost:3000/q/Booking/` , { indexTime : this.TimeSelected , email: data.email , Sec: this.Sec , SubjectID: this.SubjectID }  )
            
            if(this.Bookings[this.TimeSelected].Booking.includes(data.email)){
                alert( data.email + " คุณเคยจองเวลานี้ไปแล้ว")
            }else if(res.data.error){
                alert("Fail")
            }else{
                alert("Success")
                this.$router.push('/ShowQueue?token=' + this.$route.query.token)
            }
        }
    },
}
</script>