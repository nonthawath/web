<template>
  <div>
    <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  </div>
</template>
<script>

export default {
  name: 'VueBarcodeTest',
  data () {
    return {
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
          { text: 'วันที่', value: 'borrow_at' },
          { text: 'สถานะ', value: 'status' },
        ],
        users:[]
    }
  },
  methods: {
    logIt (data) {
      console.log('detected', data)
    }

  },
  async created() {
      console.log('a')
      let result = await this.axios.get('http://localhost:3000/inventory/getallhistory') 
      let oldFormat = result.data.data
      let newformat = oldFormat.map( el => {
        el.borrow_at = el.borrow_at.replace("T" , " ").substr(0 , 19)
        el.borrow_by_id = el.borrow_by_id.substr( 3 , 10)
        return el
      })
      this.users = newformat
        //   this.name = result.data.username
        //   this.email = result.data.email
      console.log(result)
  },
}
</script>