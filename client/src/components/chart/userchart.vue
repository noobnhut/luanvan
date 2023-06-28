<template>
  <div>
      <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'App',
  mounted() {
      this.fetchData();
  },
  methods: {
      async fetchData() {
          try {
              const response = await this.$axios('/user/getIsUser');
              const data = response.data;
              this.showChart(data);
          } catch (error) {
              console.error(error);
          }
      },
      showChart(data) {
          const chartCanvas = this.$refs.chartCanvas;
          const chart = new Chart(chartCanvas, {
              type: 'bar',
              data: {
                  labels: ['Thống kê danh sách người dùng'],
                  datasets: [
                      {
                      label: 'Tổng số tài khoản',
                      data: [data.sumAccount],
                      backgroundColor: ['rgba(46, 159, 225, 0.2)'],
                      borderColor: ['rgba(46, 159, 225, 1)'],
                      borderWidth: 1
                  },
                      {
                      label: 'Tài khoản hoạt động',
                      data: [data.active],
                      backgroundColor: ['rgba(3, 242, 138, 0.2)'],
                      borderColor: ['rgba(3, 242, 138, 1)'],
                      borderWidth: 1
                  }, {
                      label: 'Tài khoản bị khóa',
                      data: [data.block],
                      backgroundColor: ['rgba(255, 0, 102, 0.2)'],
                      borderColor: ['rgba(255, 0, 102, 1)'],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true
                      },
                      
                  }
              }
          });
      }
  }
};
</script>