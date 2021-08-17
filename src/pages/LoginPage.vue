<template>
  <q-page class="bg-teal row justify-center items-center">
  <q-img src="~assets/lolz.jpg" class="menu-image fixed-center" />
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:450px;">
          <q-card-section class="bg-teal-10">

       <div class="q-pa-xs q-my-sm">
        <q-img src="~assets/z.png"/>
       </div>
          </q-card-section>

          <q-card-section>
            <q-form
                  @submit="onSubmit"
                  class="q-px-sm q-pt-sm">

              <q-input v-model="formData.email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>

              <q-input v-model="formData.password" label="Password" :type="isPwd ? 'password' : 'text'">
                <template v-slot:prepend>
                    <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"/>
                </template>
              </q-input>

      <div class="q-pt-md">
          <q-card-actions class="q-pa-xs q-pt-lg">
            <q-btn type="submit"  unelevated size="lg" color="teal-10" class="full-width text-white" label="Sign In" />
          </q-card-actions>
      </div>

            </q-form>
          </q-card-section>

    <q-form class="q-px-xs q-pt-xs">
          <q-card-actions class="q-pa-md">
            <router-link v-bind:to="'/signup'"  class='text-grey-10'>Create an Account</router-link>
          </q-card-actions>
    </q-form>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginPage.vue',
  data () {
    return {
      formData: {
        email: '',
        password: ''
      },
      isPwd: true
    }
  },
  methods: {
    ...mapActions('store', ['loginUser']),
    onSubmit () {
      this.loginUser(this.formData)
    }
  }
}
</script>
