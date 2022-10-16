const base = '';

export default {
  url: {
    base,
  },
  timers: {
    userCookieExpiry: '24h',
  },
  env: {
    authSecret: process.env.TOKEN_SECRET_KEY || '54mpo3rn4@rms',
  },
  authorizationIgnorePath: [
    `${base}/auth/login`
  ],
};
