<template>
  <v-container>
    <div>
      <p style="font-size: 25px;font-weigth:bold">{{ "วิชา " + SubjectName + " รหัสวิชา " + SubjectID + " Sec " + Sec}}</p>
    </div>
    <v-row> 
      <v-container>
        <h1>ยืมอุปกรณ์</h1>
      </v-container>

    </v-row>
    <v-row>
      <v-container>
        <h1>กรุณาทำการสแกนบัตรนิสิต/อุปกรณ์</h1>
      </v-container>
    </v-row>
    <v-row>
      <v-container>
          <v-btn color="#F4D03F" @click="scannerID" class="mx-4" >
            <span>Scan บัตรนิสิต</span>
          </v-btn>
          <v-btn color="#F4D03F" @click="scannerItem" >Scan อุปกรณ์</v-btn>
      </v-container>
    </v-row>
    <v-row>
      <v-card width="400" class="mx-auto my-6">
        <v-container>
                <v-textarea
            v-model="idcard"
              no-resize
              rows="1"
              label="รหัสนิสิต"
              :value="idcard"
            ></v-textarea>
        <v-textarea
            v-model="iditem"
              no-resize
              rows="1"
              label="ID อุปกรณ์"
              :value="iditem"
            ></v-textarea>
          <v-textarea
            v-model="borrowDate"
              no-resize
              rows="1"
              label="วันที่ยืม"
              :value="borrowDate"
            ></v-textarea>
            <v-select
               :items="items"
                label="ยืม/คืน"
                v-model="selectedStatus"
            ></v-select>
            <div>
              <v-btn color="#2ECC71" @click="CheckItem">ตรวจสอบความเสียหาย</v-btn>  
            </div>
        <div style="margin-top:10px;">
          <v-btn color="#2ECC71" @click="submit">ยืนยันข้อมูล</v-btn>
        </div>
        </v-container>
      </v-card>
    </v-row>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            เช็คความเสียหายอุปกรณ์
          </v-card-title>

          <div >
              <v-checkbox v-for="item in listItem" :key="item" 
                v-model="selectedItemDmg"
                :label="item"
                color="red"
                :value="item"
                >
              </v-checkbox>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="CheckItemSubmit"
              style="margin-button: 10px;"
            >
              ยืนยัน
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
      //.substr(0, 10),
        return {
            SubjectName:data.SubjectName,
            SubjectID:data.SubjectID,
            Sec:data.Sec,
            idcard: '',
            iditem: '',
            listItem: [],
            selectedItemDmg:[],
            dialog: false,
            items: ['borrow' , 'backed'],
            selectedStatus: '',
            borrowDate: new Date().toISOString(),
            email : '',
        }
    },
    async created () {
      if(this.$route.query.token) {
       let result = await this.axios.post( 'http://localhost:3000/users/checktoken' , { token : this.$route.query.token })
       //console.log(result.data)
      //  alert(result.data.role)
       if(!result.data.login){
         alert('Not have Token in Session')
         this.$router.push('/')
       }else{
         this.email = result.data.email
         data.token = this.$route.query.token
         data.email = result.data.email
         data.role = result.data.role
         EventBus.$emit('update_nav', result.data.email)
       }
      }else{
        alert('input your token')
        this.$router.push('/')
      }
      //console.log(data)
        this.idcard = data.idcard
        this.iditem = data.item.id
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
        let re = await this.axios.post( 'http://localhost:3000/inventory/borrow' , {  email: data.email , id: this.idcard , boxid : this.iditem , status: this.selectedStatus , SubjectID : data.SubjectID , Sec: data.Sec , DmgItem : this.selectedItemDmg} )
        // console.log(re)
        await this.axios.post('http://localhost:3000/inventory/deleteListItem/' , {
          SubjectID : data.SubjectID, 
          boxid : this.iditem, 
          Sec : data.Sec, 
          ListItem : this.selectedItemDmg, })

        alert(re.data.msg)
      },
      async CheckItem(){
        if(this.iditem != ""){
          let result = await this.axios.get('http://localhost:3000/inventory/getbox/' + this.iditem + '/'+ data.SubjectID + '/' + data.Sec) 
          // console.log(result)
          let mapdata = result.data.data.map( e => e.name )
          this.listItem = mapdata
          this.dialog = true 
        }else{
          alert('กรุณาใส่รหัสชุดอุปกรณ์')
        }
      },
      async CheckItemSubmit(){
        // console.log(this.selectedItemDmg)
        this.dialog = false 
      }
    },
  }
</script>