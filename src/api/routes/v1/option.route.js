const { createOption, deleteOption, updateOption } = require('../../validations/option.validation');
const { authorize } = require('../../middlewares/auth');
const validate = require('express-validation');

const express = require('express');
const controller = require('../../controllers/option.controller');

const router = express.Router();

router.route('/')
/**
 * @api {post} v1/survey/question/option?surveyId=xxx&questionId=abc Create new option
 * @apiDescription Create new option for a specific survey
 * @apiVersion 1.0.0
 * @apiName Create new option
 * @apiGroup Options
 * @apiPermission user
 *
 * @apiHeader {String} Authorization  User's access token
 *
 * @apiParam  {surveyId}         [surveyId=xxx]     Survey Id has created before
 * @apiParam  {questionId}         [questionId=xxx]     Question Id has created before
 *
 * @apiSuccess {Object} Question object as json.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
  .put(authorize(), validate(createOption), controller.createOption)
  /**
   * @api {update} v1/survey/question/option?surveyId=xxx&questionId=abc Update an option
   * @apiDescription Update option for a specific question
   * @apiVersion 1.0.0
   * @apiName Update option
   * @apiGroup Options
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiParam  {surveyId}         [surveyId=xxx]     Survey Id has created before
   * @apiParam  {questionId}         [questionId=xxx]     Question Id has created before
   *
   * @apiSuccess {Object} Question object as json.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(authorize(), validate(updateOption), controller.updateOption)
  /**
   * @api {delete} v1/survey/question/option?surveyId=xxx&questionId=abc
   * @apiDescription Delete many option in a specific question
   * @apiVersion 1.0.0
   * @apiName Delete question
   * @apiGroup Options
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiParam  {surveyId}         [surveyId=xxx]     Survey Id has created before
   * @apiParam  {questionId}       [questionId=abc]     Question id
   * @apiParam  {body: {}}         [json=[List of optionIds]] List option id
   *
   * @apiSuccess {200}
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .delete(authorize(), validate(deleteOption), controller.deleteOption);


module.exports = router;
