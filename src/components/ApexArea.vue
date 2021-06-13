<template>
  <apexchart type="area" height="230" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
  name: 'ApexArea',
  data () {
    return {
      series: [{
        name: 'Customers',
        data: [35, 23, 39, 92, 67, 32, 94, 120, 35, 23, 39, 92, 67, 32, 94, 120]
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
          text: 'Time Log Graph',
          align: 'left',
          style: {
            color: ''
          }
        },
        xaxis: {
          categories: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
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
}
</script>

<style>

</style>
