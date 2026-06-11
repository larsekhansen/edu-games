const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production');
}

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'development-only-jwt-secret',
  jwtSession: { session: false },
};