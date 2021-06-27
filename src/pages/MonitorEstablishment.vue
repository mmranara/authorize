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
              <q-btn-dropdown color="teal" :label="chosen.name">
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
        <q-card fit square class="shadow-24" style="">
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
                      <q-btn v-if="props.row.mail == 1" flat round color = "red" icon = "mail" size ="md "  @click="deleteUser(props.row.key)"/>
                    </q-td>
                    <q-td>
                      <q-btn flat round color = "red" icon = "delete" size ="md "  @click="deleteUser(props.row.key)"/>
                    </q-td>
                  </q-tr>
                </template>
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
          label: 'Name',
          align: 'left',
          field: row => row.name,
          format: name => `${name}`
        },
        { align: 'center', label: 'Age', field: 'age' },
        { align: 'center', label: 'Address', field: 'address' },
        { align: 'center', label: 'Contact No.', field: 'contact' },
        { align: 'center', label: 'Time Stamp', field: 'timeStamp' },
        { align: 'center', label: 'Low Risk', field: '' },
        { align: 'center', label: 'Moderate Risk', field: '' },
        { align: 'center', label: 'High Risk', field: '' },
        { align: 'center', label: 'Mail', field: 'timeStamp' },
        { align: 'center', label: '', field: 'timeStamp' },
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

      chosen: {name: "Choose Establishment"},
      
      risk: [],
      establishments: [
      {
          storeName: '',
          key: ''
      },
      ]
    }
  },
  methods: {

      hemlo () {
      },

      deleteUser (key) {
        firebaseDb.ref('users/' + this.chosen.key + '/customers/' + key).remove()
        alert(this.chosen.key)
      },

      deleteRoom (key) {
        firebaseDb.ref('users/' + key.id + '/customers').remove()
      },

      onSelectEstablishment (est_key) {
        let temp = this.date
        this.date = ''
        this.date = temp
        var estRef = firebaseDb.ref('users/' + est_key );
        estRef.on('value', (snapshot) => {
            this.chosen = {name: snapshot.val().name, key: est_key};
        })
        var roomsRef = firebaseDb.ref('users/' + est_key + '/customers')
        roomsRef.on('value', snapshot => {
          this.data = []
          snapshot.forEach(childSnapshot => {
            var room = childSnapshot.val()
            var rye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(room.date);
            var rmo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(room.date);
            var rda = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(room.date);
            var daye = `${rye}/${rmo}/${rda}`
            var hakdog = new Date(parseInt(room.date)).toString()
            this.data.push({ name: room.name, age: room.age, address: room.address, contact: room.contact, timeStamp: hakdog, key: childSnapshot.key, day: daye })
            })
          this.letMeKnow();
        })
      }
  },
  mounted () {   
    var roomsRef = firebaseDb.ref('users')
    roomsRef.on('value', snapshot => {
      this.establishments = []
      snapshot.forEach(childSnapshot => {
        var room = childSnapshot.val()
        if(room.type != 'School')
          this.establishments.push({ storeName: room.name, key: childSnapshot.key })
      })
    })
    this.d = Date.now()
    this.ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.d);
    this.mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(this.d);
    this.da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.d);
    this.date = `${this.ye}/${this.mo}/${this.da}`
  }
}
</script>
