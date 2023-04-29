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
                <li v-for="(item) in Listitem" :key="item.name">
                  {{ item.name + `${ item.missingItem > 0 ? " เสียหาย:" : " เพิ่ม: "}   ` +  Math.abs(item.missingItem) + "  คงเหลือ: " + item.count + "  เสียหายรวมทั้งหมด : " + item.totalBroken }}
                  <!-- <input v-on:input="editCount(item, index)" type="number" v-model="item.count"/>  -->
                </li>
            </ul>
             
          </v-card>
        </v-dialog>
      </div>
      <br>
      <div>
        <v-btn @click="onExport()">
          export
        </v-btn>
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
            { text: 'ชื่อชุดอุปกรณ์', value: 'boxName' },
            { text: 'วันที่อัพเดทข้อมูล', value: 'create_at' },
          ],
        users:[],
        Listitem: [],
        selectedItem: [],
      }
    },
    methods: {
    async onExport() {
      console.log(data.SubjectID,data.Sec)
     data = await this.axios.post('http://localhost:3000/inventory/exportHistory',{
        SubjectID: data.SubjectID,
        Sec: data.Sec
     }
     ) 
     console.log(data);
    },
      logIt (data) {
        console.log('detected', data)
      },
      getrowData(value){
          this.Listitem = value.listItem
          this.dialog = true
          this.selectedItem = JSON.stringify({ ...value })
      },
      closeDialog(){
        this.dialog = false
      },
      async submitEditData(){
        var invalidData = false
        let checkCount = 0
        JSON.parse(this.selectedItem).listItem.forEach((e, i) => {
          let intE = parseInt(e.count)
          if(intE < 0 || intE < parseInt(this.Listitem[i].count)){
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
        this.dialog = false
  
      },
      editCount(val, index){
        this.Listitem[index] = val
      },
      async fetchData(){
        let result = await this.axios.get('http://localhost:3000/inventory/historyInventoryBox/' + data.SubjectID + '/' + data.Sec) 
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