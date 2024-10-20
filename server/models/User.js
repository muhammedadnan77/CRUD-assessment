const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username:{type:String,required:false},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // 'admin' or 'user'
  mobile:{type:Number,required:false}
});

module.exports = mongoose.model('User', UserSchema);
