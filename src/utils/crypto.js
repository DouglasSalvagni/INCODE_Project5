
const crypto = require('crypto');

module.exports.getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

module.exports.generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

module.exports.verifyToken = (req,res, next) => {
    if(req.user) {
        next();
    } else {
        res.redirect('login');
    }
}