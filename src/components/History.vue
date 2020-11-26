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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        id: 1,
        name: "วันนี้ 9/9/2009 :",
        children: [
          { id: 2, name: "ยืม : 10:20:70", children: [
            { id: 1, name: "ชื่อ ฟหกด่าสว" },
            { id: 2, name: "รหัสนิสิต : 1212312121" },
          ]},
        ],
      },
       {
        id: 2,
        name: "วันนี้ 10/9/2009 :",
        children: [
          { id: 2, name: "ยืม : 10:20:70", children: [
            { id: 1, name: "ชื่อ ฟหกด่าสว" },
            { id: 2, name: "รหัสนิสิต : 1212312121" },
          ]},
        ],
      }
    ],
  }),
};
</script>