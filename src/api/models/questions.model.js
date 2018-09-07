const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const optionType = ['single', 'multiple'];
const questionSchema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  question: {
    type: String,
  },
  optionType: {
    enum: optionType,
  },
}, { timestamps: true });

questionSchema.statics = {
  optionType,
};

questionSchema.plugin(idValidator);

module.exports = mongoose.model('Questions', questionSchema);
