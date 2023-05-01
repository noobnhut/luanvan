<template>
    <div class="w-full h-screen">
        <div class="flex h-full">
            <div class="flex-1 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 w-full h-full">
                <div class="main-body container m-auto w-11/12 h-full flex flex-col">
                    <!--mobile top-->
                    <div class="py-4 flex-2 flex flex-row">
                        <div class="flex-1">
                            <span class="min-[1024px]:hidden inline-block text-gray-700 hover:text-gray-900 align-bottom">
                                <span class="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                                    <svg class="w-4 h-4" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </span>
                            </span>

                        </div>

                    </div>

                    <div class="main flex-1 flex flex-col">
                        <div class="hidden lg:block heading flex-2">
                            <h1 class="text-3xl text-gray-700 mb-4">Chat</h1>
                        </div>

                        <div class="flex-1 flex h-full">
                            <!--left nav-->
                            <div class="sidebar hidden lg:flex w-1/3 flex-2 flex-col pr-6">
                                <!--chat search-->
                                <div class="search flex-2 pb-6 px-2">
                                    <input type="text"
                                        class="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200"
                                        placeholder="Tìm kiếm tin nhắn">
                                </div>

                                <!--left chat avatar-->
                                <div class="flex-1 h-full overflow-auto px-2">

                                    <div
                                        class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
                                        <div class="flex-2">
                                            <div class="w-12 h-12 relative">
                                                <img class="w-12 h-12 rounded-full mx-auto" src="../assets/login.gif"
                                                    alt="chat-user" />
                                                <span
                                                    class="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                                            </div>
                                        </div>
                                        <div class="flex-1 px-2">
                                            <div class="truncate w-32"><span class="text-gray-800">Hứa EndGame</span></div>
                                            <!-- <div><small class="text-gray-600">Yea, Sure!</small></div> -->
                                        </div>
                                        <div class="flex-2 text-right">
                                            <!--Tune-->
                                            <div><small class="text-gray-500">10:32</small></div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <!--center chat-->
                            <div class="chat-area flex-1 flex flex-col">
                                <!--name chat -->
                                <div class="flex-3">
                                    <h2 class="text-xl py-1 mb-8 border-b-2 border-gray-200"><b>Hứa EndGame</b></h2>
                                </div>

                                <div class="messages flex-1 overflow-auto">
                                    <!--nguoi chat-->
                                    <div class="message mb-4 flex">
                                        <div class="flex-2">
                                            <div class="w-12 h-12 relative">
                                                <img class="w-12 h-12 rounded-full mx-auto" src="../assets/login.gif"
                                                    alt="chat-user" />
                                                <span
                                                    class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                                            </div>
                                        </div>
                                        <div class="flex-1 px-2">
                                            <!--nội dung chat-->
                                            <div
                                                class="inline-block bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100 rounded-full p-2 px-6 text-gray-700">
                                                <span>Tôi hứa là mua nốt con qk80 t endgame</span>
                                            </div>
                                            <!--time-->
                                            <div class="pl-4"><small class="text-gray-500">10:32</small></div>
                                        </div>
                                    </div>
                                    <!--mình chat-->
                                    <div class="message me mb-4 flex text-right">
                                        <div class="flex-1 px-2">
                                            <!--nội dung chat-->
                                            <div
                                                class="inline-block bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-200 rounded-full p-2 px-6 ">
                                                <span>Chú chắc chưa</span>
                                            </div>
                                            <!--time-->
                                            <div class="pr-4"><small class="text-gray-500">10:33</small></div>
                                        </div>
                                    </div>

                                </div>
                                <!--bottom center-->
                                <div class="flex-2 pt-4 pb-10">
                                    <div class="write bg-white shadow flex rounded-lg">

                                        <div class="flex-1">
                                            <textarea name="message"
                                                class="w-full block outline-none py-4 px-4 bg-transparent" rows="1"
                                                placeholder="Nhập nội dung chat..." autofocus></textarea>
                                        </div>
                                        <div class="flex-2 w-32 p-2 flex content-center items-center">
                                            <div class="flex-1 text-center">
                                                <span class="text-gray-400 hover:text-gray-800">
                                                    <span class="inline-block align-text-bottom">
                                                        <svg fill="none" stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
                                                            class="w-6 h-6">
                                                            <path
                                                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13">
                                                            </path>
                                                        </svg>
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="flex-1">
                                                <button class="bg-blue-400 w-10 h-10 rounded-full inline-block">
                                                <span class="inline-block align-text-bottom">
                                                    <i class="w-4 h-4 text-white  uil-heart-alt"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</div>


</template>

