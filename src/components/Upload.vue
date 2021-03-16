<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          หยิบของตามหมายเลข
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          ถ่ายรูปคู่กับอุปกรณ์
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> ถ่ายรูปบัตรนิสิต </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" color="grey lighten-1" height="200px">
            <v-select
              class="pa-6"
              v-model="value"
              :items="choice"
              
              solo
            ></v-select>
          </v-card>

          <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px">
            <v-btn color="success" class="mt-4"> Upload </v-btn>
          </v-card>
          <v-btn color="error" @click="e1 = 1"> Previous </v-btn>
          <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px">
            <v-btn color="success" class="mt-4"> Upload </v-btn>
          </v-card>
          <v-btn color="error" @click="e1 = 2"> Previous </v-btn>
          <v-btn color="primary"> Continue </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      e1: 1,
      choice: ["No.1", "No.2", "No.3"],
      value: "No.1",
    };
  },
};
</script>