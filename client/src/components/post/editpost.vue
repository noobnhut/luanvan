<template>
    <div>
      <h2>Chỉnh sửa bài viết {{ postId }}</h2>
      <!-- Các thành phần chỉnh sửa bài viết -->
    </div>
  </template>
  
  <script>

  export default {
    props: ['postId'], // Khai báo prop postId
    data() {
        return {
           
        }
    },
    mounted()
    {
        console.log(this.postId)
    }
  };
  </script>