const jwt = require('jsonwebtoken');

const tokenService = {
    //토큼 발급
    getToken(user_id){
        //토큰에 담을 정보, 사용할 키(아무 이름 가능), 토큰옵션
        return jwt.sign({ user_id }, 'SECRET_KEY',{
            expiresIn : '1d'
        });
    },
    //토큰이 유효하다면 토큰에 담긴 정보 반환
    getPayload(token){
        return jwt.verify(token,"SECRET_KEY");
    }
}

module.exports = tokenService;