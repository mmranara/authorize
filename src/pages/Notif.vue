<template>
    <q-page>
      <q-card class="q-pa-md">
        <dir>{{ 'Establishment Name: ' + this.user.name }}</dir>
        <dir>{{ 'Establishment Type: ' + this.user.type }}</dir>
        <dir>{{ 'Level: ' + this.user.level }}</dir>
        <dir>{{ 'Mobile Number: ' + this.user.contact }}</dir>
        <dir>{{ 'Hotline-Number: ' + this.user.contact1 }}</dir>
        <dir>{{ 'Address: ' + this.user.address }}</dir>
        <dir>{{ 'Establishment Email: ' + this.user.email }}</dir>
        <div class="q-ma-md">
          <q-btn color="blue" class="q-ma-md"  @click="acceptedSMS()">Accept</q-btn>
          <q-btn color="red" @click="rejectedSMS()">Decline</q-btn>
        </div>
      </q-card>

      <q-dialog v-model="decided" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ this.user.name }}</div>
          <div class="text-h7">has been notified through SMS</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="teal" flat label="Return" @click="deleteRequest()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    </q-page>
</template>

<script>
import { firebaseDb } from 'src/boot/firebase'
import ax from 'axios'
import q from 'qs'
export default {
  name: 'MyLayout.vue',
  data () {
    return {
      decided: false,
      leftDrawerOpen: this.$q.platform.is.desktop,
      hasNotifs: true,
      chosen: '',
      user: {},
    }
  },

  methods: {
    deleteRequest () {
      firebaseDb.ref('dummy_cookie/' + this.chosen).remove()
      firebaseDb.ref('requests/' + this.chosen).remove()
      this.$router.push('/mestablishment')
    },
    async acceptedSMS () {
      await(ax.post("https://api.twilio.com/2010-04-01/Accounts/" + 'ACcc90b2082a8b8dac1caf4497e5826e7a' + "/Messages.json", q.stringify({
        Body: 'Your Pagdumala Account Request has been approved.',
        From: '(435) 241-3632',
        To: '+63' + this.user.contact
      }), {
        auth: {
          username: 'ACcc90b2082a8b8dac1caf4497e5826e7a',
          password: '4c7fe81f0c8f549b14aadb9b19bd3ad8'
        }
      }));
      this.decided = true

    },

    async rejectedSMS () {
      await(ax.post("https://api.twilio.com/2010-04-01/Accounts/" + 'ACcc90b2082a8b8dac1caf4497e5826e7a' + "/Messages.json", q.stringify({
        Body: 'Unfortunately, your Pagdumala Account Request has been rejected.',
        From: '(435) 241-3632',
        To: '+63' + this.user.contact
      }), {
        auth: {
          username: 'ACcc90b2082a8b8dac1caf4497e5826e7a',
          password: '52d0f504e9eb1da4a92e4e603bd6df2a'
        }
      }));
      this.decided = true

    }
  },
  mounted () {
    var ref = firebaseDb.ref("dummy_cookie")
    ref.on('value', snapshot => {
        this.chosen = snapshot.val()
        var userRef = firebaseDb.ref('requests/' + this.chosen)
        userRef.on('value', snapshot => {
        let details = snapshot.val()
        this.user = ({
          name: details.name,
          type: details.type,
          level: details.level,
          contact: details.contact,
          contact1: details.contact1,
          address: details.address,
          email: details.email,
          password: details.password
        })
      })
    })
  }
}
</script>