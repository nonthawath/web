<template>
  <v-container>
    <v-card>
      <v-card-title class="indigo white--text headline">
        ประวัติการยืม/คืน
      </v-card-title>
      <v-row class="pa-4" justify="space-between">
        <v-container>
          <v-treeview rounded hoverable activatable :items="items" class="text-sm-left">
          </v-treeview>

        </v-container>
      </v-row>
    </v-card>
    <!-- <v-btn @click="fetchItem">test</v-btn> -->
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'VueBarcodeTest',
  data () {
    return {
      items:[]
    }
  },
  methods: {
    logIt (data) {
      console.log('detected', data)
    }

  },
  async created() {
      var ListItem = [];
      let result = await this.axios.get('http://127.0.0.1:3000/inventory/')
      for(let i = 0;i<result.data.length;i++){
        ListItem = []
       for(let j = 0;j<result.data[i].ListItem.length;j++){
         console.log((result.data[i].ListItem[j].itemName))
         let datas = {
           id :result.data[i].ListItem[j].itemid,
           name :"Item name : "+result.data[i].ListItem[j].itemName
         }
        ListItem.push(datas)
        console.log(ListItem);
       }
        let data = {
          id :Number( result.data[i].Boxid),
          name :'วันที่ : ' + moment(result.data[i].createAt).format('DD-MM-YYYY'),
          children : ListItem
        }
        this.items.push(data)
      }
      
      return result.data
  },
}
</script>