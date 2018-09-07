/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const app = require('../../../index');
const User = require('../../models/user.model');
const Survey = require('../../models/survey.model');

describe('Survey API', async () => {
  let userAccessToken;
  let dbUsers;
  let user;
  let dbSurveys;

  const password = '123456';
  const passwordHashed = await bcrypt.hash(password, 1);

  beforeEach(async () => {
    dbUsers = {
      email: 'jonsnow@gmail.com',
      password: passwordHashed,
      name: 'Jon Snow',
    };

    user = {
      email: 'sousa.dfs@gmail.com',
      password,
      name: 'Daniel Sousa',
    };

    await User.remove({});
    await Survey.remove({});
    user = await new User(dbUsers).save();

    dbSurveys = {
      surveyName: 'survey 1',
      ownerId: user._id,
      status: 'published',
    };

    userAccessToken = (await User.findAndGenerateToken(dbUsers)).accessToken;
  });

  describe('PUT /v1/survey', () => {
    it('should create survey when request is ok', () => {
      console.log(`userAccessToken: ${userAccessToken}`);
      return request(app)
        .put('/v1/survey')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(dbSurveys)
        .expect(httpStatus.CREATED)
        .then((res) => {
          console.log(JSON.stringify(res))
          expect(res.body)
            .to
            .include(dbSurveys);
        });
    });
  });
});
