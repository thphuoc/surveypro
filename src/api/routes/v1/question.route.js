const { authorize } = require('../../middlewares/auth');
const validate = require('express-validation');
const { createQuestion, updateQuestion, deleteQuestion } = require('../../validations/question.validation');

const express = require('express');
const controller = require('../../controllers/question.controller');

const router = express.Router();

router.route('/')
/**
 * @api {post} v1/survey/question?surveyId=xxx Create new question
 * @apiDescription Create new question for a specific survey
 * @apiVersion 1.0.0
 * @apiName Create new question
 * @apiGroup Question
 * @apiPermission user
 *
 * @apiHeader {String} Authorization  User's access token
 *
 * @apiParam  {surveyId}         [surveyId=xxx]     Survey Id has created before
 *
 * @apiSuccess {Object} Question object as json.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
  .put(authorize(), validate(createQuestion), controller.createQuestion)
  /**
   * @api {update} v1/survey/question?surveyId=xxx Update question
   * @apiDescription Update question for a specific survey
   * @apiVersion 1.0.0
   * @apiName Update question
   * @apiGroup Question
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiParam  {surveyId}         [surveyId=xxx]     Survey Id has created before
   *
   * @apiSuccess {Object} Question object as json.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(authorize(), validate(updateQuestion), controller.updateQuestion)
  /**
   * @api {delete} v1/survey/question?surveyId=xxx Delete question
   * @apiDescription Delete many questions in a specific survey
   * @apiVersion 1.0.0
   * @apiName Delete question
   * @apiGroup Question
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiParam  {surveyId}         [surveyId=xxx]     Survey Id has created before
   * @apiParam  {arrayQuestionId}         [json=[{QuestionId}]]]     List of question id
   *
   * @apiSuccess {200}
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .delete(authorize(), validate(deleteQuestion), controller.deleteQuestion);


module.exports = router;
