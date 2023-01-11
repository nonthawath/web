<template>
  <v-container>
  <div>
      <p style="font-size: 25px;font-weigth:bold"> userManagement </p>
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
            
          </v-card-title>  
        <v-card>
          
            <v-btn type="submit" @click="updateRole"> update role to Professor </v-btn>
            <v-btn type="submit" @click="deleteUser"> delete user </v-btn>
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
            text: 'email',
            align: 'start',
            sortable: false,
            value: 'email',
          },
          { text: 'role', value: 'role' },
        ],
        users:[],
        email: ""
    }
  },
  methods: {
    logIt (data) {
      console.log('detected', data)
    },
    getrowData(value){
        this.email = value.email
        this.dialog = true
      // console.log( 'row Value ' , this.dialog , value.listItem)
    },
    async updateRole() {
        await this.axios.post('http://localhost:3000/users/updateRoleToProfessor/', { email: this.email })
         await this.fetchUsers()
        this.dialog = false 
      },
    async deleteUser() {
        await this.axios.post('http://localhost:3000/users/deleteUser/', { email: this.email }) 
         await this.fetchUsers()
        this.dialog = false
      },
    async fetchUsers() {
      let result = await this.axios.get('http://localhost:3000/users/getAllUser/') 
      this.users = result.data.users
      this.email = ""
      console.log("result", result.data.users)
    }

  },
  async created() {
    await this.fetchUsers()
  },
}
</script>