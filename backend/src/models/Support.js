const { mongoose } = require('./../helpers/mongoDb');
const crypto = require('crypto');

const generateSupportCode = () => {
  return crypto.randomBytes(5).toString('hex').toUpperCase();
};

const supportSchema = new mongoose.Schema({
  supportCode: { 
    type: String, 
    unique: true, 
    default: generateSupportCode,
    immutable: true
  },
  DateTime: { type: Date, default: Date.now },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  isActive: { type: Boolean, required: true, default: true },
  isCompleted: { type: Boolean, required: true, default: false },
  clientDescription: { type: String, required: true },
  title: { type: String, required: true },
  employeeDescription: { type: String },
});

supportSchema.pre('save', function(next) {
  if (this.isNew && !this.supportCode) {
    this.supportCode = generateSupportCode();
  }
  next();
});

const Support = mongoose.model('Support', supportSchema);

module.exports = Support;
