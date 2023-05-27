import Socket from "socket.io-client";
import 'dotenv';
const server =`${import.meta.env.VITE_API_BASE_URL_BASE}` 
const socket=  Socket(server,
{
    autoConnect:false
});
export default socket;