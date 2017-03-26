module.exports = {
    secretKey: process.env.SECRET_KEY || 'DevSecretKey',
    authCheck: process.env.AUTH_CHECK,
    port: process.env.PORT || 3000,
    db: process.env.PROD_MONGODB || 'mongodb://localhost/book-manager'
};
