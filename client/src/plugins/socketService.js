import io from "socket.io-client";
import 'dotenv';
class socketService
{
    server =`${import.meta.env.VITE_API_BASE_URL_BASE}` 
    socket = io(this.server) 
    usersocket = []
    userConnect(id)
    {
        this.socket.emit("userConnected", id);
    }
    userDisconnect(id)
    {
        this.socket.emit("userDisconnect", id);

    }
    getListOnline(callback)
    {    
        this.socket.on("UpdateUserStatus", (data) => {
            callback(data);
          });
    }
    getchat(callback)
    {
        this.socket.on('chat', (chat) => {
            callback(chat)
        });
    }
   
}
export default new socketService();