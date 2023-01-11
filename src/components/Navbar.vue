<template>
  <div>
    <!-- color="#2ECC71" -->
    <v-app-bar clipped-left fixed app color="#fff" dark>
      <v-app-bar-nav-icon > </v-app-bar-nav-icon>
      <v-col>
        <v-toolbar-title
          class="text-uppercase black--text"
          style="text-align: left"
        >
          <span class="font-weight-black">Inventory</span>
          <span> Management System</span>
        </v-toolbar-title>
      </v-col>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" color="success" text
        ><v-icon>mdi-account-circle</v-icon>{{ name }}</v-btn
      >
      <v-btn color="success" text>
        <v-icon>mdi-briefcase-variant</v-icon>{{ role }}</v-btn
      >
    </v-app-bar>
    <v-navigation-drawer clipped fixed app permanent touchless>
      
      <v-list>
        <template v-for="(i, index) in menu">
          
          <v-list-item :key="index" color="primary" :to="i.to+$route.query.token" class="">
              <!-- <v-list-item-action class="ml-6">
                
                {{index+1}}
              </v-list-item-action> -->
            <v-list-item-content class="ml-n5">
              <v-list-item-title class="ml-4 text-left" >
                <span class="num-Box">{{ index + 1 }} </span
                >{{i.name}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <!-- <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title" style="text-align: left">
            {{ role }}
          </v-list-item-title>
          <v-list-item-subtitle style="text-align: left">
            Email : {{ name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->
      <!-- <v-flex class="mt5">
        <div
          color="#292929"
          @click="getsubject"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          เลือกรายวิชา
        </div>
        <div
          color="#292929"
          v-if="role !== 'Student'"
          @click="CreateSubject"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          สร้างรายวิชา
        </div>
        <div
          color="#292929"
          v-if="role !== 'Student'"
          @click="EditSubject"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          แก้ไขรายวิชา
        </div>
        <div
          color="#292929"
          v-if="role !== 'Student'"
          @click="borrowpage"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          ยืมอุปกรณ์
        </div>
        <div
          v-if="role !== 'Student'"
          @click="table"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          สถานะอุปกรณ์
        </div>
        <div
          v-if="role !== 'Student'"
          @click="history"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          ประวัติการยืม
        </div>
        <div
          v-if="role !== 'Student'"
          @click="historyNoneTA"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          ประวัติการยืม( None TA)
        </div>
        <div
          v-if="role !== 'Student'"
          @click="createBox"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          จัดชุดอุปกรณ์
        </div>
        <div
          v-if="role !== 'Student'"
          @click="queue"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          กำหนดเวลาการจอง
        </div>
        <div
          @click="upload"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          อัพโหลดรูปภาพ
        </div>
        <div
          @click="showq"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          แสดงเวลาการจอง
        </div>
        <div
          @click="qstudent"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          แสดงตารางการจอง
        </div>
        <div
          @click="logout"
          style="
            background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
            border-radius: 10px;
            margin: 10px;
            cursor: pointer;
          "
        >
          logout
        </div>
      </v-flex> -->

      <v-dialog v-if="drawer" v-model="dialog" lazy absolute> </v-dialog>
    </v-navigation-drawer>
  </div>
</template>

<script>
import data from '../data/borrow.js';
import EventBus from '../event-bus.js';
export default {
  data() {
    return {
      drawer: false,
      dialog: false,
      name: '',
      menu: [
        {
          name: 'เลือกรายวิชา',
          to: '/GetSubject?token=' + data.token,
        },
        {
          name: 'สร้างรายวิชา',
          to: '/CreateSubject?token=' + data.token,
        },
        {
          name: 'แก้ไขรายวิชา',
          to: '',
        },
        {
          name: 'ยืมอุปกรณ์',
          to: '',
        },
        {
          name: 'สถานะอุปกรณ์',
          to: '',
        },
        {
          name: 'ประวัติการยืม',
          to: '',
        },
        {
          name: 'ประวัติการยืม( None TA)',
          to: '',
        },
        {
          name: 'จัดชุดอุปกรณ์',
          to: '',
        },
        {
          name: 'กำหนดเวลาการจอง',
          to: '',
        },
        {
          name: 'อัพโหลดรูปภาพ',
          to: '',
        },
        {
          name: 'แสดงเวลาการจอง',
          to: '',
        },
        {
          name: 'แสดงตารางการจอง',
          to: '',
        },
      ],
      role: data.role,
      tkn: data.token,
    };
  },
  async created() {
    console.log('Role :=> in nav bar', data.role);
    this.role = data.role;
    this.tkn = data.token;
    console.log(this.pathcreatebox);
    // let result = await this.axios.post( 'http://localhost:3000/users/checktoken' , { token : data.token })
    this.name = data.email;
  },
  destroyed() {},
  methods: {
    scanner() {
      // window.location = 'http://localhost:8080/scanner'
      this.$router.push('/scanner?token=' + data.token);
    },
    borrowpage() {
      // window.location = 'http://localhost:8080/Borrow&token=' + data.token
      // await this.$nextTick();
      this.$router.push('/Borrow?token=' + data.token);
    },
    createBox() {
      this.$router.push('/createBox?token=' + data.token);
      // window.location = 'http://localhost:8080/Borrow'
    },
    table() {
      this.$router.push('/table');
      // window.location = 'http://localhost:8080/Borrow'
    },
    history() {
      this.$router.push('/tablehistory');
      // window.location = 'http://localhost:8080/Borrow'
    },
    logout() {
      // this.$router.push('/' )
      window.location = 'http://localhost:8080/';
    },
    queue() {
      // this.$router.push('/' )
      this.$router.push('/Queue?token=' + data.token);
    },
    upload() {
      // this.$router.push('/' )
      this.$router.push('/Upload?token=' + data.token);
    },
    showq() {
      // this.$router.push('/' )
      this.$router.push('/ShowQueue?token=' + data.token);
    },
    qstudent() {
      // this.$router.push('/' )
      this.$router.push('/QueueStudent?token=' + data.token);
    },
    historyNoneTA() {
      this.$router.push('/Histtoryborrow?token=' + data.token);
    },
    getsubject() {
      this.$router.push('/GetSubject?token=' + data.token);
    },
    CreateSubject() {
      this.$router.push('/CreateSubject?token=' + data.token);
    },
    EditSubject() {
      this.$router.push('/EditSubject?token=' + data.token);
    },
  },
  mounted() {
    // console.log('Role :=> in nav bar' ,data.role)
    this.role = data.role;
    EventBus.$on('update_nav', (payLoad) => {
      this.role = data.role;
      this.name = payLoad;

      console.log('update Event ', this.role, this.name);
    });
  },
};
</script>

<style>
.navbarmenu {
  background-color: red;
}
.num-Box {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  margin-right: 7px;
  width: 24px;
  height: 24px;
  background: rgb(212, 212, 212);
  border-radius: 2px;
}
</style>
