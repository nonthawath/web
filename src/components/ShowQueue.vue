<template>
<v-container>
        <div>
          <p style="font-size: 25px;font-weigth:bold">{{ "วิชา " + SubjectName + " รหัสวิชา " + SubjectID + " Sec " + Sec}}</p>
        </div>
     <div>
    <v-data-table
        :headers="headers"
        :items="queue"
        :items-per-page="5"
        class="elevation-1"
  ></v-data-table>
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
            SubjectSelected : '',
            TimeSelected : '' ,
            Times: [],
            Bookings : [],
            Date : '',
            Subjects: [ "EmbededSystem" , "ComputerScience" , "AbstractData" ],
            headers: [
                {
                    text: 'รายวิชา',
                    align: 'start',
                    sortable: false,
                    value: 'SubjectName',
                },
                { text: 'วันที่', value: 'Date' },
                { text: 'เวลา', value: 'Time' },
                { text: 'ผู้จอง', value: 'Booking' },
            ],
            queue: []
        }
    },
    methods: {
        async onChangeSubject(){
            
        }
    },
    async created() {
        let res = await this.axios.get(`http://localhost:3000/q/${this.SubjectName}/${this.SubjectID}/${this.Sec}`  )
            console.log( res )
            let ListTimes = []
            res.data.Time.forEach( listtime => {
                let booking = ''
                // console.log(e.Booking)
                if(listtime.Booking.length > 0){
                    
                    listtime.Booking.forEach( nameBooking => {
                        console.log(nameBooking)
                        booking = booking + ' ' + nameBooking + ', '
                    })
                }
                ListTimes.push({ SubjectName: res.data.SubjectName , Time: listtime.time , Date: listtime.date , Booking : booking })
            })
            // console.log(ListTimes)
            this.queue = ListTimes
    },
}




</script>