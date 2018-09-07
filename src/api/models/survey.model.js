const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const surveyStatus = ['published', 'expired', 'saved'];

const surveySchema = new mongoose.Schema({
  surveyName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: surveyStatus,
  },
  configs: {
    justSubmitOneTime: {
      type: Boolean,
      default: true,
    },
    everyoneMustLoginToAnswerSurvey: {
      type: Boolean,
      default: false,
    },
    everyoneMustProvideNameToAnswerSurvey: {
      type: Boolean,
      default: false,
    },
    everyoneCanSeeResult: {
      type: Boolean,
      default: true,
    },
  },
}, { timestamps: true });

surveySchema.statics = {
  surveyStatus,
  list({ page = 1, perPage = 30 }, user) {
    return this.find({ ownerId: mongoose.Types.ObjectId(user.id) })
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(parseInt(perPage, 32))
      .exec();
  },
  detail(surveyId, user, callback) {
    this.aggregate([
      {
        $match: {
          $and: [
            { ownerId: mongoose.Types.ObjectId(user.id) },
            { _id: mongoose.Types.ObjectId(surveyId) },
          ],
        },
      },
      {
        $lookup: {
          from: 'questions',
          localField: '_id',
          foreignField: 'surveyId',
          as: 'question',
        },
      },
      {
        $unwind: '$question',
      },
      {
        $lookup: {
          from: 'options',
          localField: 'question._id',
          foreignField: 'questionId',
          as: 'question.options',
        },
      },
      {
        $group: {
          _id: '$_id',
          surveyName: { $first: '$surveyName' },
          status: { $first: '$status' },
          configs: { $first: '$configs' },
          questions: { $push: '$question' },
        },
      },
    ], (error, result) => callback(result));
  },
};

surveySchema.plugin(idValidator);

module.exports = mongoose.model('Survey', surveySchema);
