<template>
  <v-container>
    <v-textarea
      v-model="SubjectName"
      no-resize
      rows="1"
      outlined
      label="ชื่อวิชา"
      :value="SubjectName"
    ></v-textarea>
    <v-textarea
      v-model="SubjectID"
      no-resize
      outlined
      rows="1"
      label="รหัสวิชา"
      :value="SubjectID"
    ></v-textarea>
    <v-textarea
      v-model="Sec"
      no-resize
      outlined
      rows="1"
      label="Sec"
      :value="Sec"
    ></v-textarea>
    <div>
      <v-btn style="width: 120px" color="success" @click="dialog = true"
        >เพิ่มนิสิต</v-btn
      >
    </div>

    <div>
      <v-btn
        class="mt-4"
        style="width: 120px"
        color="success"
        @click="dialog2 = true"
        >ดูรายชื่อนิสิต</v-btn
      >
    </div>

    <div>
      <v-btn class="mt-4" style="width: 120px" color="success" @click="submit"
        >อัพเดทรายวิชา</v-btn
      >
    </div>

    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            เพิ่ม Email นิสิตที่เรียน
          </v-card-title>
          <v-card-text class="my-4">
            <v-row>
              <v-col cols="12" class="px-2">
                <v-text-field
                  v-model="StudentEmail"
                  color="success"
                  outlined
                  label="Email นิสิต"
                  :value="StudentEmail"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <div class="mx-6">
            <v-btn
            class="mb-4"
              color="success"
              
              style="width: 120px"
              @click="addStudents"
              
            ><v-icon>mdi-plus</v-icon>
              เพิ่ม
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center">
      <v-dialog v-model="dialog2" width="500" height="500">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            รายชื่อนิสิต
          </v-card-title>

          <ul id="example-1">
            <li v-for="item in Students" :key="item">
              {{ item }}
            </li>
          </ul>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import data from '../data/borrow.js';
export default {
  data() {
    //.substr(0, 10),
    return {
      SubjectName: data.SubjectName,
      SubjectID: data.SubjectID,
      Students: [],
      Sec: data.Sec,
      dialog: false,
      dialog2: false,
      StudentEmail: '',
    };
  },
  async created() {
    if (this.$route.query.token) {
      let result = await this.axios.post(
        'http://localhost:3000/users/checktoken',
        { token: this.$route.query.token }
      );
      //console.log(result.data)
      //    alert(result.data.role)
      if (!result.data.login) {
        alert('Not have Token in Session');
        this.$router.push('/');
      } else {
        await this.axios
          .post('http://localhost:3000/Subjects/getStudent', {
            SubjectID: this.SubjectID,
            Sec: this.Sec,
          })
          .then((res) => {
            console.log(res);
            this.Students = res.data.data;
          });
      }
    } else {
      alert('input your token');
      this.$router.push('/');
    }
  },
  destroyed() {},
  methods: {
    async submit() {
      let response = await this.axios.post(
        'http://localhost:3000/Subjects/UpdateSubject',
        {
          Professor: data.email,
          SubjectName: this.SubjectName,
          SubjectID: this.SubjectID,
          Students: this.Students,
          Sec: this.Sec,
        }
      );
      // console.log(re)
      alert(response.data.msg);
    },
    addStudents() {
      console.log(this.Students);
      this.Students.push(this.StudentEmail);
      this.StudentEmail = '';
    },
  },
};
</script>
