export default {
    secretKey: process.env.SECRET_KEY || 'DevSecretKey',
    port: process.env.PORT || 3000,
    db: process.env.PROD_MONGODB || 'mongodb://localhost/book-manager'
};
