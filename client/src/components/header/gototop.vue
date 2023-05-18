<template>
    <a @click="smoothScroll" class="fixed bottom-10 right-10 ">
          <img class="w-8 h-8 md:w-12 md:h-12 rounded-full mr-2" src="../../assets/login.gif" alt="Avatar"></a>
</template>

<script>
export default {
  methods: {
    smoothScroll() {
      // Thực hiện scroll mượt đến vị trí mong muốn
      // Ví dụ: scroll đến phần tử có id là 'target-element' trong 500ms
      const targetElement = document.getElementById('app');
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth',
          duration: 500
        });
      }
    }
  }
};
</script>

