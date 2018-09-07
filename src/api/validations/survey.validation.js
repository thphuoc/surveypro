const Joi = require('joi');
const Survey = require('../models/survey.model');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  // GET /v1/survey
  listSurvey: {
    query: {
      page: Joi.number()
        .min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
    },
  },
  // POST /v1/survey
  createSurveyValidation: {
    body: {
      surveyName: Joi.string()
        .required(),
      status: Joi.string()
        .valid(Survey.surveyStatus),
      configs: {
        everyoneCanSeeResult: Joi.boolean(),
        everyoneMustProvideNameToAnswerSurvey: Joi.boolean(),
        everyoneMustLoginToAnswerSurvey: Joi.boolean(),
        justSubmitOneTime: Joi.boolean(),
      },
    },
  },
  updateSurveyValidation: {
    body: {
      id: Joi.objectId()
        .required(),
      surveyName: Joi.string()
        .required(),
      status: Joi.string()
        .valid(Survey.surveyStatus),
      configs: {
        everyoneCanSeeResult: Joi.boolean(),
        everyoneMustProvideNameToAnswerSurvey: Joi.boolean(),
        everyoneMustLoginToAnswerSurvey: Joi.boolean(),
        justSubmitOneTime: Joi.boolean(),
      },
    },
  },
  deleteSurveyValidation: {
    body: Joi.array()
      .items(Joi.objectId())
      .unique()
      .min(1)
      .max(50),
  },
};
