import mongoose from 'mongoose';
import validator from 'validator';

const patientSchema = new mongoose.Schema({
  patientId: {
    type: Number,
    required: [true, 'No patient ID provided'],
  },
  firastname: {
    type: String,
    required: [true, 'No first name provided'],
  },
  lastName: {
    type: String,
    required: [true, 'No last name provided'],
  },
  contact: {
    street: {
      type: String,
    },
    streetNumber: {
      type: String,
    },
    zip: {
      type: Number,
    },
    city: {
      type: String,
    },
    email: {
      type: String,
      validate: [validator.isEmail, 'Email address is not valid: '],
    },
  },
});

export default mongoose.model('patient', patientSchema);
