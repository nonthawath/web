<template>
    <nav>
    
        <v-toolbar>
            <v-app-bar-nav-icon class="grey--text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
            
                <span class="font-weight-black">Inventory</span>
                <span> Management System</span>
            </v-toolbar-title>
            
            <v-spacer></v-spacer>
            <v-btn @click="scanner">
                <span>Scanner</span>
            </v-btn>
                <v-btn @click="borrowpage">ยืมอุปกรณ์</v-btn>
                <v-btn>ตรวจสอบอุปกรณ์</v-btn>
                <v-btn>รายวิชา</v-btn>
                <v-btn>จัดซื้ออุปกรณ์</v-btn>
                <v-btn @click="historyPage">ประวัติการยืมคืน</v-btn>
        
        </v-toolbar>
        <v-navigation-drawer app light :stateless="dialog" temporary v-model="drawer">
        <v-dialog v-if="drawer" v-model="dialog" lazy absolute>
      </v-dialog>
    </v-navigation-drawer>

        
        
        
    </nav>

</template>

<script>
export default {
    data() {
        return{
            drawer: false,
            dialog: false
        }

    },
    created () {
    },
    destroyed () {
    },
    methods: {
      scanner() {
        window.location = 'http://localhost:8080/scanner'
      },
      borrowpage(){
        window.location = 'http://localhost:8080/Borrow'
      },
      historyPage(){
        window.location = 'http://localhost:8080/History'
      }
    },
    
}
</script>