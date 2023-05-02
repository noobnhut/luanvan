<template>
    <navbar />
    <div class="grid grid-cols-4 gap-4  ">
        <div class="py-2 col-span-1 mx-2 md:mx-4 lg:mx-8 ">
           <information/>
        </div>
        <div class=" p-4 lg:col-span-2 md:col-span-2 col-span-3 ">
            <inputform />
            <post />
        </div>
        <div class=" p-4 hidden md:block lg:block md:col-span-1 lg:col-span-1">
       <rightnav/>
        </div>
    </div>
    <gototop />
</template>
  
<script>
import navbar from '../components/navbar.vue';
import post from '../components/post.vue';
import gototop from '../components/gototop.vue';
import inputform from '../components/inputform.vue';
import rightnav from '../components/rightnav.vue';
import information from '../components/information.vue'
export default
    {
        components:
        {
            navbar,
            post,
            gototop,
            inputform,
            rightnav,
            information

        }
    }
</script>
  
  