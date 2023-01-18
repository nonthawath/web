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
  </div>
  <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
      <v-card-title class="headline grey lighten-2">
            อุปกรณ์เสียหาย
          </v-card-title>  
        <v-card>
          <ul id="example-1">
              <li v-for="item in Listitem" :key="item">
                {{ item }} 
              </li>
          </ul>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
<script>
import data from '../data/borrow.js'
export default {
  name: 'VueBarcodeTest',
  data () {
    return {
      dialog: false,
      SubjectName:data.SubjectName,
      SubjectID:data.SubjectID,
      Sec:data.Sec,
      headers: [
          {
            text: 'รหัสอุปกรณ์',
            align: 'start',
            sortable: false,
            value: 'boxid',
          },
          { text: 'ชื่อชุดอุปกรณ์', value: 'boxname' },
          // { text: 'email ผู้ยืม', value: 'borrow_by' },
          { text: 'รหัสนักเรียน', value: 'borrow_by_id' },
          { text: 'วันที่', value: 'borrow_at' },
          { text: 'สถานะ', value: 'status' },
        ],
        users:[],
        Listitem: []
    }
  },
  methods: {
    logIt (data) {
      console.log('detected', data)
    },
    getrowData(value){
        this.Listitem = value.DmgItem
        this.dialog = true
      // console.log( 'row Value ' , this.dialog , value.listItem)
    }

  },
  async created() {
      console.log('a')
      let result = await this.axios.get('http://localhost:3000/inventory/getallhistory/' + data.SubjectID + '/' + data.Sec) 
      let oldFormat = result.data.data
      let newformat = oldFormat.map( el => {
        el.borrow_at = el.borrow_at.replace("T" , " ").substr(0 , 19)
        // el.borrow_by_id = el.borrow_by_id.substr( 3 , 10)
        return el
      })
      this.users = newformat
        //   this.name = result.data.username
        //   this.email = result.data.email
      console.log(result)
  },
}
</script>