<template>
  <q-page class="bg-teal row justify-center items-center">
    <q-img src="~assets/lolz.jpg" class="menu-image fixed-center" />
    <div>
      <div class="row">
        <q-card square class="shadow-24" style="width:330px;height:510px;">

      <div class="col-12 q-pa-md bg-teal-10 text-white text-center">
        <span class="text-h6 ">
          COVID-19 Updates
        </span>
      </div>

    <div class="col-12 q-pt-lg text-center text-blue-grey-10">
        <span class="text-weight-bolder">
          Northern Mindanao Cases
        </span>
    </div>
    <div class="q-pa-xs">
    <q-table
      :data="data1"
      :columns="columns1"
      row-key="name"
      hide-bottom/>
    </div>

<gb-flag
    code="fr"
    size="small"
  />
    <div class="col-12 q-pt-xs text-center text-blue-grey-10">
        <q-btn flat round color="primary" icon="flag-outline" />
        <span class="text-weight-bolder">
          Philippines Cases
        </span>
    </div>
    <div class="q-pa-xs">
    <q-table
      :data="data2"
      :columns="columns2"
      row-key="name"
      hide-bottom/>
    </div>

    <div class="col-12 q-pt-xs text-center text-blue-grey-10">
        <q-btn flat round color="primary" icon="globe-outline" />
        <span class="text-weight-bolder">
          Worldwide Cases
        </span>
    </div>
    <div class="q-pa-xs">
    <q-table
      :data="data3"
      :columns="columns3"
      row-key="name"
      hide-bottom/>
    </div>

        </q-card>
      </div>
    </div>

      <q-footer >
      <q-tabs class="bg-teal-10" style="height:50px;">
        <q-route-tab to="/stat" label="Age Group" style="width:100%;height:60px;"/>
        <q-route-tab to="/high-risk" label="Tag Status"  style="width:100%;height:60px;"/>
      </q-tabs>

  </q-footer>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      columns1: [
        { field: 'name1', label: 'Confirmed', align: 'center', headerClasses: 'text-red-10' },
        { align: 'center', label: 'Recovered', field: 'name2', headerClasses: 'text-green' },
        { align: 'center', label: 'Deaths', field: 'name3' }
      ],
      columns2: [
        { field: 'name1', label: 'Confirmed', align: 'center', headerClasses: 'text-red-10' },
        { align: 'center', label: 'Recovered', field: 'name2', headerClasses: 'text-green' },
        { align: 'center', label: 'Deaths', field: 'name3' }
      ],
      columns3: [
        { field: 'name1', label: 'Confirmed', align: 'center', headerClasses: 'text-red-10' },
        { align: 'center', label: 'Recovered', field: 'name2', headerClasses: 'text-green' },
        { align: 'center', label: 'Deaths', field: 'name3' }
      ],
      data1: [
        {
          name1: '19,093',
          name2: '16,578',
          name3: '350'
        }
      ],
      data2: [
        {
          name1: '1,193,976',
          name2: '1,131,942',
          name3: '20,169'
        }
      ],
      data3: [
        {
          name1: '167,951,168',
          name2: 'No Data',
          name3: '3,488,242'
        }
      ]
    }
  }
}
</script>
