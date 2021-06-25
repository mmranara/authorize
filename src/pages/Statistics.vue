<template>
    <q-page class="container">
    
   <div class="q-pa-md">

      <div class="q-gutter-md q-mb-lg column" style="max-width: 500px">
        <q-input class="" v-model="searchModel" label="Search" color="teal"/>
      </div>

      <div class="row">
        <q-btn-dropdown color="teal" :label="date">
          <div class="q-gutter-md col items-start">
            <q-date color="teal" v-model="date" />
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown class = "q-ml-md" color="teal" :label="chosen">
        <q-list>
            <q-item
              v-for = "stores in establishments"
              :key="stores.key"
              clickable v-close-popup @click="onSelectEstablishment(stores.key)">
            <q-item-section>
                <q-item-label>{{stores.storeName}}</q-item-label>
            </q-item-section>
            </q-item>
        </q-list>
        </q-btn-dropdown>
      </div>

     <div>
        <q-separator dark inset /><q-separator dark inset /><q-separator dark inset /><q-separator dark inset /><q-separator dark inset /><q-separator dark inset />
     </div>

    

      <q-card class="fit">
        <div class="text-h5 q-ma-md row justify-center items-center">{{ chosen }}</div>
        <div
          class="row q-col-gutter-md q-px-md q-py-md"
          key="allCharts"
        >
          <q-card class="q-ma-md fit q-pa-xl">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <apex-donut></apex-donut>
            </div>
          </q-card>

          <q-card class="q-ma-md fit q-pa-xl">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <apex-area></apex-area>
            </div>
          </q-card>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import CardBase from 'components/CardBase'
import { mapState, mapActions } from 'vuex'
import { firebaseDb } from 'src/boot/firebase'
export default {
  name: 'PageIndex',
  components: {
    ApexArea: () => import('components/ApexArea'),
    ApexDonut: () => import('components/ApexDonut')
  },
  data () {
    return {
      d: '',
      ye: '',
      mo: '',
      da: '',
      date: '',
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
      ],
      searchModel: '',
      chosen: "Choose Establishment",
      establishments: [
      {
        storeName: '',
        key: ''
      },]
    }
  },
  computed: {
    ...mapState('store', ['userDetails'])
  },
  methods: {
    onSelectEstablishment (est_key) {
      var current_Est
      var estRef = firebaseDb.ref('users/' + est_key + '/name');
      firebaseDb.ref('stat_auth_cookie').set(est_key)
      estRef.on('value', (snapshot) => {
          this.chosen = snapshot.val();
      })
      
      var rooms = []
      var roomsRef = firebaseDb.ref('users/' + est_key + '/customers')
      roomsRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
          var room = childSnapshot.val()
          var date = new Date(parseInt(room.date)).toString()
          rooms.push({ name: room.name, age: room.age, address: room.address, contact: room.contact, timeStamp: date, key: childSnapshot.key })
          })
      })
      this.data = rooms
    },

  },
  mounted () {
    var rooms = []
    var roomsRef = firebaseDb.ref('users')
    roomsRef.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var room = childSnapshot.val()
        rooms.push({ storeName: room.name, key: childSnapshot.key })
      })  
    })
    this.establishments = rooms
    this.d = Date.now()
    this.ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.d);
    this.mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(this.d);
    this.da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.d);
    this.date = `${this.ye}/${this.mo}/${this.da}`
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
