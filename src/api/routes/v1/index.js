const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const surveyRouters = require('./survey.route');
const questionRouters = require('./question.route');
const optionRouters = require('./option.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/survey', surveyRouters);
router.use('/survey/question', questionRouters);
router.use('/survey/question/option', optionRouters);

module.exports = router;
