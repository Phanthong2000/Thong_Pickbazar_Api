const jwt = require('jsonwebtoken')

let generateToken = async (user: object, secretSignature: any, tokenLife: any) => {
    try {
        const token = await jwt.sign(
            { data: user },
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            }
        )
        return token;
    } catch (error) {
        console.log(error)
    }
}
export {
    generateToken
}