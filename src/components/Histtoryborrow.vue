<template>
  <v-container>
  <div>
      <p style="font-size: 25px;font-weigth:bold">{{ "วิชา " + SubjectName + " รหัสวิชา " + SubjectID + " Sec " + Sec}}</p>
  </div>
  <div>
    <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="5"
    @click:row="getrowData"
    class="elevation-1"
  ></v-data-table>
  <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            รูปภาพหลักฐาน
          </v-card-title>
            <img :src="ImgInventory" style="max-width:450px;margin-top:10px"/>
            <img :src="ImgHuman" style="max-width:450px"/>
        </v-card>
      </v-dialog>
    </div>
    
  </div>
  </v-container>
</template>
<script>
import data from '../data/borrow.js'
export default {
  name: 'VueBarcodeTest',
  data () {
    return {
      SubjectName:data.SubjectName,
      SubjectID:data.SubjectID,
      Sec:data.Sec,
        dialog: false,
        ImgInventory:'',
        ImgHuman:'',
      headers: [
          { text: 'email ผู้ยืม', value: 'borrowname' },
          { text: 'วันที่', value: 'borrowDate' },
          { text: 'สถานะ', value: 'status' },
        ],
        users:[]
    }
  },
  methods: {
    logIt (data) {
      console.log('detected', data)
    },
    getrowData(value){
        this.ImgInventory =value.ImgInventory
        this.ImgHuman = value.ImgHuman
        this.dialog = true
      console.log( 'row Value ' , value)
    }

  },
  async created() {
      console.log('a')
      let result = await this.axios.get('http://localhost:3000/inventory/getallhistoryNoneTa/' + data.SubjectID + '/' + data.Sec) 
      let oldFormat = result.data.data
      let newformat = oldFormat.map( el => {
        el.borrowDate = el.borrowDate.replace("T" , " ").substr(0 , 19) ////จัด format เวลา
        return el
      })
      this.users = newformat //// newformat มี ข้อมูลใน db ครบ
        //   this.name = result.data.username
        //   this.email = result.data.email
      console.log(result)
  },
}
</script>