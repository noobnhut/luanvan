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
                const response = await this.$axios('/post/renderbytype');
                const data = response.data;
                this.showChart(data);
            } catch (error) {
                console.error(error);
            }
        },
        showChart(data) {
            const chartCanvas = this.$refs.chartCanvas;
            const chart = new Chart(chartCanvas, {
                type: 'pie',
                data: {
                    labels: [],
                    datasets: [
                        {
                        label: [],
                        data: [data.share,data.trade,data.search],
                        backgroundColor: ['rgba(46, 159, 225, 0.2)','rgba(3, 242, 138, 0.2)','rgba(255, 0, 102, 0.2)'],
                        borderColor: ['rgba(46, 159, 225, 1)'],
                        borderWidth: 1
                    },
                        ]
                },
                options: {
                    tooltips: {
                        mode: 'nearest',
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                    return previousValue + currentValue;
                                });
                                var currentValue = dataset.data[tooltipItem.index];
                                var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                                return percentage + "%";
                            }
                        }
                    },
                    // bỏ thuộc tínhscales.y
                }
            });

            // Thêm tên cho từng phần tử
            chart.data.labels.push('Chia sẽ');
            chart.data.labels.push('Trao đổi');
            chart.data.labels.push('Tìm kiếm');

            // Cập nhật biểu đồ
            chart.update();
        }
    }
};
</script>