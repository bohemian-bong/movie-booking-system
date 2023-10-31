const { createJWT, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
module.exports = {
  createJWT,
  attachCookiesToResponse,
  createTokenUser,
};
