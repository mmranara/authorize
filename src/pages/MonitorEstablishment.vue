<template>

    <q-page class="bg-teal column justify-center items-center">

        <q-img src="~assets/lolz.jpg" class="menu-image fixed-center" />


      <div class="row q-pa-md">
        <q-btn-dropdown color="teal" :label="date">
          <div class="q-gutter-md items-start">
            <q-date color="teal" v-model="date" />
          </div>
        </q-btn-dropdown>

          <div class="q-pa-md">
              <q-btn-dropdown color="teal" :label="chosen">
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
      </div>

        <div class="row">
        <q-card square class="shadow-24" style="width:1000px;height:;">
            <div class="col-12 q-pa-md bg-teal-10 text-white text-center">
                <span class="text-h6 ">
                Establishments
                </span>
            </div>

            <div class="col-12 q-pt-lg text-center text-blue-grey-10">
            </div>

            <div class="q-pa-xs">
                <q-table
                :data="displayData"
                :columns="columns"
                row-key="name"
                hide-bottom
                >
                </q-table>
            </div>
            
        </q-card>
        </div>
  </q-page>
</template>

<script>
import { firebaseDb } from 'src/boot/firebase'
export default { 
  data () {
    return {
      d: '',
      ye: '',
      mo: '',
      da: '',
      data: [],
      displayData: [],
      value: '',
      letMeKnow() {
        let x = []
        for(let i = 0; i < this.data.length; i++){
          if(this.data[i].day == this.date){
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
        { align: 'center', label: 'Name', field: 'name' },
        { align: 'center', label: 'Age', field: 'age' },
        { align: 'center', label: 'Address', field: 'address' },
        { align: 'center', label: 'Contact No.', field: 'contact' },
        { align: 'center', label: 'Time Stamp', field: 'timeStamp' },
        { align: 'center', label: 'Low Risk', field: '' },
        { align: 'center', label: 'Moderate Risk', field: '' },
        { align: 'center', label: 'High Risk', field: '' }
      ],

      chosen: "Choose Establishment",

      establishments: [
      {
          storeName: '',
          key: ''
      },
      // {
      //     storeName: 'JUSSWAA',
      //     key: '19,23123'
      // }
      ]
    }
  },
  methods: {
      updateDisplay ( ){
        alert('Hemlo World')
      },
      onSelectEstablishment (est_key) {
        let temp = this.date
        this.date = ''
        this.date = temp
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
            var rye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(room.date);
            var rmo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(room.date);
            var rda = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(room.date);
            var daye = `${rye}/${rmo}/${rda}`
            rooms.push({ name: room.name, age: room.age, address: room.address, contact: room.contact, timeStamp: room.date, key: childSnapshot.key, day: daye })
            })
        })
        this.data = rooms
      }
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
    this.d = Date.now()
    this.ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.d);
    this.mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(this.d);
    this.da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.d);
    this.date = `${this.ye}/${this.mo}/${this.da}`
    this.establishments = rooms
  }
}
</script>
