<template>
  <apexchart type="donut" height="500" :options="chartOptions" :series="series" />
</template>

<script>
export default {
  name: 'ApexDonut',
  data () {
    return {
      series: [32, 25, 50, 12],
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
          text: 'Age Group',
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
  }
}
</script>
