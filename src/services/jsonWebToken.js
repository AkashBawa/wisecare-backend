import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

const generateToken = async (payload) => {
    try {

        return new Promise((resolve, reject) => {

            jwt.sign( payload, secret, { expiresIn: "1h" }, (err, token) => {
                if(err) {
                    throw err
                }
                resolve(token);

            });
        
        })
    } catch (err) {
        console.log(err);
        throw new Error("Error in generating token");
    }
}

const validateToken = async (req, res, next) => {
    try {
        const userToken = req.headers.token;
        const data = jwt.verify(userToken , secret);
        console.log(data);
        res.json({
            data
        })
    } catch (err) {
        next(err)
    } 
}


export default {
    generateToken,
    validateToken
}