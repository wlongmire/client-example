import mongoose from 'mongoose';

const brokerSchema = new mongoose.Schema({
  name: String,
  address: Object,
  logoPath: String,
  brokerNumber: String,
});

mongoose.model('broker', brokerSchema);

export default mongoose.model('broker');