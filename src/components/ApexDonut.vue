<template>
  <apexchart type="donut" height="400" :options="chartOptions" :series="series" />
</template>

<script>
import { mapState } from 'vuex'
import { firebaseDb } from 'src/boot/firebase'
export default {
  name: 'ApexDonut',
  data () {
    return {
      series: [0, 0, 0, 0],
      chartOptions: {
        colors: ['#42aeb8', '#053c58', '#92c9c3', '#f2716c'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },

        chart: {
          toolbar: {
            show: true
          }
        },
        title: {
          text: '',
          align: 'left',
          style: {
            color: ''
          }
        },
        labels: ['Children', 'Youth', 'Adult', 'Senior'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 250
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        legend: {
          labels: {
            colors: ''
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
        var room = childSnapshot.val()
        if (room.age < 18) {
          this.series[0] += 1
        } else if (room.age >= 18 && room.age <= 35) {
          this.series[1] += 1
        }
        if (room.age >= 36 && room.age <= 55) {
          this.series[2] += 1
        }
        if (room.age >= 56) {
          this.series[3] += 1
        }
      })
    })
    this.chartOptions = {
      colors: ['#42aeb8', '#053c58', '#92c9c3', '#f2716c'],
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000
      },

      chart: {
        toolbar: {
          show: true
        }
      },
      title: {
        text: '',
        align: 'left',
        style: {
          color: ''
        }
      },
      labels: ['Youth (<18)', 'Young Adult (18 to 35)', 'Adult (36 to 55)', 'Senior (56 and up)'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 250
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      legend: {
        labels: {
          colors: ''
        }
      }
    }
  }
}
</script>
