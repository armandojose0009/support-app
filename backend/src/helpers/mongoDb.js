const mongoose = require('mongoose');
require('dotenv').config();

const mongoDbSettings = {
  host: process.env.HOSTMONGO,
  port: process.env.PORTMONGO,
  database: process.env.DATABASEMONGO
};

const mongoUri = `mongodb://${mongoDbSettings.host}:${mongoDbSettings.port}/${mongoDbSettings.database}`;

const helper = {
  isConnected: () => {
    return mongoose.connection.readyState === 1;
  },
  connect: async () => {
    try {
      await mongoose.connect(mongoUri);
      console.info('Connected to MongoDB successfully');
      return mongoose;
    } catch (e) {
      console.error('Error connecting to MongoDB:', e);
      throw e;
    }
  },
  getClient: () => {
    return mongoose.connection.getClient();
  },
  close: async () => {
    try {
      await mongoose.connection.close();
      console.info('MongoDB connection closed');
    } catch (e) {
      console.error('Error closing MongoDB connection:', e);
      throw e;
    }
  }
};

module.exports = { helper, mongoose };
