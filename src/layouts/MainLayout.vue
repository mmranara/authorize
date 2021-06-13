<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-teal-10">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title  class="text-bold">
          <q-img src="~assets/logo.png" style="width:40px"></q-img>
        </q-toolbar-title>


        <div class="q-pa-md">
          <q-btn flat round color="white" label="" icon = "notifications">
            <q-badge rounded v-if="hasNotifs == true" color="red" floating>3</q-badge>
            <q-menu>
               <div class="q-pa-md" style="max-width: 550px">
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Infinitea</q-item-label>
                      <q-item-label caption ckass = "text-h7">Convenience Store</q-item-label>
                      <q-item-label>
                          <q-btn size = "xs" class ="q-mr-xs" color="blue">Accept</q-btn> 
                          <q-btn size = "xs" class ="q-mr-xs" color="red">Decline</q-btn>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />

                  <q-item>
                    <q-item-section>
                      <q-item-label>G7</q-item-label>
                      <q-item-label caption ckass = "text-h7">School</q-item-label>
                      <q-item-label>
                          <q-btn size = "xs" class ="q-mr-xs" color="blue">Accept</q-btn> 
                          <q-btn size = "xs" class ="q-mr-xs" color="red">Decline</q-btn>
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />

                  <q-item>
                    <q-item-section>
                      <q-item-label>D'Morvie</q-item-label>
                      <q-item-label caption ckass = "text-h7">Restaurant</q-item-label>
                      <q-item-label>
                          <q-btn size = "xs" class ="q-mr-xs" color="blue">Accept</q-btn> 
                          <q-btn size = "xs" class ="q-mr-xs" color="red">Decline</q-btn>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-menu>
          </q-btn>
        </div>

        <q-btn
            outline
            rounded
            v-if="!userDetails.userId"
            dense icon="account_circle"
            size="md"
            class="q-pa-xs"
            no-caps
            label="Login">
        </q-btn>

        <q-btn
        outline
            rounded
            v-else
            @click="logoutUser"
            to='/'
            dense icon="account_circle"
            size="md"
            class="q-pr-sm "
            no-caps>
            Logout<br>
            {{ userDetails.name }}
        </q-btn>


      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="220"
   >
      <q-list>
        <q-item clickable class="bg-teal-10" style="height:50px;">
          <q-item-section class="text-grey-3">
            <q-item-label>MENU</q-item-label>
          </q-item-section>
          <q-img src="~assets/lol.png" class="menu-image absolute-top"  />
        </q-item>

        <q-item clickable to="/stat" exact active-class="text-teal">
          <q-item-section avatar>
            <q-icon name="poll" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Statistics</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/mestablishment" exact active-class="text-teal">
          <q-item-section avatar>
            <q-icon name="monitor" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Monitor Establishment</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/mschool" exact active-class="text-teal">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Monitor School</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MyLayout.vue',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      hasNotifs: true
    }
  },
  computed: {
    ...mapState('store', ['userDetails'])
  },
  methods: {
    ...mapActions('store', ['logoutUser'])
  }

}
</script>

<style lang="sass">
.q-toolbar
.q-btn
  line-height: 1.2

.menu-image
  height: 100%
  opacity: 0.2
  filter: grayscale(100%)

.header-image
  height: 100%
  opacity: 0.2
  filter: grayscale(100%)
</style>
