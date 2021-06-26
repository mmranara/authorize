<template>
    <q-page class="container">

     <div>
        <q-separator dark inset /><q-separator dark inset /><q-separator dark inset /><q-separator dark inset /><q-separator dark inset /><q-separator dark inset />
     </div>

    <q-btn-dropdown color="teal" :label="date">
          <div class="q-gutter-md items-start">
            <q-date color="teal" v-model="date" />
          </div>
        </q-btn-dropdown>

    <div>
      <div class="q-pa-xs">
        <q-table
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
                v-model="risk[0]"
                color="teal"
                icon="mail"
                label=""
              />
            </q-td>
            <q-td>
              <q-toggle
                v-model="risk[1]"
                color="teal"
                icon="mail"
                label=""
              />
            </q-td>
            <q-td>
              <q-toggle
                v-model="risk[2]"
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
              <q-btn v-if="props.row.mail == 1" flat round color = "red" icon = "mail" size ="md "  @click="deleteUser(props.row)"/>
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

      letMeKnow() {
        let x = []
        for(let i = 0; i < this.data.length; i++){
          if(this.data[i].day === this.date){
            x.push(this.data[i])
          }
        }
        this.displayData = x
      },
      get date() {
        return this.value;
      },
      set date(value) {
        this.value = value;
        this.letMeKnow();
      },

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
      risk: [],
      display: false,
      data: [
      ]
    }
  },
  methods: {
    hemlo () {
    },

    deleteUser (id) {
    },

    deleteRoom (key) {
      let index = this.data.indexOf(key)
      firebaseDb.ref('users/' + 'hxs2enq2CqSB1ii60ZdeIvUioj72' + '/rooms/' + key.id).remove()
    },
    onRowClick (evt, row) {
      this.display = true;

      var rooms = []
      var roomsRef = firebaseDb.ref('users/' + 'hxs2enq2CqSB1ii60ZdeIvUioj72' + '/rooms/' + row.key + '/students')
      roomsRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
          var room = childSnapshot.val()
          var date = new Date(parseInt(room.date)).toString()
          rooms.push({ name: room.name, age: room.age, address: room.address, contact: room.contact, timeStamp: date, key: childSnapshot.key })
          })
      })
      this.studentData = rooms
    }
  },

  

  mounted () {
    var rooms = []
    var roomsRef = firebaseDb.ref('users/' + 'hxs2enq2CqSB1ii60ZdeIvUioj72' + '/rooms')
    roomsRef.on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var room = childSnapshot.val()
        rooms.push({ name: room.room_num, date: room.teacher, timein: room.time_in, logout: room.time_out, key: childSnapshot.key, room_history: 'Room History' })
      })
    })
    this.data = rooms
    this.d = Date.now()
    this.ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.d);
    this.mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(this.d);
    this.da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.d);
    this.date = `${this.ye}/${this.mo}/${this.da}`
    this.establishments = rooms
  }
}
</script>