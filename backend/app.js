const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require("cors");
require('./config/connect');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,
  {
    allowEIO3: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["polling", "websocket"],
  });

//setup socket io
io.on('connect', (socket) => {
  socket.emit('status', 'online');
  console.log('có người kết nối này');
});
app.use((req, res, next) => {
  res.io = io
  next()
});

const { routerAdmin } = require('./routes/adminRouter');
const { routerUser } = require('./routes/userRouter');
const { routerPost } = require('./routes/postRouter');
const { routerCat } = require('./routes/catRouter');
const { routerIMG } = require('./routes/imgRouter');
const { routerVideo } = require('./routes/videoRouter');
const { routerLike } = require('./routes/likeRouter');
const { routerSavePost } = require('./routes/savePostRouter');
const { routerComment } = require('./routes/commentRouter')
const { routerSearch } = require('./routes/searchRouter');
const { routerUserFollow } = require('./routes/followUserRouter')
const { routerReport } = require('./routes/reportRouter')
const {routerSendMail} = require('./routes/sendmailRouter')
const { routerRating} = require('./routes/RatingRouter')
const {routerNotication} = require('./routes/noticationRouter')
// Thiết lập body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(express.json());

// Định tuyến
app.use(routerUser, routerPost, routerCat, routerAdmin, routerIMG, routerVideo, routerLike, routerComment,
  routerSavePost, routerSearch, routerUserFollow, routerReport,routerSendMail,routerRating,routerNotication);
// Serve các tệp tĩnh trong thư mục "uploads"
app.use(express.static("uploads"));


const port = 3000;
server.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
