const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const optionSchema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questions',
    required: true,
  },
  option: {
    type: String,
    required: true,
  },
  answer: {
    type: Boolean,
  },
});

optionSchema.plugin(idValidator);

module.exports = mongoose.model('Options', optionSchema);
