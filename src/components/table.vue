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
              <li v-for="(item, index) in Listitem" :key="item.name">
                {{ item.name + ' : ' }}
                <input v-on:input="editCount(item, index)" type="number" v-model="item.count"/> 
              </li>
          </ul>
          <div>
             <v-btn @click="submitEditData">
                แก้ไข
              </v-btn>
              <v-btn @click="deleteInventoryBox">
                ลบชุดอุปกรณ์
              </v-btn>
              <v-btn @click="closeDialog">
                ยกเลิก
              </v-btn>
          </div>
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
          { text: 'วันที่ยืม', value: 'borrow_at' },
          { text: 'สถานะ', value: 'status' },
        ],
      users:[],
      Listitem: [],
      selectedItem: [],
    }
  },
  methods: {
    logIt (data) {
      console.log('detected', data)
    },
    getrowData(value){
        this.Listitem = value.listItem
        this.dialog = true
        this.selectedItem = JSON.stringify({ ...value })
    },
    async closeDialog(){
      this.dialog = false
      await this.fetchData()
    },
    async submitEditData(){
      var invalidData = false
      let checkCount = 0
      JSON.parse(this.selectedItem).listItem.forEach((e, i) => {
        let intE = parseInt(e.count)
        // || intE < parseInt(this.Listitem[i].count)
        if(intE < 0 ){
          invalidData = true
        }else if (parseInt(this.Listitem[i].count) == intE){
          checkCount++
        }
      });
      
      console.log(checkCount, this.Listitem.length, "submitEditData")
      if(invalidData){
        alert("ข้อมูลไม่ถูกต้อง")
      }else if(checkCount != this.Listitem.length){
        const item = JSON.parse(this.selectedItem)
        const mapPayload = { ...item, Listitem: this.Listitem }

        await this.axios.post("http://localhost:3000/inventory/updateListItem", {...mapPayload})
        await this.fetchData()
        console.log(" save update ")
      }
      await this.closeDialog()

    },
    async deleteInventoryBox(){
      await this.axios.post("http://localhost:3000/inventory/deleteInventoryBox/" + JSON.parse(this.selectedItem)._id)
      await this.closeDialog()
    },
    editCount(val, index){
      this.Listitem[index] = val
    },
    async fetchData(){
      let result = await this.axios.get('http://localhost:3000/inventory/getall/' + data.SubjectID + '/' + data.Sec) 
      this.users = result.data.data
    }

  },
  async created() {
    await this.fetchData()
      // console.log('a')
        //   this.name = result.data.username
        //   this.email = result.data.email
      // console.log(result)
  },
}
</script>