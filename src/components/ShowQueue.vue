<template>
<v-container>

        <div class="text-center">
            <v-select
            :items="Subjects"
            label="รายวิชา"
            @change="onChangeSubject"
            ></v-select>
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
export default {
   data (){
        return{
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
        async onChangeSubject(Subject){
            let res = await this.axios.get('http://localhost:3000/q/' + Subject)
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
                ListTimes.push({ SubjectName: res.data.SubjectName , Time: listtime.Time , Date: res.data.Date , Booking : booking })
            })
            // console.log(ListTimes)
            this.queue = ListTimes
        }
    }
}




</script>