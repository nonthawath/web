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
            เครื่องมือในชุดอุปกรณ์
          </v-card-title>  
        <v-card>
          <ul id="example-1">
              <li v-for="item in Listitem" :key="item.name">
                {{ item.name + ' : ' + item.count }} 
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
          { text: 'email ผู้ยืม', value: 'borrow_by' },
          { text: 'รหัสนิสิต', value: 'borrow_by_id' },
          { text: 'วันที่ยืม', value: 'borrow_at' },
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
        this.Listitem = value.listItem
        this.dialog = true
      // console.log( 'row Value ' , this.dialog , value.listItem)
    }

  },
  async created() {
      // console.log('a')
      let result = await this.axios.get('http://localhost:3000/inventory/getall/' + data.SubjectID + '/' + data.Sec) 
      this.users = result.data.data
        //   this.name = result.data.username
        //   this.email = result.data.email
      console.log(result)
  },
}
</script>