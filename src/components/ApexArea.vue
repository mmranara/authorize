<template>
  <apexchart type="area" height="400" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
import { mapState } from 'vuex'
import { firebaseDb } from 'src/boot/firebase'
export default {
  name: 'ApexArea',
  data () {
    return {
      id: '',
      series: [{
        name: 'Customers',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }],
      chartOptions: {
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: '',
          align: 'left',
          style: {
            color: ''
          }
        },
        xaxis: {
          categories: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'],
          labels: {
            style: {
              colors: ''
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: ''
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapState('store', ['userDetails'])
  },
  mounted () {
    var ref = firebaseDb.ref("stat_auth_cookie")
    ref.on('value', snapshot => {
        this.id = snapshot.val().id
    })
    var ref = firebaseDb.ref('users/' + this.id + '/customers')
    ref.on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        for (let i = 0; i < this.chartOptions.xaxis.categories.length; i++) {
          if ((new Intl.DateTimeFormat('en', { hour: 'numeric' }).format(childSnapshot.val().date))[0] === this.chartOptions.xaxis.categories[i][0]) {
            this.series[0].data[i] += 1
          }
        }
      })
    })

    this.chartOptions = {
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: '',
        align: 'left',
        style: {
          color: ''
        }
      },
      xaxis: {
        categories: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'],
        labels: {
          style: {
            colors: ''
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: ''
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
