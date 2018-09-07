const Survey = require('../models/survey.model');
const Question = require('../models/questions.model');
const Option = require('../models/option.model');
const httpStatus = require('http-status');
const mongoose = require('mongoose');

exports.paging = async (req, res, next) => {
  try {
    res.json(await Survey.list(req.query, req.user));
  } catch (error) {
    next(error);
  }
};

exports.createSurvey = async (req, res, next) => {
  try {
    const surveyBody = {
      ...req.body,
      ownerId: req.user.id,
    };
    const newSurvey = new Survey(surveyBody);
    const savedSurvey = await newSurvey.save();
    res.status(httpStatus.CREATED);
    res.json(savedSurvey);
  } catch (error) {
    next(error);
  }
};

exports.updateSurvey = async (req, res, next) => {
  try {
    const surveyBody = {
      ...req.body,
      ownerId: req.user.id,
    };
    Survey.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(surveyBody.id),
      ownerId: mongoose.Types.ObjectId(surveyBody.ownerId),
    }, surveyBody, { new: true }, (error, result) => {
      res.status(result ? httpStatus.OK : httpStatus.NOT_FOUND);
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSurvey = async (req, res, next) => {
  try {
    const listObjectId = req.body.map(id => mongoose.Types.ObjectId(id));
    Survey.deleteMany({
      _id: { $in: listObjectId },
      ownerId: mongoose.Types.ObjectId(req.user.id),
    });
    Question.deleteMany({
      surveyId: { $in: listObjectId },
      ownerId: mongoose.Types.ObjectId(req.user.id),
    });
    Option.deleteMany({
      surveyId: { $in: listObjectId },
      ownerId: mongoose.Types.ObjectId(req.user.id),
    });
    req.status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

exports.detail = async (req, res, next) => {
  try {
    await Survey.detail(req.locals.surveyId, req.user, (surveyDetail) => {
      if (surveyDetail) {
        res.status(httpStatus.OK);
        res.json(surveyDetail);
        return;
      }
      res.status(httpStatus.NOT_FOUND);
    });
  } catch (error) {
    next(error);
  }
};
