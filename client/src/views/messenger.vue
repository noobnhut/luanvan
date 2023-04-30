<template>
    <div class="h-screen w-full flex antialiased text-gray-900 bg-white overflow-hidden">
        <div class="flex-1 flex flex-col">
            <main class="flex-grow flex flex-row min-h-0">
                <!--top nav-->
                <section
                    class="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
                    <div class="header p-4 flex flex-row justify-between items-center flex-none">
                        <div class="w-16 h-16 relative flex flex-shrink-0" >
                            <img class="rounded-full w-full h-full object-cover" alt="ravisankarchinnam"
                                src="../assets/login.gif" />
                        </div>
                        <p class="text-md font-bold hidden md:block group-hover:block">Nhắn tin</p>
                        <a href="#"
                            class="block rounded-full   w-10 h-10 p-2 hidden md:block group-hover:block">
                        </a>
                    </div>
                    <div class="search-box p-4 flex-none">
                        <form onsubmit="">
                            <div class="relative">
                                <label>
                                    <input
                                        class="rounded-full py-2 pr-6 pl-10 w-full border   focus:outline-none focus:shadow-md transition duration-300 ease-in"
                                        type="text" value="" placeholder="Tìm kiếm tin nhắn" />
                                      <span class="absolute top-0 left-0 mt-2 ml-3 inline-block">
                                        <i class="w-6 h-6 uil uil-search"></i>
                                    </span>
                                </label>
                            </div>
                        </form>
                    </div>

                    <!--list friend chat-->

                    <div class="contacts p-2 flex-1 overflow-y-scroll">
                        <div class="flex justify-between items-center p-3  rounded-lg relative">
                            <div class="w-16 h-16 relative flex flex-shrink-0">
                                <img class="shadow-md rounded-full w-full h-full object-cover"
                                    src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/277672942_1716139805393859_6008104514124140375_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ce9swUlhPBoAX-gB3fj&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfBjz9kWsDs3JG4t3Fl9kwpAWjkDJiLfoF08CNDKFFv6mQ&oe=6453AB65" alt="" />
                            </div>
                            <div class="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                                <p class="font-semibold ">Chúa Tể Endgame</p>
                                <div class="flex items-center text-sm text-gray-600">
                                    <div class="min-w-0">
                                        <p class="truncate"></p>
                                    </div>
                                    <p class="ml-2 whitespace-no-wrap"></p>
                                </div>
                            </div>
                        </div>                   
                    </div>

                </section>

                <!--phan chat-->
                <section class="flex flex-col flex-auto border-l ">
                    <div class="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
                        <!--info người đang chat-->
                        <div class="flex">
                            <div class="w-12 h-12 mr-4 relative flex flex-shrink-0">
                                <img class="shadow-md rounded-full w-full h-full object-cover"
                                    src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/277672942_1716139805393859_6008104514124140375_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ce9swUlhPBoAX-gB3fj&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfBjz9kWsDs3JG4t3Fl9kwpAWjkDJiLfoF08CNDKFFv6mQ&oe=6453AB65" alt="" />
                            </div>
                            <div class="text-sm">
                                <p class="font-bold">Chúa Tể Endgame</p>
                            </div>
                        </div>
                    </div>
                    <!--noi dung chat-->

                    <div class="chat-body p-4 flex-1 overflow-y-scroll">
                        <!--bên muốn chat-->
                        <div class="flex flex-row justify-start">
                            <div class="w-8 h-8 relative flex flex-shrink-0 mr-4">
                                <img class="shadow-md rounded-full w-full h-full object-cover"
                                    src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/277672942_1716139805393859_6008104514124140375_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ce9swUlhPBoAX-gB3fj&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfBjz9kWsDs3JG4t3Fl9kwpAWjkDJiLfoF08CNDKFFv6mQ&oe=6453AB65" alt="" />
                            </div>
                            <div class="messages text-sm  grid grid-flow-row gap-2">
                                <div class="flex items-center group">
                                    <p
                                        class="px-6 py-3 rounded-t-full rounded-r-full bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 max-w-xs lg:max-w-md text-gray-900">
                                        Phím này anh bán rẻ 100k</p>  
                                </div>
                                <div class="flex items-center group">
                                    <p class="px-6 py-3 rounded-r-full bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 max-w-xs lg:max-w-md text-gray-900">Shall
                                       Mua không tao ship qua nhà m ?</p>
                                   
                                    
                                </div>
                                
                            </div>
                        </div>

                        <p class="p-4 text-center text-sm text-gray-500">18:40</p>
                         <!--mình-->
                        <div class="flex flex-row justify-end">
                            <div class="messages text-sm  grid grid-flow-row gap-2">
                                <div class="flex items-center flex-row-reverse group">
                                    <p class="px-6 py-3 rounded-t-full rounded-l-full bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200  max-w-xs lg:max-w-md"> Có cc 50k bán không cook !!!</p>
                                </div>   
                            </div>
                        </div>
                        
                    </div>

                      <!--bot phần chat-->
                    <div class="chat-footer flex-none">
                        <div class="flex flex-row items-center p-4">
                            <button type="button"
                                class="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6">
                                <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
                                    <path
                                        d="M11,13 L8,10 L2,16 L11,16 L18,16 L13,11 L11,13 Z M0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M15,9 C16.1045695,9 17,8.1045695 17,7 C17,5.8954305 16.1045695,5 15,5 C13.8954305,5 13,5.8954305 13,7 C13,8.1045695 13.8954305,9 15,9 Z" />
                                </svg>
                            </button>
                            
                        <div class="relative flex-grow">
                            <label>
                                <input
                                    class="rounded-full py-2 pl-3 pr-10 w-full border   focus:outline-none text-gray-900 focus:shadow-md transition duration-300 ease-in"
                                    type="text" value="" placeholder="Aa" />
                                
                            </label>
                        </div>
                        <button type="button"
                            class="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6">
                            <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
                                <path
                                    d="M11.0010436,0 C9.89589787,0 9.00000024,0.886706352 9.0000002,1.99810135 L9,8 L1.9973917,8 C0.894262725,8 0,8.88772964 0,10 L0,12 L2.29663334,18.1243554 C2.68509206,19.1602453 3.90195042,20 5.00853025,20 L12.9914698,20 C14.1007504,20 15,19.1125667 15,18.000385 L15,10 L12,3 L12,0 L11.0010436,0 L11.0010436,0 Z M17,10 L20,10 L20,20 L17,20 L17,10 L17,10 Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    </div>
</div></template>

<style>/* can be configured in tailwind.config.js */
.group:hover .group-hover\:block {
    display: block;
}

.hover\:w-64:hover {
    width: 45%;
}


/* NO NEED THIS CSS - just for custom scrollbar which can also be configured in tailwind.config.js*/
::-webkit-scrollbar {
    width: 2px;
    height: 2px;
}

::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
}

::-webkit-scrollbar-thumb {

    border: 0px none #ffffff;
    border-radius: 50px;
}

::-webkit-scrollbar-thumb:hover {
    background: #2b6cb0;
}

::-webkit-scrollbar-thumb:active {
    background: #ffffff;
}

::-webkit-scrollbar-track {
    border: 0px none #ffffff;
    border-radius: 50px;
}

::-webkit-scrollbar-track:hover {
    background: #666666;
}

::-webkit-scrollbar-track:active {
    background: #333333;
}

::-webkit-scrollbar-corner {
    background: transparent;
}</style>