<template>
    <q-page class="container">
    
   <div class="q-pa-md">

      <div class="q-gutter-md q-mb-lg row justify-center items-center" style="max-width: 500px">
        <q-input class="" v-model="searchModel" label="Search" color="teal"/>
      </div>

      <q-btn-dropdown color="teal" :label="date">
        <div class="q-gutter-md row items-start">
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

     <div>
        <q-separator dark inset /><q-separator dark inset /><q-separator dark inset /><q-separator dark inset /><q-separator dark inset /><q-separator dark inset />
     </div>

    

      <q-card class="">
        <div class="text-h5 q-ma-md row justify-center items-center">{{ chosen }}</div>
        <div
          class="row q-col-gutter-md q-px-md q-py-md"
          key="allCharts"
        >
          <q-card class="q-ma-md q-pa-xl">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <apex-donut></apex-donut>
            </div>
          </q-card>

          <q-card class="q-ma-md q-pa-xl">
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
        //   firebaseDb.ref('users/' + est_key + '/customers').push({
        //     date: '1622581502725',
        //     contact: '09123456789',
        //     address: 'Iligan City',
        //     age: '20',
        //     name: 'Kenan Cinches'
        //  })
        //     firebaseDb.ref('users/' + est_key + '/customers').push({
        //     date: '1622581502725',
        //     contact: '09987654321',
        //     address: 'Pagadian City',
        //     age: '20',
        //     name: 'Trisha Juntado'
        //  })
      var current_Est
      var estRef = firebaseDb.ref('users/' + est_key + '/name');
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
