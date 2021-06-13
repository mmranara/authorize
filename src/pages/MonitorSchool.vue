<template>
    <q-page class="container">

     <div>
        <q-separator dark inset /><q-separator dark inset /><q-separator dark inset /><q-separator dark inset /><q-separator dark inset /><q-separator dark inset />
     </div>
    <div>
      <div class="q-pa-xs">
        <q-table
          class="rowSchool"
          :data="data"
          :columns="columns"
          row-key="name"
          @row-click="onRowClick"
        >
        </q-table>
      </div>
    </div>

  <div v-if="display == true">
    <div class="row">
      <div class="col-12 q-pa-md bg-teal-10 text-white text-center">
          <span class="text-h6 ">
          Room History
          </span>
      </div>
    </div>
    <div>
      <div class="q-pa-xs">
      <q-table
        :data="studentData"
        :columns="roomColumns"
        row-key="name"
      >
      <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              v-for="(col) in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
            <q-td>
              <q-toggle
                v-model="props.row.riskState"
                color="teal"
                icon="mail"
                label=""
              />
            </q-td>
            <q-td>
              <q-toggle
                v-model="props.row.riskState"
                color="teal"
                icon="mail"
                label=""
              />
            </q-td>
            <q-td>
              <q-toggle
                v-model="props.row.riskState"
                color="teal"
                icon="mail"
                label=""
              />
            </q-td>
            <q-td>
              <q-toggle
                v-model="props.row.mail"
                color="teal"
                icon="mail"
                label=""
              />
            </q-td>
            <q-td>
              <q-btn v-if="props.row.mail == 1" flat round color = "red" icon = "mail" size ="md "  @click="deleteUser(props.row.key)"/>
            </q-td>
            <q-td>
              <q-btn flat round color = "red" icon = "delete" size ="md "  @click="deleteUser(props.row.key)"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      </div>
    </div>
  </div>
  </q-page>
</template>

<script>
import { firebaseDb } from 'src/boot/firebase'
export default {
  name: 'PageIndex',
  data () {
    return {
      search: '',
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Room',
          align: 'left',
          field: row => row.name,
          format: name => `${name}`
        },
        { name: 'timein', label: 'Time In', field: 'timein' },
        { name: 'logout', label: 'Time Out', field: 'logout' },
        { name: 'date', label: 'Teacher', field: 'date', align: 'center' },
      ],
      roomColumns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          format: name => `${name}`
        },
        { name: 'age', align: 'center', label: 'Age', field: 'age' },
        { name: 'address', align: 'center', label: 'Address', field: 'address' },
        { name: 'contact', align: 'center', label: 'Contact No.', field: 'contact' },
        { name: 'timeStamp', align: 'center', label: 'Time Stamp', field: 'timeStamp' },
        { align: 'center', label: 'Low Risk', field: '' },
        { align: 'center', label: 'Moderate Risk', field: '' },
        { align: 'center', label: 'High Risk', field: '' },
        { align: 'center', label: 'Mail', field: 'timeStamp' },
        { align: 'center', label: '', field: 'timeStamp' },
      ],
      studentData:   [],
      display: false,
      data: [
        // {
        //   name: 'COE 302',
        //   date: 'Sir. Earl',
        //   timein: '9:15 am',
        //   logout: '1:30 pm'
        // },
        // {
        //   name: 'CSM LHB',
        //   date: 'Sir. Uy',
        //   timein: '3:15 pm',
        //   logout: '4:00 pm'
        // },
        // {
        //   name: 'CASS 201',
        //   date: 'Maam Gwapa',
        //   timein: '6:00 pm',
        //   logout: '7:00 pm'
        // },
        // {
        //   name: 'CBAA 101',
        //   date: 'Maam Gwaps',
        //   timein: '7:30 pm',
        //   logout: '9:30 pm'
        // },
        // {
        //   name: 'aasf asf',
        //   date: 'asf sfa',
        //   timein: '7:3fa0asf pasdm',
        //   logout: '9:30 asfpm'
        // }
      ]
    }
  },
  methods: {
    hemlo () {
      alert('hemlo')
    },
    deleteUser (id) {
      alert(id)
    },

    onRowClick (evt, row) {
      this.display = true;

      var rooms = []
      var roomsRef = firebaseDb.ref('rooms/' + row.key + '/students')
      roomsRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
          var room = childSnapshot.val()
          var date = new Date(parseInt(room.date)).toString()
          rooms.push({ name: room.name, age: room.age, address: room.address, contact: room.contact, timeStamp: date, key: childSnapshot.key, mail: room.risk_state })
          })
      })
      this.studentData = rooms
    }
  },
  mounted () {
    var rooms = []
    var roomsRef = firebaseDb.ref('rooms')
    roomsRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var room = childSnapshot.val()
        rooms.push({ name: room.room_num, date: room.teacher, timein: room.time_in, logout: room.time_out, key: childSnapshot.key, room_history: 'Room History' })
      })
    })
    this.data = rooms
  }
}
</script>