const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  // PUT /v1/survey/question/option?surveyId=xxx&questionId=abc
  createOption: {
    query: {
      surveyId: Joi.objectId().required(),
      questionId: Joi.objectId().required(),
    },
    body: {
      option: Joi.string().required(),
      answer: Joi.boolean(),
    },
  },
  // POST /v1/survey/question?surveyId=xxx
  updateOption: {
    query: {
      surveyId: Joi.objectId().required(),
      questionId: Joi.objectId().required(),
    },
    body: {
      id: Joi.objectId().required(),
      option: Joi.string().required(),
      answer: Joi.boolean(),
    },
  },
  // DELETE /v1/survey/question?surveyId=xxx
  deleteOption: {
    body: Joi.array().items(Joi.string()).min(1).max(50),
  },
};
