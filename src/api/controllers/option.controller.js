const Options = require('../models/option.model');
const httpStatus = require('http-status');
const mongoose = require('mongoose');

exports.createOption = async (req, res, next) => {
  try {
    const optionBody = {
      ...req.body,
      ownerId: req.user.id,
      surveyId: req.query.surveyId,
      questionId: req.query.questionId,
    };
    res.status(httpStatus.CREATED);
    res.json(await new Options(optionBody).save());
  } catch (error) {
    next(error);
  }
};

exports.updateOption = async (req, res, next) => {
  try {
    const optionBody = {
      ...req.body,
      ownerId: req.user.id,
      surveyId: req.query.surveyId,
      questionId: req.query.questionId,
    };
    Options.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.body.id),
      surveyId: mongoose.Types.ObjectId(optionBody.surveyId),
      ownerId: mongoose.Types.ObjectId(optionBody.ownerId),
      questionId: mongoose.Types.ObjectId(optionBody.questionId),
    }, optionBody, (error, result) => {
      if (result) {
        res.status(httpStatus.OK);
        res.json(result);
        return;
      }
      res.status(httpStatus.NOT_FOUND);
      res.json({
        message: 'Option does not exist',
        status: httpStatus.NOT_FOUND,
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOption = async (req, res, next) => {
  try {
    const optionIds = req.body.map(optionId => mongoose.Types.ObjectId(optionId));
    Options.deleteMany({
      _id: { $in: optionIds },
      ownerId: mongoose.Types.ObjectId(req.user.id),
      surveyId: mongoose.Types.ObjectId(req.query.surveyId),
      questionId: mongoose.Types.ObjectId(req.query.questionId),
    });
    res.status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
};
