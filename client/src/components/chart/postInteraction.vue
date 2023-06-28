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
                const response = await this.$axios('/post/renderinteraction');
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
                    labels: ['Thống kê bài đăng theo lượt tương tác'],
                    datasets: [
                        {
                        label: 'Tổng lượt thả tim',
                        data: [data.like],
                        backgroundColor: ['rgba(46, 159, 225, 0.2)'],
                        borderColor: ['rgba(46, 159, 225, 1)'],
                        borderWidth: 1
                    },
                        {
                        label: 'Tổng lượt bình luận',
                        data: [data.comment],
                        backgroundColor: ['rgba(3, 242, 138, 0.2)'],
                        borderColor: ['rgba(3, 242, 138, 1)'],
                        borderWidth: 1
                    }, {
                        label: 'Tổng lượt lưu bài đăng',
                        data: [data.save],
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