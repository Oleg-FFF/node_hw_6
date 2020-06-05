const jwt = require('jsonwebtoken');

const {wordsEnum: {JwtSecret, JwtRefreshSecret}} = require('../../constants');

module.exports = () => {
    const accessToken = jwt.sign({}, JwtSecret, {expiresIn: '20m'})
    const refreshToken = jwt.sign({}, JwtRefreshSecret, {expiresIn: '1d'})

    return {
        accessToken,
        refreshToken
    }
}
