const { mongoose } = require('./../helpers/mongoDb');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  isActive: { type: Boolean, required: true, default: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
