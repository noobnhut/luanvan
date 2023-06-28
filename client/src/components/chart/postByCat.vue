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
                const response = await this.$axios('/post/renderbycat');
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
                    labels: [],
                    datasets: [
                        {
                            label: 'Số lượng bài viết',
                            data: [],
                            backgroundColor: 'rgba(46, 159, 225, 0.2)',
                            borderColor: 'rgba(46, 159, 225, 1)',
                            borderWidth: 1
                        },
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

            // Add data points to the chart
            data.forEach(item => {
                chart.data.labels.push(`Danh mục: ${item.Category.cat_name}`);
                chart.data.datasets[0].data.push(item.PostCount);
            });

            // Update the chart
            chart.update();
        }
    }
};
</script>