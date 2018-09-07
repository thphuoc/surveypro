const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const responsesSchema = new mongoose.Schema({
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
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Options',
    },
  ],
}, { timestamps: true });

responsesSchema.plugin(idValidator);

module.exports = mongoose.model('Responses', responsesSchema);
