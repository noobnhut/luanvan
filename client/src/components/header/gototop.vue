<template>
    <div class="md:flex items-center px-4 mt-2 bg-white shadow-lg rounded-lg py-4 fixed bottom-1 md:bottom-10 md:right-10"
        @click="scrollToTop">
        <img class="w-12 h-12 rounded-full mr-2" src="../../assets/login.gif" alt="Avatar">
    </div>
</template>

<script>
export default
    {
        methods: {
            scrollToTop() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }
</script>