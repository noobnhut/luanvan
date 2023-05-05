<template>
    <navbar />
    <div class="min-[900px]:grid grid-cols-4 gap-4  ">
        <div class="py-2 col-span-1 mx-2 md:mx-4 lg:mx-8 ">
           <information/>
        </div>
        <div class=" p-4 lg:col-span-2 md:col-span-2 col-span-3 ">
            <inputform />
            <post />
        </div>
        <div class=" p-4 hidden  lg:block md:col-span-1 lg:col-span-1">
       <rightnav/>
        </div>
    </div>
    <gototop />
</template>
  
<script>

import navbar from '../components/header/navbar.vue';
import post from '../components/post/post.vue';
import gototop from '../components/header/gototop.vue';
import inputform from '../components/post/inputform.vue';
import rightnav from '../components/header/rightnav.vue';
import information from '../components/information/information.vue'
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
  
  