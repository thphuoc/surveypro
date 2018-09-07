const Questions = require('../models/questions.model');
const Survey = require('../models/survey.model');
const Options = require('../models/option.model');
const httpStatus = require('http-status');
const mongoose = require('mongoose');

exports.createQuestion = (req, res, next) => {
  try {
    const questionBody = {
      ...req.body,
      ownerId: req.user.id,
    };
    Survey.findOne({
      _id: mongoose.Types.ObjectId(req.body.surveyId),
      ownerId: mongoose.Types.ObjectId(req.user.id),
    }, (error, survey) => {
      if (survey) {
        const newQuestion = new Questions(questionBody);
        const savedQuestion = newQuestion.save();
        res.status(httpStatus.CREATED);
        res.json(savedQuestion);
        return;
      }
      res.status(httpStatus.NOT_FOUND);
      res.json({
        message: 'Survey does not exist',
        status: httpStatus.NOT_FOUND,
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    const questionBody = {
      ...req.body,
      ownerId: req.user.id,
      surveyId: req.query.surveyId,
    };
    Questions.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.body.id),
      surveyId: mongoose.Types.ObjectId(questionBody.surveyId),
      ownerId: mongoose.Types.ObjectId(questionBody.ownerId),
    }, questionBody, (error, result) => {
      if (result) {
        res.status(httpStatus.OK);
        res.json(result);
        return;
      }
      res.status(httpStatus.NOT_FOUND);
      res.json({
        message: 'Question does not exist',
        status: httpStatus.NOT_FOUND,
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    const questionIds = req.body.map(questionId => mongoose.Types.ObjectId(questionId));
    Questions.deleteMany({
      _id: { $in: questionIds },
      ownerId: mongoose.Types.ObjectId(req.user.id),
      surveyId: mongoose.Types.ObjectId(req.query.surveyId),
    });
    Options.deleteMany({
      questionId: { $in: questionIds },
      ownerId: mongoose.Types.ObjectId(req.user.id),
      surveyId: mongoose.Types.ObjectId(req.query.surveyId),
    });
    res.status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
};
