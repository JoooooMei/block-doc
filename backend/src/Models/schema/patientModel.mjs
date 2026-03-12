import mongoose from 'mongoose';
import validator from 'validator';

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: [true, 'No patient ID provided'],
  },
  firstName: {
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
      type: String,
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

patientSchema.index({ patientId: 1 }, { unique: true });

export default mongoose.model('patient', patientSchema);
