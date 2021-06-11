<template>

    <q-page class="bg-teal column justify-center items-center">

        <q-img src="~assets/lolz.jpg" class="menu-image fixed-center" />

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
                :data="data"
                :columns="columns"
                row-key="name"
                hide-bottom
                />
            </div>
            
        </q-card>
        </div>

        <q-footer >
            <q-tabs class="bg-teal-10" style="height:50px;">
                <q-route-tab to="/stat" label="Age Group" style="width:100%;height:60px;"/>
                <q-route-tab to="" label="Tag Status"  style="width:100%;height:60px;"/>
            </q-tabs>
        </q-footer>
  </q-page>
</template>

<script>
import { firebaseDb } from 'src/boot/firebase'
export default { 
  data () {
    return {
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

      data: [
        // {
        //     name: 'asfasfasf',
        //     age: 'asd',
        //     address: 'asf',
        //     contact: 'as',
        //     timeStamp: 'asdas'
        // },
        // {
        //     name: 'asfasfasf',
        //     age: 'asd',
        //     address: 'asf',
        //     contact: 'as',
        //     timeStamp: 'asdas'
        // }
        ],

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
    this.establishments = rooms
  }
}
</script>
