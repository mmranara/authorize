<template>
<q-page class="bg-teal window-height:100% row justify-center items center ">
  <q-img src="~assets/lolz.jpg" class="menu-image fixed-center" />
    <q-stepper
    style="width:100%;height:55px"
      v-model="step"
      ref="stepper"
      alternative-labels
      color="primary"
      animated
    >
     
    </q-stepper>

 <div class="column q-pa-md">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:910px;">

          <q-card-section class="bg-teal-10">
              <div class="q-pa-xs">
        <q-img src="~assets/z.png"/></div>
          </q-card-section>

          <q-card-section>
              <q-form
                  @submit="onSubmit"
                  class="q-gutter-md">

          <q-input
            bg-color="grey-4"
            filled
            v-model="formData.name"
            label="Name of Authorize User* "
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          
         <q-input
            bg-color="grey-4"
            filled
            v-model="formData.contact"
            label="Mobile Number *"
            hint="09xx-xxx-xxxx"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

       <q-input
            bg-color="grey-4"
            filled
            v-model="formData.address"
            label="Your complete address *"
            hint="Street, Baranggay, City, Province"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
         />

        <q-input
            bg-color="grey-4"
            filled
            v-model="formData.email"
            label="Input email*"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

        <q-input bg-color="grey-4" v-model="formData.password" filled :type="isPwd1 ? 'password' : 'text'" label="Password *" hint="Combination of letters & numbers">
          <template v-slot:append>
            <q-icon
              :name="isPwd1 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd1 = !isPwd1"/>
          </template>
        </q-input>

          <div class="q-pa-xs">
            <q-card-actions class="q-pa-sm flex flex-center">

            <q-btn
              style="width:100px;height:40px;"
              type="submit"
              unelevated
              size="md"
              color="teal-10"
              class="text-white"
              label="Continue"
            />

            <q-btn to="/" style="width:100px;height:40px;" flat unelevated size="md" label="Back" />
            </q-card-actions>
           </div>
          </q-form>
         </q-card-section>
       </q-card>
      </div>
    </div>
</q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignupPage.vue',
  data () {
    return {
      step: 1,
      formData: {
        name: '',
        contact: '',
        address: '',
        password: '',
        email: ''
      },
      isPwd1: true,
      select: null,
      options: [
        'Mall', 'Bank', 'Church', 'City Hall', 'School', 'Market', 'Supermarket', 'Department Store', 'Convenience Store', 'Hotel', 'Hospital', 'Government Office', 'Restaurant', 'Pharmacy/Drugstore', 'Other'
      ],
      Select: null,
      Options: [
        'Level I', 'Level II', 'Level III'
      ]
    }
  },
  methods: {
    ...mapActions('store', ['registerUser']),
    onSubmit () {
      this.registerUser(this.formData)
    }
  }
}
</script>

<style>
</style>
