const Joi = require('joi');
const Question = require('../models/questions.model');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  // PUT /v1/survey/question?surveyId=xxx
  createQuestion: {
    query: {
      surveyId: Joi.objectId().required(),
    },
    body: {
      question: Joi.string().required(),
      optionType: Joi.string().valid(Question.optionType),
    },
  },
  // POST /v1/survey/question?surveyId=xxx
  updateQuestion: {
    query: {
      surveyId: Joi.objectId().required(),
    },
    body: {
      id: Joi.objectId().required(),
      question: Joi.string().required(),
      optionType: Joi.string().valid(Question.optionType),
    },
  },
  // DELETE /v1/survey/question?surveyId=xxx
  deleteQuestion: {
    body: Joi.array().items(Joi.string()).min(1).max(50),
  },
};
