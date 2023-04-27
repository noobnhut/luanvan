const express = require('express');
require('./config/connect');
const app = express();

const port = 8080;
app.listen(port, () => {
  console.log(`server : http://localhost:${port}/`);
});
