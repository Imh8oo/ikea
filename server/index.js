const express = require('express');
const server = express();
const appConfig = {
  PORT: process.env.PORT || 3000,
  mongoUrl: 'mongodb+srv://admin1:1q2w3e4r@cluster0.rhxkt.mongodb.net/ikea',
};
const mongoose = require('mongoose');
const cors = require('cors');
server.use(cors());
const routes = require('./routes/routes');
server.use(routes);

const runServer = async () => {
  try {
    await mongoose.connect(appConfig.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    server.listen(appConfig.PORT, () => {
      console.log(`Server is running at PORT ${appConfig.PORT}`);
    });
  } catch(err) {
    console.error('err: ', err);
  }
}

runServer();
