<template>
  <apexchart type="polarArea" height=200 :options="chartOptions" :series="series"/>
</template>

<script>
export default {
  name: 'ApexPolarMap',
  data () {
    return {
      series: [14, 23, 21, 17, 15],
      chartOptions: {
        labels: ['Gaisano Iligan City', 'Infinitea', 'Robinson', 'Yeah', 'IVofSpades'],
        title: {
          text: 'Establishments',
          align: 'left',
          style: {
            color: ''
          }
        },
        chart: {
          type: 'polarArea',
          toolbar: {
            show: true
          }
        },
        stroke: {
          colors: ['']
        },
        legend: {
          labels: {
            colors: ''
          },
          offsetY: -1
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
