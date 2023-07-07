<template>
  <div>
    <h1>{{ currentTime }}</h1>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      currentTime: null
    };
  },
  mounted() {
    this.updateTime(); // Gọi updateTime() ngay khi component được mounted

    // Tính thời gian còn lại đến 19h30 của ngày hôm nay
    const now = dayjs();
    const targetTime = dayjs().set('hour', 19).set('minute', 22).set('second', 0);
    let timeUntilNextUpdate = targetTime.diff(now);

    if (timeUntilNextUpdate < 0) {
      // Nếu thời gian đã qua 19h30, tính thời gian còn lại cho đến 19h30 của ngày mai
      const tomorrow = now.add(1, 'day').startOf('day').set('hour', 22).set('minute', 30).set('second', 0);
      timeUntilNextUpdate = tomorrow.diff(now);
    }

    // Sử dụng setTimeout() để chờ đến 19h30
    setTimeout(() => {
      this.updateTime();

      // Sử dụng setInterval() để cập nhật dữ liệu hàng ngày vào 19h30
      setInterval(() => {
        this.updateTime();
      }, 24 * 60 * 60 * 1000);
    }, timeUntilNextUpdate);
  },
  methods: {
    updateTime() {
      const now = dayjs();
      this.currentTime = now.format('HH:mm:ss');
      console.log('resher')
    }
  }
};
</script>
