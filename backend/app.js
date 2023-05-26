const bodyParser = require('body-parser');
const express = require('express');
const cors  = require("cors");
const http = require('http');
const socketIO = require('socket.io');
require('./config/connect');
const app = express();
const {routerAdmin} = require('./routes/adminRouter');
const {routerUser} = require('./routes/userRouter');
const {routerPost} = require('./routes/postRouter');
const {routerCat} = require('./routes/catRouter');
const {routerIMG} = require('./routes/imgRouter');
const {routerVideo} = require('./routes/videoRouter');
const {routerLike} = require('./routes/likeRouter');
const {routerFollow} = require('./routes/followRouter');
const {routerComment}=require('./routes/commentRouter')
const {routerSearch}=require('./routes/searchRouter');
const {routerChat}=require('./routes/chatRouter')

// Thiết lập body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());

// Định tuyến
app.use(routerUser,routerPost,routerCat,routerAdmin,routerIMG,routerVideo,routerLike,routerComment,routerFollow,routerSearch,routerChat);
// Serve các tệp tĩnh trong thư mục "uploads"
app.use(express.static("uploads"));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('A client connected');

  // Thêm các xử lý sự kiện Socket.IO tại đây
});
const port = 3000;
app.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
