import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  address: {
    type: String,
    unique: [true, 'Account already exists for adress'],
    required: [true, 'Adress is required'],
  },
  firstName: String,
  lastName: String,
  title: String,
  role: {
    type: [String],
    enum: ['provider', 'admin'],
    required: true,
    validate: {
      validator: function (roles) {
        return Array.isArray(roles) && roles.length > 0;
      },
      message: 'At least one role is required',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [4, 'Password is to short. Use at least 4 characters'],
    select: false,
  },
});

export default mongoose.model('Provider', providerSchema);
