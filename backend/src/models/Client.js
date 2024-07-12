const { mongoose } = require('./../helpers/mongoDb');

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
