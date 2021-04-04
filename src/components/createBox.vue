<template>
  <v-container>
    <div>
      <p style="font-size: 25px;font-weigth:bold">{{ "วิชา " + SubjectName + " รหัสวิชา " + SubjectID + " Sec " + Sec}}</p>
    </div>
    <v-row> 
      <v-container>
        <h1>จัดชุดอุปกรณ์</h1>
      </v-container>

    </v-row>
   
    <v-row>
      <v-card width="400" class="mx-auto my-6">
        <v-container>
            <v-textarea
              v-model="boxname"
                no-resize
                rows="1"
                label="ชื่อชุดอุปกรณ์"
                :value="boxname"
              ></v-textarea>
            <ul id="example-1">
              <li v-for="item in listItem" :key="item.name">
                {{ item.name + ' : ' + item.count }} 
              </li>
            </ul>
            <v-btn
            color="red lighten-2"
            dark
            v-bind="attrs"
            @click="dialog = true"
          >
            เพิ่มอุปกรณ์
          </v-btn>
          <v-btn
              color="primary"
              text
              @click="deleteItem"
            >
              ลบ
            </v-btn>
        </v-container>
          <v-btn color="#2ECC71" @click="submit"
          >ยืนยันข้อมูล</v-btn>
      </v-card>
    </v-row>
    <div>
      <img  
            :src="barcodegen">
    </div>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            เพิ่มอุปกรณ์
          </v-card-title>

          <v-textarea
            v-model="itemName"
              no-resize
              rows="1"
              label="ชื่ออุปกรณ์"
              :value="itemName"
            ></v-textarea>
            <v-textarea
            v-model="itemCount"
              no-resize
              rows="1"
              label="จำนวน"
              :value="itemCount"
            ></v-textarea>
        
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="addlistItem"
              style="margin-button: 10px;"
            >
              เพิ่ม
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>



<script>
  import data from '../data/borrow.js'
  import EventBus from '../event-bus.js';
  export default {
    data() {
        return {
            SubjectName:data.SubjectName,
            SubjectID:data.SubjectID,
            Sec:data.Sec,
            boxname: '',
            itemName : '',
            itemCount : '',
            boxid: '',
            barcodegen: '',
            listItem : [],
            dialog: false,
        }
    },
    async created () {
      // console.log('this CREATE')
      if(this.$route.query.token) {
       let result = await this.axios.post( 'http://localhost:3000/users/checktoken' , { token : this.$route.query.token })
       console.log(result.data)
       if(!result.data.login){
         alert('Not have Token in Session')
         this.$router.push('/')
       }else{
         data.token = this.$route.query.token
         data.email = result.data.email
         EventBus.$emit('update_nav', result.data.email)
       }
      }else{
        alert('input your token')
        this.$router.push('/')
      }
      console.log(data)
        // this.idcard = data.idcard
        // this.iditem = data.item.id
        // this.iditem = borrow.item.id
    },
    destroyed () {
    },
    methods: {
      scannerID() {
        this.$router.push('/scanner?id=true&token=' + this.$route.query.token )
        // window.location = 'http://localhost:8080/scanner?id=true'
      },
      scannerItem() {
        this.$router.push('/scanner?item=true&token=' + this.$route.query.token)
        // window.location = 'http://localhost:8080/scanner?item=true'
      },
      async submit(){
        if(this.boxname == ''){
          alert('กรุณาใส่ชื่อ ชุดอุปกรณ์')
        }else if(this.listItem.length == 0){
          alert('กรุณาเพิ่ม ชุดอุปกรณ์')
        }else{
          this.boxid = Date.now() 
          this.barcodegen = `http://bwipjs-api.metafloor.com/?bcid=code128&text=${this.boxid}&includetext`
          let re = await this.axios.post( 'http://localhost:3000/inventory/createbox' , {  boxid: this.boxid  , boxname: this.boxname , listItem: this.listItem , SubjectID : data.SubjectID , Sec: data.Sec })
          this.boxid = ''
          this.boxname = ''
          this.listItem = []
          // console.log(re)
          alert(re.data.msg)
        }
      },
      addlistItem() {
        let oldList = this.listItem
        if(this.itemName == '' || this.itemCount == ''){
          alert( 'กรุณาใส่ข้อมูลให้ครบ')
        }else{
          oldList.push({ name : this.itemName , count : this.itemCount })
          this.itemName = ''
          this.itemCount = ''
          this.listItem = oldList
          this.dialog = false
        }
      },
      deleteItem() {
        let oldList = this.listItem
        oldList.pop()
        this.listItem = oldList
      }
    },
  }
</script>