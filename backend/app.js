const bodyParser = require('body-parser');
const express = require('express');
const cors  = require("cors");
require('./config/connect');
const app = express();

const {routerUser} = require('./routes/userRouter');

// Thiết lập body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());

// Định tuyến
app.use(routerUser);
// Serve các tệp tĩnh trong thư mục "uploads"
app.use(express.static("uploads"));

const port = 3000;
app.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
