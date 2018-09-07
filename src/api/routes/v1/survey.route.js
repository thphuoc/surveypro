const { authorize } = require('../../middlewares/auth');
const validate = require('express-validation');
const { createSurveyValidation, updateSurveyValidation, deleteSurveyValidation } = require('../../validations/survey.validation');

const express = require('express');
const controller = require('../../controllers/survey.controller');

const router = express.Router();

router.param('surveyId', (req, res, next, surveyId) => {
  req.locals.surveyId = surveyId;
  return next();
});

router.route('/')
/**
 * @api {get} v1/survey List Survey
 * @apiDescription Get a list of survey from login user
 * @apiVersion 1.0.0
 * @apiName ListSurveys
 * @apiGroup Survey
 * @apiPermission user
 *
 * @apiHeader {String} Authorization  User's access token
 *
 * @apiParam  {Number{1-}}         [page=1]     List page
 * @apiParam  {Number{1-100}}      [perPage=1]  Number of items per page
 *
 * @apiSuccess {Object[]} List of surveys.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
  .get(authorize(), controller.paging)
  /**
   * @api {post} v1/survey Create new Survey
   * @apiDescription Create new survey from login user
   * @apiVersion 1.0.0
   * @apiName Create new survey
   * @apiGroup Survey
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   * @apiParam {JSON Object} [bodyJson] Survey object
   *
   * @apiSuccess {Object} Survey detail.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .put(authorize(), validate(createSurveyValidation), controller.createSurvey)
  /**
   * @api {post} v1/survey Update Survey
   * @apiDescription Update survey from login user
   * @apiVersion 1.0.0
   * @apiName Update existed survey
   * @apiGroup Survey
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   * @apiParam {JSON Object} [bodyJson] Survey object
   *
   * @apiSuccess {Empty} 200.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(authorize(), validate(updateSurveyValidation), controller.updateSurvey)
  /**
   * @api {delete} v1/survey Delete List of Survey
   * @apiDescription Delete list of survey from login user
   * @apiVersion 1.0.0
   * @apiName Delete list of survey
   * @apiGroup Survey
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   * @apiParam {JSON Array} [body is an list ObjectId] List of object id as string each of element
   *
   * @apiSuccess {Empty} 200.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .delete(authorize(), validate(deleteSurveyValidation), controller.deleteSurvey);

router.route('/:surveyId')
/**
 * @api {get} v1/survey/{surveyId} Survey detail
 * @apiDescription Get survey detail from login user
 * @apiVersion 1.0.0
 * @apiName Get survey detail
 * @apiGroup Survey
 * @apiPermission user
 *
 * @apiHeader {String} Authorization  User's access token
 * @apiPath  {SurveyId}         [/v1/survey/123456789]     Survey id
 *
 * @apiSuccess {Object} Survey detail.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
  .get(authorize(), controller.detail);

module.exports = router;
